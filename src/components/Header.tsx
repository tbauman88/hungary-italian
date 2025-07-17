import { ArrowRightOnRectangleIcon, HomeIcon, PlusIcon, UserIcon } from '@heroicons/react/24/outline'
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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link to="/" className="flex items-center space-x-2 min-w-0 flex-1">
            <span className="text-xl sm:text-2xl font-bold text-primary-600 flex-shrink-0">🍝</span>
            <span className="text-sm sm:text-xl font-semibold text-gray-900 truncate">
              <span className="hidden sm:inline">Hungary-Italian Recipes</span>
              <span className="sm:hidden">Recipes</span>
            </span>
          </Link>

          <nav className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100"
            >
              <HomeIcon className="w-5 h-5 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline text-sm">Home</span>
            </Link>

            {currentUser ? (
              <>
                <Link
                  to="/add-recipe"
                  className="flex items-center space-x-1 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white font-medium px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm"
                >
                  <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Add Recipe</span>
                  <span className="sm:hidden">Add</span>
                </Link>

                <div className="flex items-center space-x-2">
                  <div className="hidden sm:flex items-center space-x-2 text-gray-600">
                    <UserIcon className="w-4 h-4" />
                    <span className="text-sm truncate max-w-32">
                      {currentUser.email}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span className="hidden sm:inline text-sm">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100"
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm">Login</span>
                </Link>

                <Link
                  to="/signup"
                  className="flex items-center space-x-1 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white font-medium px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm"
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
