import React from 'react'
import { Navigate } from 'react-router-dom'
import { AuthForm } from '../components/AuthForm'
import { useAuth } from '../contexts/AuthContext'

export const LoginPage: React.FC = () => {
  const { login, currentUser } = useAuth()

  if (currentUser) {
    return <Navigate to="/" replace />
  }

  return <AuthForm mode="login" onSubmit={login} />
} 
