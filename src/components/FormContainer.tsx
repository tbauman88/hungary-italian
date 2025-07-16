interface FormContainerProps {
  title: string
  onSubmit: (e: React.FormEvent) => void
  children: React.ReactNode
  submitText: string
  isLoading?: boolean
  isValid?: boolean
  error?: string | null
}

export const FormContainer = ({
  title,
  onSubmit,
  children,
  submitText,
  isLoading = false,
  isValid = true,
  error
}: FormContainerProps) => {
  return (
    <div className="sm:max-w-2xl sm:mx-auto sm:px-4 lg:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 px-4 sm:px-0">
        {title}
      </h1>

      <form onSubmit={onSubmit} className="bg-white sm:rounded-lg sm:shadow-md p-4 sm:p-6 space-y-6 min-h-screen sm:min-h-0">
        {children}

        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading || !isValid}
          className="w-full py-4 px-6 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold text-lg rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          {isLoading ? `${submitText}...` : submitText}
        </button>
      </form>
    </div>
  )
} 
