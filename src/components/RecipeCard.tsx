import { ClockIcon, HeartIcon, UserGroupIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { type Recipes } from '../generated/graphql'

export const RecipeCard = ({ recipe }: { recipe: Recipes }) => {
  const recipeLink = `/recipe/${recipe.id}`

  const handleVideoClick = (e: React.MouseEvent, videoUrl: string) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(videoUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <article className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg active:shadow-xl transition-all duration-300 border border-gray-100 group">
      <Link to={recipeLink} className="block relative">
        <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
          <img
            src={recipe.image_url ?? ""}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {recipe.video_url && (
          <button
            onClick={(e) => handleVideoClick(e, recipe.video_url!)}
            className="absolute top-3 right-3 bg-black/80 hover:bg-primary-600 text-white px-3 py-2 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-all duration-200 z-10 shadow-lg hover:shadow-xl"
          >
            <VideoCameraIcon className="w-3.5 h-3.5" />
            <span>Video</span>
          </button>
        )}

        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-tertiary-600 px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wide shadow-sm">
            {recipe.type || 'Recipe'}
          </span>
        </div>
      </Link>

      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2.5 py-1 rounded-lg">
            {recipe.complexity}
          </span>
          <button className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50">
            <HeartIcon className="w-5 h-5" />
          </button>
        </div>

        <Link to={recipeLink}>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight hover:text-primary-600 transition-colors group-hover:text-primary-600">
            {recipe.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm sm:text-base mb-5 line-clamp-2 leading-relaxed">
          {recipe.notes || 'A delicious fusion recipe combining Hungarian and Italian flavors.'}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="bg-gray-100 p-1.5 rounded-lg">
              <ClockIcon className="w-4 h-4 flex-shrink-0" />
            </div>
            <span className="text-sm font-medium">{recipe.cooking_time || '30 min'}</span>
          </div>

          {recipe.portion_size && (
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="bg-gray-100 p-1.5 rounded-lg">
                <UserGroupIcon className="w-4 h-4 flex-shrink-0" />
              </div>
              <span className="text-sm font-medium">{recipe.portion_size}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  )
} 
