import { ArchiveBoxIcon, CheckIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import type { Ingredients, UserIngredients } from '../generated/graphql'

type UserIngredient = Pick<UserIngredients, 'id'> & {
  ingredient: Pick<Ingredients, 'name'>
}

const PantryListHeader = ({ title = "Current Ingredients", subtitle, children }: { title?: string, subtitle?: string, children?: React.ReactNode }) => (
  <div className="p-6 border-b border-gray-100">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
          <ArchiveBoxIcon className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  </div>
)

export const PantryList = ({
  userIngredients,
  loading,
  onRemoveIngredient,
  removingIngredient,
}: {
  userIngredients: UserIngredient[]
  loading: boolean
  onRemoveIngredient: (id: string) => void
  removingIngredient: boolean
}) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedItems(newSelected)
  }

  const handleBulkRemove = () => {
    selectedItems.forEach(id => onRemoveIngredient(id))
    setSelectedItems(new Set())
  }

  const clearSelection = () => {
    setSelectedItems(new Set())
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <PantryListHeader title="Current Ingredients" subtitle="Your pantry items" />
        <div className="p-12 text-center">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your pantry...</p>
        </div>
      </div>
    )
  }

  if (userIngredients.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <PantryListHeader title="Current Ingredients" subtitle="Your pantry items" />
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SparklesIcon className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your pantry is ready for ingredients!</h3>
          <p className="text-gray-600 mb-6 max-w-sm mx-auto text-balance">Start building your pantry by adding ingredients. This will help you discover recipes and plan meals.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <PantryListHeader
        subtitle={`${userIngredients.length} item${userIngredients.length !== 1 ? 's' : ''} in your pantry`}
      >
        {selectedItems.size > 0 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleBulkRemove}
              disabled={removingIngredient}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              Remove {selectedItems.size} items
            </button>
            <button
              onClick={clearSelection}
              className="text-gray-500 hover:text-gray-700 px-2 py-1.5 rounded-lg text-sm font-medium transition-colors"
            >
              Clear
            </button>
          </div>

        )}
      </PantryListHeader>

      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {userIngredients.map((userIngredient) => {
            const isSelected = selectedItems.has(userIngredient.id)
            return (
              <div
                key={userIngredient.id}
                className={`group relative bg-gradient-to-br from-gray-50 to-white border rounded-xl p-4 transition-all duration-200 cursor-pointer ${isSelected
                  ? 'border-primary-500 bg-primary-50 shadow-sm'
                  : 'border-gray-200 hover:border-primary-300'
                  }`}
                onClick={() => toggleSelection(userIngredient.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900 capitalize truncate flex-1">
                        {userIngredient.ingredient.name}
                      </h3>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${isSelected
                        ? 'bg-primary-500 border-primary-500'
                        : 'border-gray-300 hover:border-primary-400'
                        }`}>
                        {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 
