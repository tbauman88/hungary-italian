import { zodResolver } from '@hookform/resolvers/zod'
import React, { useActionState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormInput } from './FormInput'

interface ProfileFormProps {
  type: 'email' | 'password'
  currentEmail?: string
  onSubmit: (data: any) => Promise<void>
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

export const ProfileForm: React.FC<ProfileFormProps> = ({ type, currentEmail, onSubmit }) => {
  const isEmailForm = type === 'email'

  const emailForm = useForm<EmailUpdateData>({
    resolver: zodResolver(emailUpdateSchema),
    defaultValues: { newEmail: currentEmail || '', currentPassword: '' },
  })

  const passwordForm = useForm<PasswordUpdateData>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  })

  const [error, submitAction, isPending] = useActionState(
    async (previousState: string | null, formData: FormData) => {
      try {
        const data = isEmailForm
          ? {
            newEmail: formData.get('newEmail') as string,
            currentPassword: formData.get('currentPassword') as string,
          }
          : {
            currentPassword: formData.get('currentPassword') as string,
            newPassword: formData.get('newPassword') as string,
            confirmPassword: formData.get('confirmPassword') as string,
          }

        const schema = isEmailForm ? emailUpdateSchema : passwordUpdateSchema
        const validation = schema.safeParse(data)
        if (!validation.success) {
          return 'Please check your input and try again.'
        }

        // For password forms, don't pass confirmPassword to parent
        const submitData = isEmailForm
          ? data
          : {
            currentPassword: (data as PasswordUpdateData).currentPassword,
            newPassword: (data as PasswordUpdateData).newPassword,
          }

        await onSubmit(submitData)

        if (isEmailForm) {
          emailForm.reset({ newEmail: (data as EmailUpdateData).newEmail, currentPassword: '' })
        } else {
          passwordForm.reset()
        }

        return null
      } catch (error: any) {
        const errorMessage = error?.message || 'An error occurred. Please try again.'

        if (errorMessage.includes('wrong-password') || errorMessage.includes('invalid-credential')) {
          return 'Incorrect current password. Please try again.'
        } else if (errorMessage.includes('email-already-in-use')) {
          return 'This email address is already in use by another account.'
        } else if (errorMessage.includes('invalid-email')) {
          return 'Please enter a valid email address.'
        } else if (errorMessage.includes('weak-password')) {
          return 'Password is too weak. Please choose a stronger password.'
        } else if (errorMessage.includes('requires-recent-login')) {
          return `For security reasons, please log out and log back in before changing your ${type}.`
        } else {
          return errorMessage
        }
      }
    },
    null
  )

  const handleSubmit = async (formData: FormData) => {
    await submitAction(formData)
  }

  const title = isEmailForm ? 'Update Email Address' : 'Update Password'
  const buttonText = isEmailForm ? 'Update Email' : 'Update Password'

  return (
    <form action={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>

        <div className="space-y-4">
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
              />

              <FormInput
                label="Confirm New Password"
                type="password"
                {...passwordForm.register('confirmPassword')}
                error={passwordForm.formState.errors.confirmPassword}
                placeholder="Confirm your new password"
                autoComplete="new-password"
              />
            </>
          )}
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-800">{error}</div>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : buttonText}
          </button>
        </div>
      </div>
    </form>
  )
} 
