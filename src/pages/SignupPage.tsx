import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthForm } from '../components/AuthForm'
import { useAuth } from '../contexts/AuthContext'

export const SignupPage: React.FC = () => {
  const { register, currentUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async (email: string, password: string): Promise<string | null> => {
    setIsLoading(true)
    setError(null)

    try {
      await register(email, password)
      return null // Success
    } catch (error: any) {
      const errorMessage = error?.message || 'An error occurred. Please try again.'

      if (errorMessage.includes('email-already-in-use')) {
        return 'An account with this email already exists.'
      } else if (errorMessage.includes('weak-password')) {
        return 'Password is too weak. Please choose a stronger password.'
      } else if (errorMessage.includes('invalid-email')) {
        return 'Please enter a valid email address.'
      } else if (errorMessage.includes('operation-not-allowed')) {
        return 'Email/password accounts are not enabled. Please contact support.'
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
      mode="signup"
      onSubmit={handleSignup}
      isLoading={isLoading}
      error={error}
    />
  )
} 
