import React from 'react'
import { Navigate } from 'react-router-dom'
import { AuthForm } from '../components/AuthForm'
import { useAuth } from '../contexts/AuthContext'

export const SignupPage: React.FC = () => {
  const { register, currentUser } = useAuth()

  if (currentUser) {
    return <Navigate to="/" replace />
  }

  return <AuthForm mode="signup" onSubmit={register} />
} 
