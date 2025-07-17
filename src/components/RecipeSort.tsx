import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { RecipeType } from '../types'

export type SortOption = 'all' | RecipeType
export type SortDirection = 'ASC' | 'DESC'

interface RecipeSortProps {
  sortBy: SortOption
  sortDirection: SortDirection
  onSortChange: (sortBy: SortOption, direction: SortDirection) => void
}

const sortOptions = [
  { value: 'all' as const, label: 'All Types' },
  { value: RecipeType.MAINS, label: RecipeType.MAINS },
  { value: RecipeType.SIDES, label: RecipeType.SIDES },
  { value: RecipeType.APPETIZERS, label: RecipeType.APPETIZERS },
  { value: RecipeType.SALADS, label: RecipeType.SALADS },
  { value: RecipeType.SOUPS, label: RecipeType.SOUPS },
  { value: RecipeType.DESSERTS, label: RecipeType.DESSERTS },
] as const

export const RecipeSort = ({ sortBy, sortDirection, onSortChange }: RecipeSortProps) => {
  const handleSortChange = (newSortBy: SortOption) => {
    const newDirection = newSortBy === sortBy && sortDirection === 'ASC' ? 'DESC' : 'ASC'
    onSortChange(newSortBy, newDirection)
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value as SortOption)}
          className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 cursor-pointer"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDownIcon className="h-4 w-4 text-gray-400" />
        </div>
      </div>
      {sortBy !== 'all' && (
        <button
          onClick={() => onSortChange(sortBy, sortDirection === 'ASC' ? 'DESC' : 'ASC')}
          className="px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:border-gray-400 transition-colors"
          title={`Sort ${sortDirection === 'ASC' ? 'descending' : 'ascending'}`}
        >
          {sortDirection === 'ASC' ? '↑' : '↓'}
        </button>
      )}
    </div>
  )
} 
