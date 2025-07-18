import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface RecipeSearchProps {
  searchValue: string
  onSearchChange: (value: string) => void
  placeholder?: string
}

export const RecipeSearch = ({
  searchValue,
  onSearchChange,
  placeholder = "Search recipes..."
}: RecipeSearchProps) => {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
      </div>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-12 pr-12 py-3 sm:py-2.5 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base sm:text-sm transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
        placeholder={placeholder}
      />
      {searchValue && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  )
} 
