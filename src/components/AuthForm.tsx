import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { FormContainer } from './FormContainer'
import { FormInput } from './FormInput'

const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type AuthFormData = z.infer<typeof authSchema>

interface AuthFormProps {
  mode: 'login' | 'signup'
  onSubmit: (email: string, password: string) => Promise<string | null>
  isLoading?: boolean
  error?: string | null
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, isLoading, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    mode: 'onChange'
  })

  const handleFormSubmit = async (data: AuthFormData) => {
    return await onSubmit(data.email, data.password)
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

        <FormContainer
          title=""
          onSubmit={handleSubmit(handleFormSubmit)}
          submitText={buttonText}
          isLoading={isLoading}
          isValid={isValid}
          error={error}
        >
          {/* Hidden username field for accessibility */}
          <input
            type="text"
            name="username"
            autoComplete="username"
            style={{ display: 'none' }}
            readOnly
          />

          <FormInput
            {...register('email')}
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            error={errors.email}
            required
          />

          <FormInput
            {...register('password')}
            name="password"
            label="Password"
            type="password"
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            placeholder="Enter your password"
            error={errors.password}
            required
          />

          <div className="text-center">
            <Link
              to={linkTo}
              className="text-primary-600 hover:text-primary-500 text-sm font-medium"
            >
              {linkText}
            </Link>
          </div>
        </FormContainer>
      </div>
    </div>
  )
} 
