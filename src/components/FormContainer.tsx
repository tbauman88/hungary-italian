interface FormContainerProps {
  title: string
  onSubmit?: (e: React.FormEvent) => void
  action?: (formData: FormData) => void | Promise<void>
  children: React.ReactNode
  submitText: string
  isLoading?: boolean
  isValid?: boolean
  error?: string | null
}

const SubmitButton = ({ submitText, isLoading, isValid }: {
  submitText: string
  isLoading?: boolean
  isValid?: boolean
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading || !isValid}
      className="w-full py-4 px-6 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold text-lg rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none disabled:shadow-none"
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>{submitText}...</span>
        </div>
      ) : (
        submitText
      )}
    </button>
  )
}

export const FormContainer = ({
  title,
  onSubmit,
  action,
  children,
  submitText,
  isLoading = false,
  isValid = true,
  error
}: FormContainerProps) => {
  return (
    <div className="min-h-screen bg-white sm:bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="text-center mb-8 sm:mb-16">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                {title}
              </h1>

              <div className="max-w-2xl mx-auto">
                <p className="text-gray-600 text-base sm:text-xl leading-relaxed">
                  {title.includes('Create') ? (
                    "Craft your culinary masterpiece by adding ingredients, step-by-step directions, and flavor notes to your new recipe."
                  ) : (
                    "Share your culinary masterpiece by updating your recipe details below."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          action={action}
          className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-12 space-y-6 sm:space-y-12"
        >
          {children}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          <div className="pt-6 sm:pt-8 border-t border-gray-100">
            <SubmitButton
              submitText={submitText}
              isLoading={isLoading}
              isValid={isValid}
            />
          </div>
        </form>
      </div>
    </div>
  )
} 
