import { LoadingSpinner } from '../components/LoadingSpinner'
import { RecipeCard } from '../components/RecipeCard'
import { useGetRecipesQuery } from '../generated/graphql'

export function HomePage() {
  const { loading, error, data } = useGetRecipesQuery()

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600 p-4 text-center">Error: {error.message}</div>

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3 px-2 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          Delicious Hungary-Italian Recipes
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Explore recipes for every occasion.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {data?.recipes?.map((recipe: any) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {data?.recipes?.length === 0 && (
        <div className="text-center py-16 px-4">
          <div className="max-w-md mx-auto space-y-4">
            <div className="text-6xl mb-4">🍝</div>
            <h3 className="text-lg font-semibold text-gray-900">No recipes yet</h3>
            <p className="text-gray-500">Be the first to add a delicious Hungary-Italian fusion recipe!</p>
          </div>
        </div>
      )}
    </div>
  )
} 
