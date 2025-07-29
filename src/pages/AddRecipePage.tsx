import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { RecipeForm } from '../components/RecipeForm'
import { useAuth } from '../contexts/AuthContext'
import {
  IngredientsConstraint,
  IngredientsUpdateColumn,
  useAddRecipeMutation,
  type RecipesInsertInput
} from '../generated/graphql'
import { FORM_DEFAULT_VALUES, RecipeResolver, type RecipeFormData } from '../types'
import { getFileName } from '../utils'

export const AddRecipePage = () => {
  const navigate = useNavigate()
  const { currentUserId } = useAuth()
  const [addRecipe] = useAddRecipeMutation()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<RecipeFormData>({
    resolver: RecipeResolver,
    defaultValues: FORM_DEFAULT_VALUES,
    mode: 'all',
    reValidateMode: 'onChange',
  })

  const setIngredients = (ingredients: RecipeFormData['ingredients']) => ({
    data: ingredients.map(ingredient => ({
      amount: ingredient.amount || null,
      ingredient: {
        data: { name: ingredient.name.toLowerCase() },
        on_conflict: {
          constraint: IngredientsConstraint.INGREDIENTS_NAME_KEY,
          update_columns: [IngredientsUpdateColumn.NAME]
        }
      }
    }))
  })

  const handleSubmit = async (data: RecipeFormData, uploadedFile?: File | null): Promise<string | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const recipe: RecipesInsertInput = {
        ...data,
        owner_id: currentUserId,
        image_url: getFileName(uploadedFile, data.title),
        recipe_ingredients: setIngredients(data.ingredients),
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
    <FormProvider {...form}>
      <RecipeForm
        title="Create New Recipe"
        submitText="Create Recipe"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
    </FormProvider>
  )
} 
