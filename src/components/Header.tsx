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
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <span className="text-2xl sm:text-3xl font-bold text-primary-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-200">🍝</span>
              <div className="absolute -inset-1 bg-primary-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                <span className="hidden sm:inline">Hungary-Italian Recipes</span>
                <span className="sm:hidden">Recipes</span>
              </span>
            </div>
          </Link>

          <nav className="flex items-center space-x-2 sm:space-x-4">
            {currentUser ? (
              <>
                <Link
                  to="/"
                  className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 text-gray-600 hover:text-primary-600 transition-all duration-200 rounded-xl hover:bg-primary-50 active:bg-primary-100 group"
                  title="Home"
                >
                  <HomeIcon className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform duration-200" />
                </Link>

                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Link
                    to="/profile/settings"
                    className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 text-gray-600 hover:text-primary-600 transition-all duration-200 rounded-xl hover:bg-primary-50 active:bg-primary-100 group"
                    title="Profile Settings"
                  >
                    <UserCircleIcon className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform duration-200" />
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 text-gray-600 hover:text-red-600 transition-all duration-200 rounded-xl hover:bg-red-50 active:bg-red-100 group"
                    title="Logout"
                  >
                    <ArrowRightEndOnRectangleIcon className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform duration-200" />
                  </button>
                </div>

                <div className="h-8 w-px bg-gray-200 mx-2 sm:mx-4"></div>

                <Link
                  to="/add-recipe"
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 active:from-primary-800 active:to-primary-900 text-white font-semibold px-4 py-3 sm:px-6 sm:py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden sm:inline">Add Recipe</span>
                  <span className="sm:hidden">Add</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 text-gray-600 hover:text-primary-600 transition-all duration-200 rounded-xl hover:bg-primary-50 active:bg-primary-100 group"
                  title="Login"
                >
                  <UserIcon className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform duration-200" />
                </Link>

                <div className="h-8 w-px bg-gray-200 mx-2 sm:mx-4"></div>

                <Link
                  to="/signup"
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 active:from-primary-800 active:to-primary-900 text-white font-semibold px-4 py-3 sm:px-6 sm:py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
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
