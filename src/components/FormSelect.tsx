import { ChevronDownIcon } from '@heroicons/react/24/outline'
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
  required?: boolean
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, options, error, placeholder = "Select an option", required, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          <select
            {...props}
            ref={ref}
            className={`w-full px-4 py-3.5 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg bg-white appearance-none pr-12 cursor-pointer ${error
                ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 hover:border-gray-400'
              } ${className || ''}`}
          >
            <option value="">{placeholder}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
          </div>
          {error && (
            <div className="absolute inset-y-0 right-8 flex items-center pr-3">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600 font-medium flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error.message}</span>
          </p>
        )}
      </div>
    )
  }
)

FormSelect.displayName = 'FormSelect'
