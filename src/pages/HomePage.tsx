import { PlusIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { RecipeCard } from '../components/RecipeCard'
import { useAuth } from '../contexts/AuthContext'
import { useGetRecipesQuery } from '../generated/graphql'

export const HomePage = () => {
  const { currentUser, currentUserId } = useAuth()

  const { loading, error, data } = useGetRecipesQuery({
    variables: { owner_id: currentUserId! },
    skip: !currentUser || !currentUserId,
  })

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600 p-4 text-center">Error: {error.message}</div>

  const hasRecipes = data?.recipes?.length !== 0

  return (
    <div className="space-y-6">
      {hasRecipes && (
        <>
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
        </>
      )}

      {!hasRecipes && (
        <div className="text-center py-16 px-4">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-8xl mb-6">🍝</div>

            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Start Your Culinary Journey
            </h3>

            <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
              Create your very first recipe and share the magic of turning simple ingredients into unforgettable dishes!
            </p>

            <Link
              to="/add-recipe"
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
      )}
    </div>
  )
} 
