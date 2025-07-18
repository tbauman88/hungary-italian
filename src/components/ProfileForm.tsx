import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormInput } from './FormInput'

interface ProfileFormProps {
  type: 'email' | 'password'
  currentEmail?: string
  onSubmit: (data: any) => Promise<string | null>
  isLoading?: boolean
  error?: string | null
}

const emailUpdateSchema = z.object({
  newEmail: z.string().email('Please enter a valid email address'),
  currentPassword: z.string().min(1, 'Current password is required'),
})

const passwordUpdateSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type EmailUpdateData = z.infer<typeof emailUpdateSchema>
type PasswordUpdateData = z.infer<typeof passwordUpdateSchema>

export const ProfileForm: React.FC<ProfileFormProps> = ({ type, currentEmail, onSubmit, isLoading, error }) => {
  const isEmailForm = type === 'email'

  const emailForm = useForm<EmailUpdateData>({
    resolver: zodResolver(emailUpdateSchema),
    defaultValues: { newEmail: currentEmail || '', currentPassword: '' },
    mode: 'onChange'
  })

  const passwordForm = useForm<PasswordUpdateData>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
    mode: 'onChange'
  })

  const activeForm = isEmailForm ? emailForm : passwordForm

  const handleFormSubmit = async (data: EmailUpdateData | PasswordUpdateData) => {
    // For password forms, don't pass confirmPassword to parent
    const submitData = isEmailForm
      ? data
      : {
        currentPassword: (data as PasswordUpdateData).currentPassword,
        newPassword: (data as PasswordUpdateData).newPassword,
      }

    const result = await onSubmit(submitData)

    // Reset form on success (when result is null)
    if (result === null) {
      if (isEmailForm) {
        emailForm.reset({ newEmail: '', currentPassword: '' })
      } else {
        passwordForm.reset()
      }
    }

    return result
  }

  const submitText = isEmailForm ? 'Update Email' : 'Update Password'

  return (
    <div className="space-y-6">
      {/* Hidden username field for accessibility - helps password managers */}
      <input
        type="text"
        name="username"
        value={currentEmail || ''}
        autoComplete="username"
        style={{ display: 'none' }}
        readOnly
      />

      {isEmailForm && (
        <div className="space-y-6">
          {/* Current Email Display */}
          <div className="flex items-center space-x-3">
            <span className="text-lg">✉️</span>
            <h3 className="text-lg font-semibold text-gray-900">Update Email Address</h3>
          </div>

          <FormInput
            label="Current Email"
            type="email"
            value={currentEmail || ''}
            readOnly
            disabled
          />

          {/* New Email Field */}
          <FormInput
            label="New Email Address"
            type="email"
            {...emailForm.register('newEmail')}
            error={emailForm.formState.errors.newEmail}
            placeholder="Enter your new email address"
            autoComplete="email"
            required
          />

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <span className="text-lg">🔑</span>
              <h3 className="text-lg font-semibold text-gray-900">Verification</h3>
            </div>
            {/* Current Password for Verification */}
            <FormInput
              label="Current Password"
              type="password"
              {...emailForm.register('currentPassword')}
              error={emailForm.formState.errors.currentPassword}
              placeholder="Enter your current password for verification"
              autoComplete="current-password"
              required
            />
          </div>
        </div>
      )}

      {!isEmailForm && (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-lg">🔐</span>
              <h3 className="text-lg font-semibold text-gray-900">Update Password</h3>
            </div>

            <FormInput
              label="New Password"
              type="password"
              {...passwordForm.register('newPassword')}
              error={passwordForm.formState.errors.newPassword}
              placeholder="Enter your new password (min. 6 characters)"
              autoComplete="new-password"
              required
            />

            <FormInput
              label="Confirm New Password"
              type="password"
              {...passwordForm.register('confirmPassword')}
              error={passwordForm.formState.errors.confirmPassword}
              placeholder="Confirm your new password"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <span className="text-lg">🔑</span>
              <h3 className="text-lg font-semibold text-gray-900">Verification</h3>
            </div>

            <FormInput
              label="Current Password"
              type="password"
              {...passwordForm.register('currentPassword')}
              error={passwordForm.formState.errors.currentPassword}
              placeholder="Enter your current password"
              autoComplete="current-password"
              required
            />
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="button"
          onClick={activeForm.handleSubmit(handleFormSubmit)}
          disabled={!activeForm.formState.isValid || isLoading}
          className={`w-full flex items-center justify-center px-6 py-4 text-base font-semibold rounded-xl transition-all duration-200 ${activeForm.formState.isValid && !isLoading
            ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Updating...</span>
            </div>
          ) : (
            submitText
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <span className="text-red-500">⚠️</span>
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        </div>
      )}
    </div>
  )
} 
