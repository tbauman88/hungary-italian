import { useApolloClient } from '@apollo/client'
import type { User } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { logout, onAuthStateChange, reauthenticateUser, signIn, signUp, updateUserEmail, updateUserPassword } from '../lib/firebase'
import { UserService } from '../lib/userService'

interface AuthContextType {
  currentUser: User | null
  currentUserId: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateEmail: (newEmail: string, currentPassword: string) => Promise<void>
  updatePassword: (newPassword: string, currentPassword: string) => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const apolloClient = useApolloClient()

  const userService = new UserService(apolloClient)

  const login = async (email: string, password: string) => {
    await signIn(email, password)
  }

  const register = async (email: string, password: string) => {
    await signUp(email, password)
  }

  const handleLogout = async () => {
    setCurrentUserId(null)
    await logout()
  }

  const updateEmail = async (newEmail: string, currentPassword: string) => {
    if (!currentUser) {
      throw new Error('No user is currently logged in')
    }

    await reauthenticateUser(currentUser, currentPassword)

    await updateUserEmail(currentUser, newEmail)

    if (currentUserId) {
      await userService.updateUser(currentUserId, { email: newEmail })
    }
  }

  const updatePassword = async (newPassword: string, currentPassword: string) => {
    if (!currentUser) {
      throw new Error('No user is currently logged in')
    }

    await reauthenticateUser(currentUser, currentPassword)
    await updateUserPassword(currentUser, newPassword)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setCurrentUser(user)

      if (user) {
        try {
          const hasuraUserId = await userService.syncUserWithHasura(user)
          setCurrentUserId(hasuraUserId)
        } catch (error) {
          console.error('Failed to sync user with Hasura:', error)
          setCurrentUserId(null)
        }
      } else {
        setCurrentUserId(null)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [userService])

  const value = {
    currentUser,
    currentUserId,
    login,
    register,
    logout: handleLogout,
    updateEmail,
    updatePassword,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
} 
