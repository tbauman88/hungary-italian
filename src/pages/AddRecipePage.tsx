import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddRecipeMutationVariables, useAddRecipeMutation } from '../generated/graphql'

export function AddRecipePage() {
  const navigate = useNavigate()
  const [addRecipe, { loading }] = useAddRecipeMutation()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prep_time: 0,
    cook_time: 0,
    servings: 4,
    image_url: '',
    cuisine_type: 'Hungarian-Italian',
    difficulty_level: 'medium',
    ingredients: [''],
    instructions: [''],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const variables: AddRecipeMutationVariables = {
        recipe: {
          ...formData,
          recipe_ingredients: {
            data: formData.ingredients
              .filter(i => i.trim())
              .map(i => ({ ingredient: { data: { name: i } } })),
          },
          steps: formData.instructions.filter(i => i.trim()),
        },
      }

      const result = await addRecipe({ variables })

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
      ingredients: [...prev.ingredients, '']
    }))
  }

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }))
  }

  const updateIngredient = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((item, i) => i === index ? value : item)
    }))
  }

  const updateInstruction = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.map((item, i) => i === index ? value : item)
    }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Recipe</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipe Title
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prep Time (min)
            </label>
            <input
              type="number"
              value={formData.prep_time}
              onChange={(e) => setFormData(prev => ({ ...prev, prep_time: parseInt(e.target.value) || 0 }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cook Time (min)
            </label>
            <input
              type="number"
              value={formData.cook_time}
              onChange={(e) => setFormData(prev => ({ ...prev, cook_time: parseInt(e.target.value) || 0 }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Servings
            </label>
            <input
              type="number"
              value={formData.servings}
              onChange={(e) => setFormData(prev => ({ ...prev, servings: parseInt(e.target.value) || 1 }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ingredients
          </label>
          {formData.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => updateIngredient(index, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="text-primary-600 hover:text-primary-700 text-sm"
          >
            + Add Ingredient
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instructions
          </label>
          {formData.instructions.map((instruction, index) => (
            <textarea
              key={index}
              value={instruction}
              onChange={(e) => updateInstruction(index, e.target.value)}
              placeholder={`Step ${index + 1}`}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addInstruction}
            className="text-primary-600 hover:text-primary-700 text-sm"
          >
            + Add Step
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50"
        >
          {loading ? 'Adding Recipe...' : 'Add Recipe'}
        </button>
      </form>
    </div>
  )
} 
