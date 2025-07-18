import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm, type FieldError } from 'react-hook-form'
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
    <div className="lg:min-h-[calc(100vh-128px)] flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
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
