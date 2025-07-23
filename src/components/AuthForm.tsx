import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm, type FieldError } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { FormInput } from './FormInput'
import { Logo } from './Logo'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-t  o-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-bounce"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 sm:mb-12">
            <div className="relative mb-6">
              <Logo type="login" />

              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3 sm:mb-4">
                {title}
              </h1>

              <p className="text-gray-600 text-base sm:text-md leading-relaxed max-w-sm mx-auto">
                {mode === 'login'
                  ? 'Welcome back! Sign in to access your recipes.'
                  : 'Join our community and start sharing your culinary creations!'
                }
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10 transform hover:scale-[1.02] transition-all duration-500">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 sm:space-y-8">
              <input
                type="text"
                name="username"
                autoComplete="username"
                style={{ display: 'none' }}
                readOnly
              />

              <div className="space-y-6">
                {Object.entries(rows).map(([name, row], index) => (
                  <div
                    key={name}
                    className="transform transition-all duration-300 hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <FormInput
                      {...register(name as 'email' | 'password')}
                      name={name}
                      label={row.label}
                      type={row.type}
                      autoComplete={row.autoComplete}
                      placeholder={row.placeholder}
                      error={row.error}
                      required={row.required}
                    />
                  </div>
                ))}
              </div>

              {error && (
                <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-2xl p-4 transform transition-all duration-300 animate-in slide-in-from-top-2">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !isValid}
                className="group relative w-full py-4 sm:py-5 px-8 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold text-lg sm:text-xl rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/30 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] disabled:transform-none disabled:shadow-none overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <div className="relative flex items-center justify-center space-x-3">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{buttonText}...</span>
                    </>
                  ) : (
                    <>
                      <span>{buttonText}</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </div>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 backdrop-blur-sm text-gray-500 font-medium">or</span>
                </div>
              </div>

              <div className="text-center">
                <Link
                  to={linkTo}
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-base font-semibold transition-all duration-200 hover:scale-105 group"
                >
                  <span>{linkText}</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </form>
          </div>

          <div className="text-center mt-8 sm:mt-10">
            <p className="text-sm text-gray-500/80 leading-relaxed">
              {mode === 'login'
                ? 'By signing in, you agree to our terms of service and privacy policy.'
                : 'By creating an account, you agree to our terms of service and privacy policy.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 
