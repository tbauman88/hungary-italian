import { PlusIcon } from '@heroicons/react/24/outline'

export const PantryHeader = ({ onAddClick }: { onAddClick: () => void }) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My Pantry</h1>
          <button
            onClick={onAddClick}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-medium transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  )
} 
