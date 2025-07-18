import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthForm } from '../components/AuthForm'
import { useAuth } from '../contexts/AuthContext'

export const LoginPage: React.FC = () => {
  const { login, currentUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (email: string, password: string): Promise<string | null> => {
    setIsLoading(true)
    setError(null)

    try {
      await login(email, password)
      return null // Success
    } catch (error: any) {
      const errorMessage = error?.message || 'An error occurred. Please try again.'

      if (errorMessage.includes('user-not-found')) {
        return 'No account found with this email address.'
      } else if (errorMessage.includes('wrong-password') || errorMessage.includes('invalid-credential')) {
        return 'Incorrect password. Please try again.'
      } else if (errorMessage.includes('invalid-email')) {
        return 'Please enter a valid email address.'
      } else if (errorMessage.includes('too-many-requests')) {
        return 'Too many failed attempts. Please try again later.'
      } else {
        return errorMessage
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (currentUser) {
    return <Navigate to="/" replace />
  }

  return (
    <AuthForm
      mode="login"
      onSubmit={handleLogin}
      isLoading={isLoading}
      error={error}
    />
  )
} 
