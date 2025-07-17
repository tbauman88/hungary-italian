import { forwardRef } from 'react'
import type { FieldError } from 'react-hook-form'

interface Option {
  value: string
  label: string
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: Option[]
  error?: FieldError
  placeholder?: string
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, options, error, placeholder = "Select an option", className, ...props }, ref) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
        <div className="relative">
          <select
            {...props}
            ref={ref}
            className={`w-full px-4 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white appearance-none pr-10 ${error ? 'border-red-500' : 'border-gray-300'
              } ${className || ''}`}
          >
            <option value="">{placeholder}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error.message}</p>
        )}
      </div>
    )
  }
)

FormSelect.displayName = 'FormSelect'
