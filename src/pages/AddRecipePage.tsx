import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { RecipeForm } from '../components/RecipeForm'
import { useAuth } from '../contexts/AuthContext'
import {
  IngredientsConstraint,
  IngredientsUpdateColumn,
  useAddRecipeMutation,
  type RecipesInsertInput
} from '../generated/graphql'
import { RecipeSchema } from '../types'

type RecipeFormData = z.infer<typeof RecipeSchema>

export const AddRecipePage = () => {
  const navigate = useNavigate()
  const { currentUserId } = useAuth()
  const [addRecipe] = useAddRecipeMutation()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (data: RecipeFormData, uploadedFile?: File | null): Promise<string | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const { ingredients, steps, ...recipeData } = data

      const recipe: RecipesInsertInput = {
        ...recipeData,
        image_url: uploadedFile?.name ?? null,
        owner_id: currentUserId,
        cooking_time: data.cooking_time ? String(data.cooking_time) : null,
        portion_size: String(data.portion_size),
        recipe_ingredients: {
          data: ingredients.map(ingredient => ({
            ingredient: {
              data: { name: ingredient.name },
              on_conflict: {
                constraint: IngredientsConstraint.INGREDIENTS_NAME_KEY,
                update_columns: [IngredientsUpdateColumn.NAME]
              }
            }
          }))
        },
        steps: steps.map(step => step.description)
      }

      const result = await addRecipe({ variables: { recipe } })

      if (result.data?.insert_recipes_one?.id) {
        navigate(`/recipe/${result.data.insert_recipes_one.id}`)
        return null // Success
      } else {
        return 'Failed to create recipe. Please try again.'
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      setError(errorMessage)
      return errorMessage
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <RecipeForm
      mode="add"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  )
} 
