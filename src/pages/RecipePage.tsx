import { ClockIcon, HeartIcon, PencilIcon, ShareIcon, UserGroupIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import { Link, useParams } from 'react-router-dom'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { useAuth } from '../contexts/AuthContext'
import { useGetRecipeByIdQuery } from '../generated/graphql'

export const RecipePage = () => {
  const { id } = useParams<{ id: string }>()
  const { currentUserId } = useAuth()
  const { loading, error, data } = useGetRecipeByIdQuery({
    variables: { id: id || '' },
  })

  const handleVideoClick = (e: React.MouseEvent, videoUrl: string) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(videoUrl, '_blank', 'noopener,noreferrer')
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600">Error: {error.message}</div>
  if (!data?.recipes_by_pk) return <div>Recipe not found</div>

  const recipe = data.recipes_by_pk

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Recipe Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative">
            <img
              src={recipe.image_url || ''}
              alt={recipe.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />

            {/* Video overlay */}
            {recipe.video_url && (
              <div className="absolute top-4 right-4">
                <button
                  onClick={(e) => handleVideoClick(e, recipe.video_url!)}
                  className="bg-black/80 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <VideoCameraIcon className="w-4 h-4" />
                  <span>Watch Video</span>
                </button>
              </div>
            )}

            {/* Recipe type badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm text-primary-600 px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wide shadow-sm">
                {recipe.type || 'Recipe'}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
              <div className="flex-1 min-w-0 mb-4 sm:mb-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                  {recipe.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4">
                  {recipe.cooking_time && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <div className="bg-gray-100 p-1.5 rounded-lg">
                        <ClockIcon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{recipe.cooking_time} min</span>
                    </div>
                  )}
                  {recipe.portion_size && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <div className="bg-gray-100 p-1.5 rounded-lg">
                        <UserGroupIcon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{recipe.portion_size} servings</span>
                    </div>
                  )}
                  {recipe.complexity && (
                    <div className="flex items-center space-x-2">
                      <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-medium capitalize">
                        {recipe.complexity}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-red-500 transition-colors rounded-xl hover:bg-red-50">
                  <HeartIcon className="w-5 h-5" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 transition-colors rounded-xl hover:bg-gray-50">
                  <ShareIcon className="w-5 h-5" />
                </button>
                {currentUserId === recipe.owner_id && (
                  <Link
                    to={`/recipe/${id}/edit`}
                    className="inline-flex items-center px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <PencilIcon className="w-4 h-4 mr-2" />
                    Edit Recipe
                  </Link>
                )}
              </div>
            </div>

            {recipe.notes && (
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                {recipe.notes}
              </p>
            )}
          </div>
        </div>

        {/* Recipe Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Instructions */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Instructions</h2>
            </div>

            <ol className="space-y-4">
              {recipe.steps?.map((instruction: string, index: number) => (
                <li key={index} className="flex items-start group">
                  <div className="bg-primary-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-200">
                    {index + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-gray-700 leading-relaxed">{instruction}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Ingredients */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Ingredients</h2>
            </div>

            <ul className="space-y-3">
              {recipe.recipe_ingredients?.map((ingredient, index) => (
                <li key={index} className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-4 flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium">
                    {ingredient.amount} {ingredient.ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 
