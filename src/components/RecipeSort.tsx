import { ArrowsUpDownIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
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
    <div className="flex items-center space-x-3 w-full sm:w-auto">
      <div className="relative flex-1 sm:flex-none">
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value as SortOption)}
          className="appearance-none w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-4 py-3 sm:py-2.5 pr-10 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      {sortBy !== 'all' && (
        <button
          onClick={() => onSortChange(sortBy, sortDirection === 'ASC' ? 'DESC' : 'ASC')}
          className="flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          title={`Sort ${sortDirection === 'ASC' ? 'descending' : 'ascending'}`}
        >
          <ArrowsUpDownIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  )
} 
