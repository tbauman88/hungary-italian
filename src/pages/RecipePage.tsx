import { ClockIcon, HeartIcon, PencilSquareIcon, TrashIcon, UserGroupIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { useAuth } from '../contexts/AuthContext'
import { useDeleteRecipeMutation, useGetRecipeByIdQuery } from '../generated/graphql'
import { getImageUrl, handleImageError } from '../utils'

const ConfirmationModal = ({
  title,
  onClose,
  onConfirm,
  isDeleting,
}: {
  title: string,
  onClose: () => void,
  onConfirm: () => void,
  isDeleting: boolean,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <TrashIcon className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Delete Recipe</h3>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "{title}"? This action cannot be undone.
        </p>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold rounded-xl transition-all duration-200"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export const RecipePage = () => {
  const { id } = useParams<{ id: string }>()
  const { currentUserId } = useAuth()
  const navigate = useNavigate()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const { loading, error, data } = useGetRecipeByIdQuery({
    skip: !id || !currentUserId,
    variables: { id: id || '', userId: currentUserId || '' },
  })

  const [deleteRecipe] = useDeleteRecipeMutation()

  const handleVideoClick = (e: React.MouseEvent, videoUrl: string) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(videoUrl, '_blank', 'noopener,noreferrer')
  }

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true)
  }

  const handleDeleteConfirm = async () => {
    if (!id) return

    setIsDeleting(true)
    try {
      await deleteRecipe({ variables: { id }, refetchQueries: ['GetRecipes'] })
      navigate('/', { replace: true })
    } catch (error) {
      console.error('Failed to delete recipe:', error)
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false)
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600">Error: {error.message}</div>
  if (!data?.recipes_by_pk) return <Navigate to="*" replace />;

  const recipe = data.recipes_by_pk

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Recipe Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative">
            <img
              src={getImageUrl(recipe.image_url ?? '')}
              alt={recipe.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              onError={e => handleImageError(e, recipe.title)}
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
                  <HeartIcon className="w-6 h-6" />
                </button>
                {currentUserId === recipe.owner_id && (
                  <>
                    <Link to={`/recipe/${id}/edit`} className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-primary-600 transition-colors rounded-xl hover:bg-primary-50">
                      <PencilSquareIcon className="w-6 h-6" />
                    </Link>
                    <button onClick={handleDeleteClick} disabled={isDeleting} className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-red-500 transition-colors rounded-xl hover:bg-red-50">
                      <TrashIcon className="w-6 h-6" />
                    </button>
                  </>
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
          {/* Ingredients - Show first on mobile, second on desktop */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 order-1 lg:order-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Ingredients</h2>
            </div>

            <ul className="space-y-3">
              {recipe.recipe_ingredients?.map((ingredient, index) => {
                const isMissing = recipe.missing_ingredients?.some(missing => missing.ingredient.name === ingredient.ingredient.name)

                return (
                  <li key={index} className="flex items-center justify-between p-3 rounded-xl transition-colors duration-200 bg-gray-50 hover:bg-gray-100">
                    <span className="font-medium text-gray-700">
                      {ingredient.amount} <span className="capitalize">{ingredient.ingredient.name}</span>
                    </span>
                    {!isMissing && <CheckBadgeIcon className="w-6 h-6 text-green-500" />}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Instructions - Show second on mobile, first on desktop */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 order-2 lg:order-1">
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
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{instruction}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <ConfirmationModal
          title={recipe.title}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
        />
      )}
    </div>
  )
} 
