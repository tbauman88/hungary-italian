import { ArrowRightEndOnRectangleIcon, HomeIcon, PlusIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Logo } from './Logo'

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
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <Logo type="header" showText />
          </Link>

          <nav className="flex items-center space-x-2 sm:space-x-4">
            {currentUser && (
              <>
                <Link
                  to="/"
                  className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 text-gray-600 hover:text-primary-600 transition-all duration-200 rounded-xl hover:bg-primary-50 active:bg-primary-100 group"
                  title="Home"
                >
                  <HomeIcon className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform duration-200" />
                </Link>

                <Link
                  to="/profile/pantry"
                  className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 text-gray-600 hover:text-primary-600 transition-all duration-200 rounded-xl hover:bg-primary-50 active:bg-primary-100 group"
                  title="My Pantry"
                >
                  <ShoppingBagIcon className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform duration-200" />
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

                <div className="h-8 w-px bg-gray-200 sm:mx-4 hidden sm:flex"></div>

                <Link
                  to="/recipe/add"
                  className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-3 sm:px-6 sm:py-2.5 rounded-xl transition-colors duration-200 text-sm shadow-md hover:shadow-lg hidden sm:flex"
                >
                  <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden sm:inline">Add Recipe</span>
                  <span className="sm:hidden">Add</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
} 
