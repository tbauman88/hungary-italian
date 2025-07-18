import { ClockIcon, ShoppingBagIcon, UserGroupIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { type Recipes } from '../generated/graphql';

type ProgressStatus = 'complete' | 'almost' | 'mostly' | 'missing';

interface ProgressData {
  percentage: number;
  color: string;
  text: string;
  status: ProgressStatus;
}

const PROGRESS_CONFIG: Record<ProgressStatus, Omit<ProgressData, 'percentage' | 'status'>> = {
  complete: { color: 'bg-secondary-500', text: 'All ingredients available' },
  almost: { color: 'bg-tertiary-500', text: 'Almost ready to cook!' },
  mostly: { color: 'bg-quaternary-500', text: 'Most ingredients available' },
  missing: { color: 'bg-quinary-500', text: 'Need to shop for ingredients' }
};

const getProgressStatus = (percentage: number, hasMissingIngredients: boolean): ProgressStatus => {
  if (!hasMissingIngredients) return 'complete';
  if (percentage >= 80) return 'almost';
  if (percentage >= 60) return 'mostly';
  return 'missing';
};

export const RecipeCard = ({ recipe }: { recipe: Recipes }) => {
  const recipeLink = `/recipe/${recipe.id}`

  const handleVideoClick = (e: React.MouseEvent, videoUrl: string) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(videoUrl, '_blank', 'noopener,noreferrer')
  }

  const missingIngredientsCount = recipe.recipe_ingredients.length - (recipe.missing_ingredients_count ?? 0);
  const hasMissingIngredients = Boolean(recipe.missing_ingredients_count && recipe.missing_ingredients_count > 0);
  const ingredientCount = recipe.recipe_ingredients.length;
  const availablePercentage = hasMissingIngredients ? (missingIngredientsCount / ingredientCount) * 100 : 100;

  const status = getProgressStatus(availablePercentage, hasMissingIngredients);
  const progress: ProgressData = {
    percentage: Math.round(availablePercentage),
    status,
    ...PROGRESS_CONFIG[status]
  };

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
        <Link to={recipeLink}>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight hover:text-primary-600 transition-colors group-hover:text-primary-600">
            {recipe.title}
          </h3>
        </Link>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <ShoppingBagIcon className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {hasMissingIngredients ? (
                  <>
                    <span className="font-semibold">{missingIngredientsCount}</span>
                    <span className="text-gray-500">/</span>
                    <span>{ingredientCount}</span>
                  </>
                ) : (
                  <span className="font-semibold">{ingredientCount}</span>
                )}
                <span className="text-gray-500 ml-1">ingredients</span>
              </span>
            </div>
            <span className="text-xs font-medium text-gray-500">
              {progress.percentage}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ease-out ${progress.color}`}
              style={{ width: `${availablePercentage}%` }}
            />
          </div>

          <p className="text-xs text-gray-600 font-medium">
            {progress.text}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-1.5 bg-gray-100 px-2.5 py-1.5 rounded-lg">
            <ClockIcon className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
            <span className="text-xs font-medium text-gray-700">{recipe.cooking_time || '30 min'}</span>
          </div>

          {recipe.portion_size && (
            <div className="flex items-center space-x-1.5 bg-gray-100 px-2.5 py-1.5 rounded-lg">
              <UserGroupIcon className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-700">{recipe.portion_size}</span>
            </div>
          )}

          <div className="flex items-center space-x-1.5 bg-gray-100 px-2.5 py-1.5 rounded-lg">
            <span className="text-xs font-medium text-gray-700 capitalize">{recipe.complexity}</span>
          </div>
        </div>
      </div>
    </article>
  )
} 
