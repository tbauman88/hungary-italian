import { ArrowRightEndOnRectangleIcon, HomeIcon, PlusIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export const Header = () => {
  const { currentUser, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <Link to="/" className="flex items-center space-x-3 min-w-0 flex-1 group">
            <span className="text-2xl sm:text-3xl font-bold text-primary-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-200">🍝</span>
            <span className="text-lg sm:text-xl font-bold text-gray-900 truncate group-hover:text-primary-600 transition-colors">
              <span className="hidden sm:inline">Hungary-Italian Recipes</span>
              <span className="sm:hidden">Recipes</span>
            </span>
          </Link>

          <nav className="flex items-center space-x-1 sm:space-x-2">
            {currentUser ? (
              <>
                <Link
                  to="/"
                  className="flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 text-gray-600 hover:text-primary-600 transition-all duration-200 rounded-xl hover:bg-primary-50 active:bg-primary-100"
                >
                  <HomeIcon className="w-6 h-6 sm:w-5 sm:h-5" />
                </Link>

                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Link
                    to="/profile/settings"
                    className="flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 text-gray-600 hover:text-primary-600 transition-all duration-200 rounded-xl hover:bg-primary-50 active:bg-primary-100"
                  >
                    <UserCircleIcon className="w-6 h-6 sm:w-5 sm:h-5" />
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 text-gray-600 hover:text-red-600 transition-all duration-200 rounded-xl hover:bg-red-50 active:bg-red-100"
                  >
                    <ArrowRightEndOnRectangleIcon className="w-6 h-6 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <Link
                  to="/add-recipe"
                  className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold px-4 py-3 sm:px-4 sm:py-2.5 rounded-xl transition-all duration-200 text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <PlusIcon className="w-5 h-5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Add Recipe</span>
                  <span className="sm:hidden">Add</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 text-gray-600 hover:text-primary-600 transition-all duration-200 rounded-xl hover:bg-primary-50 active:bg-primary-100"
                >
                  <UserIcon className="w-6 h-6 sm:w-5 sm:h-5" />
                </Link>

                <Link
                  to="/signup"
                  className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold px-4 py-3 sm:px-4 sm:py-2.5 rounded-xl transition-all duration-200 text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
} 
