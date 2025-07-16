import { ClockIcon, UserGroupIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
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
    <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md active:shadow-lg transition-all duration-200 border border-gray-100">
      <Link to={recipeLink} className="block relative group">
        <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
          <img
            src={recipe.image_url ?? ""}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {recipe.video_url && (
          <button
            onClick={(e) => handleVideoClick(e, recipe.video_url!)}
            className="absolute top-3 right-3 bg-black/70 hover:bg-black/80 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 transition-colors z-10"
          >
            <VideoCameraIcon className="w-3 h-3" />
            <span>Video</span>
          </button>
        )}
      </Link>

      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs sm:text-sm text-primary-600 font-semibold uppercase tracking-wide">
            {recipe.type || 'Recipe'}
          </span>
          <span className="text-xs text-gray-500 capitalize">
            {recipe.complexity}
          </span>
        </div>

        <Link to={recipeLink}>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight hover:text-primary-600 transition-colors">
            {recipe.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2 leading-relaxed">
          {recipe.notes || 'A delicious fusion recipe combining Hungarian and Italian flavors.'}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-1 text-gray-500">
            <ClockIcon className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">{recipe.cooking_time || '30 min'}</span>
          </div>

          {recipe.portion_size && (
            <div className="flex items-center space-x-1 text-gray-500">
              <UserGroupIcon className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">{recipe.portion_size}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  )
} 
