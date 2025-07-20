import { XMarkIcon } from '@heroicons/react/24/outline'
import type { Ingredients, UserIngredients } from '../generated/graphql'

type UserIngredient = Pick<UserIngredients, 'id'> & {
  ingredient: Pick<Ingredients, 'name'>
}

export const PantryList = ({
  userIngredients,
  loading,
  onRemoveIngredient,
  removingIngredient,
  onAddFirstIngredient
}: {
  userIngredients: UserIngredient[]
  loading: boolean
  onRemoveIngredient: (id: string) => void
  removingIngredient: boolean
  onAddFirstIngredient: () => void
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Current Ingredients
          </h2>
        </div>
        <div className="p-8 text-center">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your pantry...</p>
        </div>
      </div>
    )
  }

  if (userIngredients.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Current Ingredients
          </h2>
        </div>
        <div className="p-8 text-center">
          <div className="text-4xl mb-4">🛒</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your pantry is empty</h3>
          <p className="text-gray-600 mb-4">Add ingredients to get started with recipe planning!</p>
          <button
            onClick={onAddFirstIngredient}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Add Your First Ingredient
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">
          Current Ingredients ({userIngredients.length})
        </h2>
      </div>
      <div className="divide-y divide-gray-100">
        {userIngredients.map((userIngredient) => (
          <div key={userIngredient.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 capitalize">{userIngredient.ingredient.name}</h3>
            </div>
            <button
              onClick={() => onRemoveIngredient(userIngredient.id)}
              disabled={removingIngredient}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:opacity-50"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
} 
