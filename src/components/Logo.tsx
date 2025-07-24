
export const Logo = ({
  type = 'header',
  showText = false,
}: {
  type?: 'login' | 'header',
  showText?: boolean,
}) => {

  const defaultClasses = "mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl"

  const typeClasses = {
    login: "w-20 h-20 sm:w-24 sm:h-24 mb-6",
    header: "w-12 h-12 sm:w-14 sm:h-14"
  }

  return (
    <div className="flex items-center space-x-3 group transform hover:scale-105 transition-transform duration-300">
      <div className={`${defaultClasses} ${typeClasses[type]}`}>
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>

      </div>

      {showText && (
        <span className="text-2xl font-bold text-blue-700 group-hover:text-primary-600 transition-colors ">
          Ricette
        </span>
      )}
    </div>
  )
}
