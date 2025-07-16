import { LoadingSpinner } from '../components/LoadingSpinner'
import { RecipeCard } from '../components/RecipeCard'
import { useGetRecipesQuery } from '../generated/graphql'

export function HomePage() {
  const { loading, error, data } = useGetRecipesQuery()

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600">Error: {error.message}</div>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Delicious Hungary-Italian Recipes
        </h1>
        <p className="text-lg text-gray-600">
          Discover the perfect fusion of Hungarian and Italian cuisine
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.recipes?.map((recipe: any) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {data?.recipes?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No recipes found. Be the first to add one!</p>
        </div>
      )}
    </div>
  )
} 
