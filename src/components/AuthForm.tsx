import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type AuthFormData = z.infer<typeof authSchema>

interface AuthFormProps {
  mode: 'login' | 'signup'
  onSubmit: (email: string, password: string) => Promise<void>
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  })

  const handleFormSubmit = async (data: AuthFormData) => {
    setIsSubmitting(true)
    setAuthError(null)

    try {
      await onSubmit(data.email, data.password)
    } catch (error: any) {
      const errorMessage = error?.message || 'An error occurred. Please try again.'

      // Provide user-friendly error messages
      if (errorMessage.includes('user-not-found')) {
        setAuthError('No account found with this email address.')
      } else if (errorMessage.includes('wrong-password')) {
        setAuthError('Incorrect password. Please try again.')
      } else if (errorMessage.includes('email-already-in-use')) {
        setAuthError('An account with this email already exists.')
      } else if (errorMessage.includes('weak-password')) {
        setAuthError('Password is too weak. Please choose a stronger password.')
      } else if (errorMessage.includes('invalid-email')) {
        setAuthError('Please enter a valid email address.')
      } else {
        setAuthError(errorMessage)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const isLogin = mode === 'login'
  const title = isLogin ? 'Sign in to your account' : 'Create your account'
  const buttonText = isLogin ? 'Sign in' : 'Sign up'
  const linkText = isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'
  const linkTo = isLogin ? '/signup' : '/login'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center">
            <span className="text-4xl">🍝</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          {authError && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-800">{authError}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                buttonText
              )}
            </button>
          </div>

          <div className="text-center">
            <Link
              to={linkTo}
              className="text-primary-600 hover:text-primary-500 text-sm font-medium"
            >
              {linkText}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
} 
