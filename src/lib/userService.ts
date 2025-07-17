import { ApolloClient } from '@apollo/client'
import type { User } from 'firebase/auth'
import { CreateUserDocument, GetUserByEmailDocument, UpdateUserDocument } from '../generated/graphql'

export class UserService {
  constructor(private apolloClient: ApolloClient<any>) { }

  async syncUserWithHasura(firebaseUser: User): Promise<string> {
    const email = firebaseUser.email
    const name = firebaseUser.displayName || email?.split('@')[0] || 'User'

    if (!email) {
      throw new Error('User email is required')
    }

    try {
      const { data: existingUserData } = await this.apolloClient.query({
        query: GetUserByEmailDocument,
        variables: { email },
        fetchPolicy: 'network-only',
      })

      if (existingUserData.users.length > 0) {
        return existingUserData.users[0].id
      }

      const { data: newUserData } = await this.apolloClient.mutate({
        mutation: CreateUserDocument,
        variables: {
          user: {
            firebase_uid: firebaseUser.uid,
            email,
            name,
          },
        },
      })

      if (!newUserData?.insert_users_one?.id) {
        throw new Error('Failed to create user in Hasura')
      }

      return newUserData.insert_users_one.id
    } catch (error) {
      console.error('Error syncing user with Hasura:', error)
      throw error
    }
  }

  async updateUser(userId: string, updates: { email?: string; name?: string }): Promise<void> {
    try {
      await this.apolloClient.mutate({
        mutation: UpdateUserDocument,
        variables: {
          user: {
            id: userId,
            ...updates,
          },
        },
      })
    } catch (error) {
      console.error('Error updating user in Hasura:', error)
      throw error
    }
  }

  async getCurrentUserId(firebaseUser: User | null): Promise<string | null> {
    if (!firebaseUser?.email) return null

    try {
      const { data } = await this.apolloClient.query({
        query: GetUserByEmailDocument,
        variables: { email: firebaseUser.email },
        fetchPolicy: 'cache-first',
      })

      return data.users[0]?.id || null
    } catch (error) {
      console.error('Error getting current user ID:', error)
      return null
    }
  }
} 
