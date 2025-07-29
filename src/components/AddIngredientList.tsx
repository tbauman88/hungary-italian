import { CheckIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useMemo, useState } from 'react'
import type { Ingredients } from '../generated/graphql'

type Ingredient = Pick<Ingredients, 'id' | 'name'>

interface AddIngredientListProps {
  onAddIngredient: (ingredientNames?: string[]) => void
  allIngredients: Ingredient[]
  loadingAllIngredients: boolean
  addingIngredient: boolean
  userIngredients: Ingredient[]
}

export const AddIngredientList = ({
  onAddIngredient,
  allIngredients,
  loadingAllIngredients,
  addingIngredient,
  userIngredients
}: AddIngredientListProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set())

  const toggleIngredientSelection = (ingredientName: string) => {
    const newSelected = new Set(selectedIngredients)
    if (newSelected.has(ingredientName)) {
      newSelected.delete(ingredientName)
    } else {
      newSelected.add(ingredientName)
    }
    setSelectedIngredients(newSelected)
  }

  const handleAddIngredient = () => {
    onAddIngredient(Array.from(selectedIngredients))
    setSelectedIngredients(new Set())
  }

  const filteredIngredients = allIngredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !userIngredients.some(userIngredient => userIngredient.name.toLowerCase() === ingredient.name.toLowerCase())
  )

  const isDisabled = useMemo(() => selectedIngredients.size === 0 || addingIngredient, [selectedIngredients, addingIngredient])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
            <PlusIcon className="w-5 h-5 text-primary-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">Add Ingredients</h2>
            <p className="text-sm text-gray-500">Search and select ingredients to add to your pantry</p>
          </div>
          <div className="flex items-center space-x-2">
            {selectedIngredients.size > 0 && (
              <div className="bg-primary-100 text-primary-700 text-xs font-medium px-2 py-1 rounded-full">
                {selectedIngredients.size} selected
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
            autoFocus
          />
        </div>

        {loadingAllIngredients ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading ingredients...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Ingredient Tags */}
            {filteredIngredients.length > 0 && (
              <div>
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Available Ingredients ({filteredIngredients.length})
                  </h3>
                  <p className="text-xs text-gray-500">Click to select ingredients</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filteredIngredients.map((ingredient) => {
                    const isSelected = selectedIngredients.has(ingredient.name)
                    return (
                      <button
                        key={ingredient.id}
                        onClick={() => toggleIngredientSelection(ingredient.name)}
                        className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full border transition-all duration-200 ${isSelected
                          ? 'bg-primary-500 border-primary-500 text-white shadow-sm'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-primary-300 hover:bg-primary-50'
                          }`}
                      >
                        <span className="text-sm font-medium capitalize">{ingredient.name}</span>
                        {isSelected && (
                          <CheckIcon className="w-4 h-4" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredIngredients.length === 0 && searchTerm && (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-600 font-medium">No ingredients found</p>
                <p className="text-sm text-gray-500 mt-1">Try a different search term</p>
              </div>
            )}

            {/* Empty State */}
            {filteredIngredients.length === 0 && !searchTerm && (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-600 font-medium">Start typing to search ingredients</p>
              </div>
            )}
          </div>
        )}

        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={handleAddIngredient}
            disabled={isDisabled}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white py-4 px-6 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
          >
            {addingIngredient ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding...</span>
              </div>
            ) : (
              `Add to Pantry${selectedIngredients.size > 0 ? ` (${selectedIngredients.size})` : ''}`
            )}
          </button>
        </div>
      </div>
    </div>
  )
} 
