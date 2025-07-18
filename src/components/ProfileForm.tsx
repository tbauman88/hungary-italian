import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from './FormContainer'
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
        emailForm.reset({ newEmail: (data as EmailUpdateData).newEmail, currentPassword: '' })
      } else {
        passwordForm.reset()
      }
    }

    return result
  }

  const title = isEmailForm ? 'Update Email Address' : 'Update Password'
  const submitText = isEmailForm ? 'Update Email' : 'Update Password'

  return (
    <FormContainer
      title={title}
      onSubmit={activeForm.handleSubmit(handleFormSubmit)}
      submitText={submitText}
      isLoading={isLoading}
      isValid={activeForm.formState.isValid}
      error={error}
    >
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
        <>
          <FormInput
            label="Current Email"
            name="currentEmail"
            type="email"
            value={currentEmail || ''}
            disabled
            className="bg-gray-50"
          />

          <FormInput
            label="New Email Address"
            type="email"
            {...emailForm.register('newEmail')}
            error={emailForm.formState.errors.newEmail}
            placeholder="Enter your new email address"
            autoComplete="email"
            required
          />
        </>
      )}

      <FormInput
        label="Current Password"
        type="password"
        {...(isEmailForm ? emailForm.register('currentPassword') : passwordForm.register('currentPassword'))}
        error={isEmailForm ? emailForm.formState.errors.currentPassword : passwordForm.formState.errors.currentPassword}
        placeholder={isEmailForm ? "Enter your current password for verification" : "Enter your current password"}
        autoComplete="current-password"
        required
      />

      {!isEmailForm && (
        <>
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
        </>
      )}
    </FormContainer>
  )
} 
