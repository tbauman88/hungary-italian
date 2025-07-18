import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthForm } from '../components/AuthForm'
import { useAuth } from '../contexts/AuthContext'

const formErrors: Record<string, string> = {
  'email-already-in-use': 'An account with this email already exists.',
  'weak-password': 'Password is too weak. Please choose a stronger password.',
  'invalid-email': 'Please enter a valid email address.',
  'operation-not-allowed': 'Email/password accounts are not enabled. Please contact support.',
  'default': 'An error occurred. Please try again.'
}

export const SignupPage: React.FC = () => {
  const { register, currentUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async (email: string, password: string): Promise<string | null> => {
    setIsLoading(true)
    setError(null)

    try {
      await register(email, password)
      return null
    } catch (error: any) {
      const errorMessage = error?.message || 'default'
      return formErrors[errorMessage] || formErrors.default
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
      title="Create your account"
      buttonText="Sign up"
      linkText="Already have an account? Sign in"
      linkTo="/login"
      onSubmit={handleSignup}
      isLoading={isLoading}
      error={error}
    />
  )
} 
