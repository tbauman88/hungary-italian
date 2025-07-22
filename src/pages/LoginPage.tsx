import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthForm } from '../components/AuthForm'
import { useAuth } from '../contexts/AuthContext'

const formErrors: Record<string, string> = {
  'auth/invalid-credential': 'Incorrect email or password. Please try again.',
  'auth/user-not-found': 'No account found with this email address.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
  'default': 'An error occurred. Please try again.'
}

export const LoginPage: React.FC = () => {
  const { login, currentUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (email: string, password: string): Promise<string | null> => {
    setIsLoading(true)
    setError(null)

    try {
      await login(email, password)
      return null
    } catch (error: any) {
      const errorText = formErrors[error?.code] ?? formErrors.default
      setError(errorText)
      return errorText
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
      title="Sign in to your account"
      buttonText="Sign in"
      linkText="Don't have an account? Sign up"
      linkTo="/signup"
      onSubmit={handleLogin}
      isLoading={isLoading}
      error={error}
    />
  )
} 
