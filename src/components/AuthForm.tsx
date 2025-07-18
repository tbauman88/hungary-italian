import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm, type FieldError } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { FormInput } from './FormInput'

const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type AuthFormData = z.infer<typeof authSchema>

interface AuthFormProps {
  title: string
  buttonText: string
  linkText: string
  linkTo: string
  mode: 'login' | 'signup'
  onSubmit: (email: string, password: string) => Promise<string | null>
  isLoading?: boolean
  error?: string | null
}

type Row = {
  label: string
  type: string
  autoComplete?: string
  placeholder?: string
  error?: FieldError
  required?: boolean
}

export const AuthForm: React.FC<AuthFormProps> = ({
  title,
  buttonText,
  linkText,
  linkTo,
  mode,
  onSubmit,
  isLoading,
  error,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    mode: 'onSubmit'
  })

  const handleFormSubmit = async (data: AuthFormData) => {
    return await onSubmit(data.email, data.password)
  }

  const rows: Record<string, Row> = {
    'email': {
      label: 'Email address',
      type: 'email',
      autoComplete: 'email',
      placeholder: 'Enter your email',
      error: errors.email,
      required: true,
    },
    'password': {
      label: 'Password',
      type: 'password',
      autoComplete: mode === 'login' ? 'current-password' : 'new-password',
      placeholder: 'Enter your password',
      error: errors.password,
      required: true,
    }
  }

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gradient-to-br from-white-50 via-white to-primary-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="relative z-10">

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                {title}
              </h1>

              <p className="text-gray-600 text-sm sm:text-base">
                {mode === 'login'
                  ? 'Welcome back! Sign in to access your recipes.'
                  : 'Join our community and start sharing your culinary creations!'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 sm:space-y-6">
            <input
              type="text"
              name="username"
              autoComplete="username"
              style={{ display: 'none' }}
              readOnly
            />

            {Object.entries(rows).map(([name, row]) => (
              <FormInput
                key={name}
                {...register(name as 'email' | 'password')}
                name={name}
                label={row.label}
                type={row.type}
                autoComplete={row.autoComplete}
                placeholder={row.placeholder}
                error={row.error}
                required={row.required}
              />
            ))}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !isValid}
              className="w-full py-3 sm:py-4 px-6 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold text-base sm:text-lg rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none disabled:shadow-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{buttonText}...</span>
                </div>
              ) : (
                buttonText
              )}
            </button>

            <div className="text-center pt-3 sm:pt-4 border-t border-gray-100">
              <Link
                to={linkTo}
                className="text-primary-600 hover:text-primary-700 text-sm font-semibold transition-colors duration-200"
              >
                {linkText}
              </Link>
            </div>
          </form>
        </div>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-xs text-gray-500">
            {mode === 'login'
              ? 'By signing in, you agree to our terms of service and privacy policy.'
              : 'By creating an account, you agree to our terms of service and privacy policy.'
            }
          </p>
        </div>
      </div>
    </div>
  )
} 
