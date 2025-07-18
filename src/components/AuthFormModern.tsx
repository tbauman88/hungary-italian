import React, { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Link } from 'react-router-dom'

interface AuthFormModernProps {
  mode: 'login' | 'signup'
  onSubmit: (email: string, password: string) => Promise<void>
}

const SubmitButton = ({ isLogin }: { isLogin: boolean }) => {
  const { pending } = useFormStatus()
  const buttonText = isLogin ? 'Sign in' : 'Sign up'

  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        buttonText
      )}
    </button>
  )
}

export const AuthFormModern: React.FC<AuthFormModernProps> = ({ mode, onSubmit }) => {
  const [error, submitAction, isPending] = useActionState(
    async (previousState: string | null, formData: FormData) => {
      const email = formData.get('email') as string
      const password = formData.get('password') as string

      if (!email || !email.includes('@')) {
        return 'Please enter a valid email address.'
      }

      if (!password || password.length < 6) {
        return 'Password must be at least 6 characters.'
      }

      try {
        await onSubmit(email, password)
        return null
      } catch (error: any) {
        const errorMessage = error?.message || 'An error occurred. Please try again.'

        if (errorMessage.includes('user-not-found')) {
          return 'No account found with this email address.'
        } else if (errorMessage.includes('wrong-password')) {
          return 'Incorrect password. Please try again.'
        } else if (errorMessage.includes('email-already-in-use')) {
          return 'An account with this email already exists.'
        } else if (errorMessage.includes('weak-password')) {
          return 'Password is too weak. Please choose a stronger password.'
        } else if (errorMessage.includes('invalid-email')) {
          return 'Please enter a valid email address.'
        } else {
          return errorMessage
        }
      }
    },
    null
  )

  const isLogin = mode === 'login'
  const title = isLogin ? 'Sign in to your account' : 'Create your account'
  const linkText = isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'
  const linkTo = isLogin ? '/signup' : '/login'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center">
            <span className="text-4xl">🧀</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
        </div>

        <form className="mt-8 space-y-6" action={submitAction}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                required
                minLength={6}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-800">{error}</div>
            </div>
          )}

          <div>
            <SubmitButton isLogin={isLogin} />
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
