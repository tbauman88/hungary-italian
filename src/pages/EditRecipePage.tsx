import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { RecipeForm } from '../components/RecipeForm'
import { useAuth } from '../contexts/AuthContext'
import {
  useGetRecipeByIdQuery,
  useUpdateRecipeMutation,
  type RecipesSetInput
} from '../generated/graphql'
import { RecipeSchema } from '../types'

type RecipeFormData = z.infer<typeof RecipeSchema>

export const EditRecipePage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentUserId } = useAuth()

  const { loading: loadingRecipe, error: recipeError, data } = useGetRecipeByIdQuery({
    variables: { id: id || '' },
    skip: !id
  })

  const [updateRecipe] = useUpdateRecipeMutation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const recipe = data?.recipes_by_pk

  useEffect(() => {
    if (recipe && currentUserId && recipe.owner_id !== currentUserId) {
      navigate('/', { replace: true })
    }
  }, [recipe, currentUserId, navigate])

  const handleSubmit = async (data: RecipeFormData, uploadedFile?: File | null): Promise<string | null> => {
    if (!id || !currentUserId) {
      return 'Missing recipe ID or user authentication'
    }

    setIsLoading(true)
    setError(null)

    try {
      const { ingredients, steps, ...recipeData } = data

      const recipeUpdate: RecipesSetInput = {
        ...recipeData,
        image_url: uploadedFile?.name ?? null,
        cooking_time: data.cooking_time ? String(data.cooking_time) : null,
        portion_size: String(data.portion_size),
        steps: steps.map(step => step.description)
      }

      const result = await updateRecipe({
        variables: {
          id,
          recipe: recipeUpdate
        }
      })

      if (result.data?.update_recipes_by_pk?.id) {
        navigate(`/recipe/${result.data.update_recipes_by_pk.id}`)
        return null
      } else {
        return 'Failed to update recipe. You may not have permission to edit this recipe.'
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      setError(errorMessage)
      return errorMessage
    } finally {
      setIsLoading(false)
    }
  }

  if (loadingRecipe) return <LoadingSpinner />
  if (recipeError) return <div className="text-red-600">Error: {recipeError.message}</div>
  if (!recipe) return <div>Recipe not found</div>

  if (recipe.owner_id !== currentUserId) {
    return <div>You don't have permission to edit this recipe</div>
  }

  return (
    <RecipeForm
      mode="edit"
      recipe={recipe}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  )
} 
