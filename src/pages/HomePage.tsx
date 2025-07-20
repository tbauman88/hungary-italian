import { PlusIcon } from '@heroicons/react/24/outline'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { RecipeCard } from '../components/RecipeCard'
import { RecipeSearch } from '../components/RecipeSearch'
import { RecipeSort, type SortDirection, type SortOption } from '../components/RecipeSort'
import { useAuth } from '../contexts/AuthContext'
import { useGetRecipesQuery, type GetRecipesQuery } from '../generated/graphql'
import { useDebounce } from '../hooks/useDebounce'

type Recipe = GetRecipesQuery['recipes'][0]

export const HomePage = () => {
  const { currentUser, currentUserId } = useAuth()
  const [searchValue, setSearchValue] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('all')
  const [sortDirection, setSortDirection] = useState<SortDirection>('ASC')

  const debouncedSearchValue = useDebounce(searchValue, 300)

  const { loading, error, data } = useGetRecipesQuery({
    variables: { owner_id: currentUserId! },
    skip: !currentUser || !currentUserId,
  })

  const filteredAndSortedRecipes = useMemo(() => {
    if (!data?.recipes) return []

    let filtered = data.recipes.filter((recipe: Recipe) => {
      if (!debouncedSearchValue.trim()) return true

      const searchLower = debouncedSearchValue.toLowerCase()
      const titleMatch = recipe.title.toLowerCase().includes(searchLower)

      return titleMatch
    })

    if (sortBy !== 'all') {
      filtered = filtered.filter((recipe: Recipe) => recipe.type === sortBy)
    }

    filtered.sort((a: Recipe, b: Recipe) => {
      const aValue = a.title.toLowerCase()
      const bValue = b.title.toLowerCase()

      if (sortDirection === 'ASC') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [data?.recipes, debouncedSearchValue, sortBy, sortDirection])

  const handleSortChange = (newSortBy: SortOption, newDirection: SortDirection) => {
    setSortBy(newSortBy)
    setSortDirection(newDirection)
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600 p-4 text-center">Error: {error.message}</div>

  const hasRecipes = data?.recipes?.length !== 0

  return (
    <div className="space-y-6 relative">
      {hasRecipes && (
        <>
          <div className="space-y-4 sm:space-y-0 sm:flex sm:flex-row sm:gap-4 sm:items-start sm:justify-between px-4 sm:px-0">
            <div className="w-full sm:w-96">
              <RecipeSearch
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                placeholder="Search recipes by title..."
              />
            </div>
            <div className="w-full sm:w-auto">
              <RecipeSort
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSortChange={handleSortChange}
              />
            </div>
          </div>

          {filteredAndSortedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
              {filteredAndSortedRecipes.map((recipe: Recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe as any} />
              ))}
            </div>
          ) : (debouncedSearchValue || sortBy !== 'all') ? (
            <NoRecipesFound searchValue={searchValue} setSearchValue={setSearchValue} sortBy={sortBy} setSortBy={setSortBy} />
          ) : null}
        </>
      )}

      {!hasRecipes && (
        <CallToAction />
      )}

      <Link
        to="/recipe/add"
        className="fixed bottom-6 right-6 sm:hidden bg-primary-600 hover:bg-primary-700 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 z-40"
      >
        <PlusIcon className="w-6 h-6" />
      </Link>
    </div>
  )
}

const CallToAction = () => (
  <div className="text-center py-16 px-4">
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-8xl mb-6">🧀</div>

      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Start Your Culinary Journey
      </h3>

      <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
        Create your very first recipe and share the magic of turning simple ingredients into unforgettable dishes!
      </p>

      <Link
        to="/recipe/add"
        className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <PlusIcon className="w-5 h-5" />
        <span>Add Your First Recipe</span>
      </Link>

      <p className="text-sm text-gray-400 mt-4">
        Takes less than 5 minutes to create your first recipe
      </p>
    </div>
  </div>
)

const NoRecipesFound = ({
  searchValue, setSearchValue,
  sortBy, setSortBy
}: {
  searchValue: string,
  setSearchValue: (value: string) => void, sortBy: SortOption, setSortBy: (value: SortOption) => void
}) => (
  <div className="text-center py-16 px-4">
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-gray-900">
        No recipes found
      </h3>
      <p className="text-gray-600">
        Try adjusting your search terms or selecting a different recipe type.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        {searchValue && (
          <button
            onClick={() => setSearchValue('')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear search
          </button>
        )}
        {sortBy !== 'all' && (
          <button
            onClick={() => setSortBy('all')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Show all types
          </button>
        )}
      </div>
    </div>
  </div>
)

