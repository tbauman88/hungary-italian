import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

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
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-12 pr-4 py-3 sm:py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base sm:text-sm transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
        placeholder={placeholder}
      />
    </div>
  )
} 
