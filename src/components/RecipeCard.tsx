import { ClockIcon, UserGroupIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { Recipes } from '../generated/graphql'

interface RecipeCardProps {
  recipe: Recipes
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const recipeLink = `/recipe/${recipe.id}`

  return (
    <article className="recipe-card">
      <Link to={recipeLink}>
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={recipe.image_url || 'https://cdn.loveandlemons.com/wp-content/uploads/2023/05/bbq-sauce.jpg'}
            alt={recipe.title}
            className="w-full h-48 object-cover"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <span className="text-sm text-primary-600 font-medium uppercase">
              {recipe.type}

            </span>
            <span className="text-sm text-gray-500 capitalize">
              Medium {/* Easy {recipe.difficulty_level} */}
            </span>
          </div>

          {recipe.video_url && (
            <Link to={recipe.video_url} target="_blank">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Watch video</span>
                <VideoCameraIcon className="w-4 h-4" />
              </div>
            </Link>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {recipe.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {recipe.notes}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <ClockIcon className="w-4 h-4" />
            <span>{recipe.cooking_time}</span>
          </div>

          {recipe.portion_size && (
            <div className="flex items-center space-x-1">
              <UserGroupIcon className="w-4 h-4" />
              <span>{recipe.portion_size} servings</span>
            </div>
          )}
        </div>
      </div>
    </article>

  )
} 
