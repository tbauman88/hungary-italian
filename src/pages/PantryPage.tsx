import { MagnifyingGlassIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  useAddUserIngredientMutation,
  useGetAllIngredientsQuery,
  useGetUserIngredientsQuery,
  useRemoveUserIngredientMutation
} from '../generated/graphql'

enum IngredientMode {
  SELECT_EXISTING,
  CREATE_NEW
}

const OPTIONS: { label: string, value: IngredientMode }[] = [
  { label: 'Select Existing', value: IngredientMode.SELECT_EXISTING },
  { label: 'Create New', value: IngredientMode.CREATE_NEW }
]

export const PantryPage = () => {
  const { currentUserId } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [ingredientMode, setIngredientMode] = useState(IngredientMode.SELECT_EXISTING)
  const [newIngredientName, setNewIngredientName] = useState('')
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set())

  useEffect(() => {
    document.body.style.overflow = showAddModal ? 'hidden' : 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showAddModal])

  const {
    data: userIngredients,
    loading: loadingUserIngredients,
    refetch: refetchUserIngredients
  } = useGetUserIngredientsQuery({
    variables: { user_id: currentUserId! },
    skip: !currentUserId
  })

  const { data: allIngredients, loading: loadingAllIngredients, refetch: refetchAllIngredients } = useGetAllIngredientsQuery()

  const [addIngredient, { loading: addingIngredient }] = useAddUserIngredientMutation()
  const [removeIngredient, { loading: removingIngredient }] = useRemoveUserIngredientMutation()

  const filteredIngredients = allIngredients?.ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !userIngredients?.user_ingredients.some(userIngredient =>
      userIngredient.ingredient.id === ingredient.id
    )
  ) || []

  const handleAddIngredient = async (mode: IngredientMode) => {
    if (!currentUserId) return

    if (mode === IngredientMode.CREATE_NEW) {
      const ingredientName = newIngredientName.trim()
      if (!ingredientName) return

      try {
        await addIngredient({
          variables: {
            user_id: currentUserId,
            ingredient_name: ingredientName.toLowerCase(),
          }
        })

        setNewIngredientName('')
        refetchData()
      } catch (error) {
        console.error('Error adding ingredient:', error)
      }
    }

    if (mode === IngredientMode.SELECT_EXISTING) {
      if (selectedIngredients.size === 0) return

      try {
        const addPromises = Array.from(selectedIngredients).map(ingredientName =>
          addIngredient({
            variables: {
              user_id: currentUserId,
              ingredient_name: ingredientName.toLowerCase(),
            }
          })
        )

        await Promise.all(addPromises)

        setSelectedIngredients(new Set())
        refetchData()
      } catch (error) {
        console.error('Error adding ingredients:', error)
      }
    }
  }

  const refetchData = () => {
    setIngredientMode(IngredientMode.SELECT_EXISTING)
    setShowAddModal(false)
    refetchUserIngredients()
    refetchAllIngredients()
  }

  const handleRemoveIngredient = async (ingredientId: string) => {
    try {
      await removeIngredient({ variables: { id: ingredientId } })
      refetchUserIngredients()
    } catch (error) {
      console.error('Error removing ingredient:', error)
    }
  }

  const resetModal = () => {
    setSearchTerm('')
    setNewIngredientName('')
    setIngredientMode(IngredientMode.SELECT_EXISTING)
    setSelectedIngredients(new Set())
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

  return (
    <div className="min-h-screen">
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">My Pantry</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-medium transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      <div className="py-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Current Ingredients ({userIngredients?.user_ingredients.length || 0})
            </h2>
          </div>

          {loadingUserIngredients && (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your pantry...</p>
            </div>
          )}

          {!loadingUserIngredients && userIngredients?.user_ingredients?.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your pantry is empty</h3>
              <p className="text-gray-600 mb-4">Add ingredients to get started with recipe planning!</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Add Your First Ingredient
              </button>
            </div>
          )}

          {!loadingUserIngredients && userIngredients?.user_ingredients.length !== 0 && (
            <div className="divide-y divide-gray-100">
              {userIngredients?.user_ingredients.map((userIngredient) => (
                <div key={userIngredient.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 capitalize">{userIngredient.ingredient.name}</h3>
                  </div>
                  <button
                    onClick={() => handleRemoveIngredient(userIngredient.id)}
                    disabled={removingIngredient}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
          <div className="bg-white sm:rounded-2xl w-full h-full sm:h-auto sm:max-w-md sm:max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Add Ingredient</h2>
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    resetModal()
                  }}
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
                onClick={() => handleAddIngredient(ingredientMode)}
                disabled={
                  (ingredientMode === IngredientMode.SELECT_EXISTING && selectedIngredients.size === 0) ||
                  (ingredientMode === IngredientMode.CREATE_NEW && !newIngredientName.trim()) ||
                  addingIngredient
                }
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white py-3 rounded-xl font-medium transition-colors disabled:cursor-not-allowed mt-auto"
              >
                {addingIngredient ? 'Adding...' : 'Add to Pantry'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
