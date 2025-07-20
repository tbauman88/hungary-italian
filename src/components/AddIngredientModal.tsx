import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useMemo, useState } from 'react'
import type { Ingredients } from '../generated/graphql'

enum IngredientMode {
  SELECT_EXISTING,
  CREATE_NEW
}

const OPTIONS: { label: string, value: IngredientMode }[] = [
  { label: 'Select Existing', value: IngredientMode.SELECT_EXISTING },
  { label: 'Create New', value: IngredientMode.CREATE_NEW }
]

type Ingredient = Pick<Ingredients, 'id' | 'name'>

interface AddIngredientModalProps {
  isOpen: boolean
  onClose: () => void
  onAddIngredient: (ingredientNames?: string[]) => void
  allIngredients: Ingredient[]
  loadingAllIngredients: boolean
  addingIngredient: boolean
  userIngredients: Ingredient[]
}

export const AddIngredientModal = ({
  isOpen,
  onClose,
  onAddIngredient,
  allIngredients,
  loadingAllIngredients,
  addingIngredient,
  userIngredients
}: AddIngredientModalProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [ingredientMode, setIngredientMode] = useState(IngredientMode.SELECT_EXISTING)
  const [newIngredientName, setNewIngredientName] = useState('')
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set())

  const resetModal = () => {
    setSearchTerm('')
    setNewIngredientName('')
    setIngredientMode(IngredientMode.SELECT_EXISTING)
    setSelectedIngredients(new Set())
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

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
    if (ingredientMode === IngredientMode.CREATE_NEW) {
      onAddIngredient([newIngredientName.trim()])
      setNewIngredientName('')
    } else {
      onAddIngredient(Array.from(selectedIngredients))
      setSelectedIngredients(new Set())
    }
  }

  const filteredIngredients = allIngredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !userIngredients.some(userIngredient => userIngredient.id === ingredient.id)
  )

  const isDisabled = useMemo(() => {
    return (ingredientMode === IngredientMode.SELECT_EXISTING && selectedIngredients.size === 0) ||
      (ingredientMode === IngredientMode.CREATE_NEW && !newIngredientName.trim()) ||
      addingIngredient
  }, [ingredientMode, selectedIngredients, newIngredientName])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white sm:rounded-2xl w-full h-full sm:h-auto sm:max-w-md sm:max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Add Ingredient</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4 flex-1 flex flex-col h-full sm:h-auto">
          <div className="flex bg-gray-100 rounded-xl p-1">
            {OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setIngredientMode(option.value)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${ingredientMode === option.value
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {ingredientMode === IngredientMode.SELECT_EXISTING && (
            <>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 min-h-0 sm:max-h-96">
                {loadingAllIngredients ? (
                  <div className="text-center py-8">
                    <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading ingredients...</p>
                  </div>
                ) : filteredIngredients.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">
                      {searchTerm ? 'No ingredients found' : 'No ingredients available'}
                    </p>
                  </div>
                ) : (
                  filteredIngredients.map((ingredient) => (
                    <button
                      key={ingredient.id}
                      onClick={() => toggleIngredientSelection(ingredient.name)}
                      className={`w-full text-left p-3 rounded-xl border transition-colors ${selectedIngredients.has(ingredient.name)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      <span className="capitalize">{ingredient.name}</span>
                    </button>
                  ))
                )}
              </div>
            </>
          )}

          {ingredientMode === IngredientMode.CREATE_NEW && (
            <div className="flex-1 flex flex-col">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ingredient Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Fresh Basil, Organic Quinoa, Aged Parmesan"
                  value={newIngredientName}
                  onChange={(e) => setNewIngredientName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          <button
            onClick={handleAddIngredient}
            disabled={isDisabled}
            className="fixed bottom-0 left-0 right-0 sm:relative sm:rounded-xl w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white py-3 font-medium transition-colors disabled:cursor-not-allowed"
          >
            {addingIngredient ? 'Adding...' : 'Add to Pantry'}
          </button>
        </div>
      </div>
    </div>
  )
} 
