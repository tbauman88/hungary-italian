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
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
        placeholder={placeholder}
      />
    </div>
  )
} 
