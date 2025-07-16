import { HomeIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">🍝</span>
            <span className="text-xl font-semibold text-gray-900">Hungary-Italian Recipes</span>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <HomeIcon className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/add-recipe"
              className="flex items-center space-x-1 btn-primary"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Add Recipe</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
} 
