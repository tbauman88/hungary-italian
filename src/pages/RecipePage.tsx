import { ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useParams } from 'react-router-dom'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { useGetRecipeByIdQuery } from '../generated/graphql'

export function RecipePage() {
  const { id } = useParams<{ id: string }>()
  const { loading, error, data } = useGetRecipeByIdQuery({
    variables: { id: id || '' },
  })

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600">Error: {error.message}</div>
  if (!data?.recipes_by_pk) return <div>Recipe not found</div>

  const recipe = data.recipes_by_pk

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={recipe.image_url || '/placeholder-recipe.jpg'}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-primary-600 font-medium">
              {recipe.cuisine_type}
            </span>
            <span className="text-sm text-gray-500 capitalize">
              {recipe.difficulty_level}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {recipe.title}
          </h1>

          <p className="text-gray-600 mb-6">
            {recipe.description}
          </p>

          <div className="flex items-center space-x-6 mb-8 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <ClockIcon className="w-5 h-5" />
              <span>Prep: {recipe.prep_time} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <ClockIcon className="w-5 h-5" />
              <span>Cook: {recipe.cooking_time} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <UserGroupIcon className="w-5 h-5" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients?.map((ingredient: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Instructions
              </h2>
              <ol className="space-y-3">
                {recipe.instructions?.map((instruction: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-primary-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
