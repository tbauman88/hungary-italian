import { useApolloClient } from '@apollo/client'
import type { User } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { logout, onAuthStateChange, signIn, signUp } from '../lib/firebase'
import { UserService } from '../lib/userService'

interface AuthContextType {
  currentUser: User | null
  currentUserId: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
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
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
} 
