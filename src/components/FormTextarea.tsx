import { forwardRef } from 'react'
import type { FieldError } from 'react-hook-form'

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: FieldError
  required?: boolean
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, required, className, ...props }, ref) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label} {required && '*'}
        </label>
        <textarea
          {...props}
          ref={ref}
          className={`w-full px-4 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none ${error ? 'border-red-500' : 'border-gray-300'
            } ${className || ''}`}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600">{error.message}</p>
        )}
      </div>
    )
  }
)

FormTextarea.displayName = 'FormTextarea'
