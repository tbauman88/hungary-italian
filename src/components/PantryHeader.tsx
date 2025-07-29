import { ShoppingBagIcon } from '@heroicons/react/24/outline'

export const PantryHeader = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="px-6 py-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
            <ShoppingBagIcon className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Pantry</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your ingredients and discover recipes</p>
          </div>
        </div>
      </div>
    </div>
  )
} 
