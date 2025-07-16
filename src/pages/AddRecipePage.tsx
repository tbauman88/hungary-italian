import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddRecipeMutation, type RecipesInsertInput } from '../generated/graphql'
import { RecipeComplexity, RecipeTag, RecipeType } from '../types'

export function AddRecipePage() {
  const navigate = useNavigate()
  const [addRecipe, { loading }] = useAddRecipeMutation()

  const [formData, setFormData] = useState<RecipesInsertInput>({
    title: null,
    notes: null,
    cooking_time: null,
    complexity: null,
    portion_size: '1',
    image_url: null,
    video_url: null,
    recipe_ingredients: {
      data: [],
    },
    steps: [],
    tags: [],
    type: null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const recipe: RecipesInsertInput = {
        ...formData,
        recipe_ingredients: {
          data: formData.recipe_ingredients?.data.map(({ ingredient }) => ({ ingredient: { data: { name: ingredient?.data?.name ?? '' } } })) || [],
        },
        steps: formData.steps?.filter(i => i.trim()),
      }

      const result = await addRecipe({ variables: { recipe } })

      if (result.data?.insert_recipes_one?.id) {
        navigate(`/recipe/${result.data.insert_recipes_one.id}`)
      }
    } catch (error) {
      console.error('Error adding recipe:', error)
    }
  }

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      recipe_ingredients: {
        data: [
          ...(prev.recipe_ingredients?.data || []),
          { ingredient: { data: { name: '' } } }
        ]
      }
    }))
  }

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...(prev.steps || []), '']
    }))
  }

  const updateIngredient = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      recipe_ingredients: {
        data: prev.recipe_ingredients?.data.map((item, i) => i === index ? { ingredient: { data: { name: value } } } : item) || []
      }
    }))
  }

  const updateInstruction = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps?.map((item, i) => i === index ? value : item)
    }))
  }

  return (
    <div className="sm:max-w-2xl sm:mx-auto sm:px-4 lg:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 px-4 sm:px-0">Create New Recipe</h1>

      <form onSubmit={handleSubmit} className="bg-white sm:rounded-lg sm:shadow-md p-4 sm:p-6 space-y-6 min-h-screen sm:min-h-0">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Recipe Title *
          </label>
          <input
            type="text"
            required
            value={formData.title ?? ''}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter recipe title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Type
          </label>
          <div className="relative">
            <select
              value={formData.type ?? ''}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as unknown }))}
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white appearance-none pr-10"
            >
              <option value="">Select recipe type</option>
              {Object.values(RecipeType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Complexity
          </label>
          <div className="relative">
            <select
              value={formData.complexity ?? ''}
              onChange={(e) => setFormData(prev => ({ ...prev, complexity: e.target.value as unknown }))}
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white appearance-none pr-10"
            >
              <option value="">Select complexity</option>
              {Object.values(RecipeComplexity).map(complexity => (
                <option key={complexity} value={complexity}>{complexity}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Cooking Time (minutes)
            </label>
            <input
              type="number"
              value={formData.cooking_time ?? ''}
              onChange={(e) => setFormData(prev => ({ ...prev, cooking_time: e.target.value }))}
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Portion Size
            </label>
            <input
              type="number"
              value={formData.portion_size ?? ''}
              onChange={(e) => setFormData(prev => ({ ...prev, portion_size: e.target.value }))}
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="4"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Ingredients
          </label>
          <div className="space-y-3">
            {formData.recipe_ingredients?.data.map(({ ingredient }, index) => (
              <input
                key={index}
                type="text"
                value={ingredient?.data?.name ?? ''}
                onChange={(e) => updateIngredient(index, e.target.value)}
                placeholder={`Ingredient ${index + 1}`}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="w-full py-3 px-4 text-primary-600 hover:text-primary-700 hover:bg-primary-50 text-base font-medium rounded-lg border-2 border-dashed border-primary-300 hover:border-primary-400 transition-colors"
            >
              + Add Ingredient
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Steps
          </label>
          <div className="space-y-3">
            {formData.steps?.map((step, index) => (
              <textarea
                key={index}
                value={step}
                onChange={(e) => updateInstruction(index, e.target.value)}
                placeholder={`Step ${index + 1}: Describe what to do...`}
                rows={3}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
            ))}
            <button
              type="button"
              onClick={addInstruction}
              className="w-full py-3 px-4 text-primary-600 hover:text-primary-700 hover:bg-primary-50 text-base font-medium rounded-lg border-2 border-dashed border-primary-300 hover:border-primary-400 transition-colors"
            >
              + Add Step
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tags (optional)
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.values(RecipeTag).map((tag) => {
              const isSelected = formData.tags?.includes(tag as any) || false
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      tags: isSelected
                        ? prev.tags?.filter(t => t !== tag) || []
                        : [...(prev.tags || []), tag as any]
                    }))
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isSelected
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Notes (optional)
          </label>
          <textarea
            rows={4}
            value={formData.notes ?? ''}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            placeholder="Add any notes about this recipe..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold text-lg rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          {loading ? 'Adding Recipe...' : 'Add Recipe'}
        </button>
      </form>
    </div>
  )
} 
