import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { RecipeForm } from '../components/RecipeForm'
import { useAuth } from '../contexts/AuthContext'
import {
  IngredientsConstraint,
  IngredientsUpdateColumn,
  useGetRecipeByIdQuery,
  useUpdateRecipeIngredientsMutation,
  useUpdateRecipeMutation,
  type RecipesSetInput,
  type UpdateRecipeIngredientsMutationVariables
} from '../generated/graphql'
import { FORM_DEFAULT_VALUES, RecipeResolver, type RecipeFormData } from '../types'
import { getFileName } from '../utils'

const filterDirtyFields = <T extends object>(
  dirtyFields: Partial<Record<keyof T, unknown>>,
  data: T
): Partial<T> => Object.entries(dirtyFields).reduce((acc, [key]) => {
  acc[key as keyof T] = data[key as keyof T]
  return acc
}, {} as Partial<T>)

export const EditRecipePage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentUserId } = useAuth()
  const [defaultIngredients, setDefaultIngredients] = useState<{
    ingredientId: string
    name: string
    amount: string | null
  }[]>([])

  const [updateRecipe] = useUpdateRecipeMutation()
  const [updateRecipeIngredients] = useUpdateRecipeIngredientsMutation()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    loading: loadingRecipe,
    error: recipeError,
    data
  } = useGetRecipeByIdQuery({
    variables: { id: id || '' },
    skip: !id
  })

  const recipe = data?.recipes_by_pk

  const form = useForm<RecipeFormData>({
    resolver: RecipeResolver,
    defaultValues: FORM_DEFAULT_VALUES,
    mode: 'all',
    reValidateMode: 'onChange',
  })

  const ingredients = useWatch({ control: form.control, name: 'ingredients' })

  const changedIngredients = useMemo(() => ingredients?.filter((curr, i) => {
    const original = defaultIngredients[i]
    return curr.name !== original?.name || curr.amount !== original?.amount
  }) || [], [ingredients, defaultIngredients])

  useEffect(() => {
    if (recipe && currentUserId && recipe.owner_id !== currentUserId) {
      navigate('/', { replace: true })
    }
  }, [recipe, currentUserId, navigate])

  useEffect(() => {
    if (recipe) {
      setDefaultIngredients(recipe.recipe_ingredients?.map(ri => ({
        ingredientId: ri.ingredient.id,
        name: ri.ingredient.name,
        amount: ri.amount || null,
      })) || [])

      form.reset({
        title: recipe.title,
        notes: recipe.notes || undefined,
        cooking_time: recipe.cooking_time || undefined,
        complexity: recipe.complexity || undefined,
        portion_size: recipe.portion_size || undefined,
        image_url: recipe.image_url || '',
        video_url: recipe.video_url || '',
        ingredients: recipe.recipe_ingredients?.map(ri => ({
          ingredientId: ri.ingredient.id || '',
          name: ri.ingredient.name || '',
          amount: ri.amount || '',
        })) || [{ ingredientId: '', name: '', amount: '' }],
        steps: recipe.steps || [],
        tags: recipe.tags || [],
        type: recipe.type || undefined,
      })
    }
  }, [recipe, form])

  const handleUpdateIngredients = async (recipeId: string): Promise<void> => {
    if (changedIngredients.length === 0) return Promise.resolve();

    const updateIngredients: UpdateRecipeIngredientsMutationVariables = {
      recipeId,
      oldIngredients: changedIngredients.map(i => i.ingredientId || ''),
      newIngredients: changedIngredients.map(ingredient => ({
        recipe_id: recipeId,
        amount: ingredient.amount || null,
        ingredient: {
          data: { name: ingredient.name.toLowerCase().trim() },
          on_conflict: {
            constraint: IngredientsConstraint.INGREDIENTS_NAME_KEY,
            update_columns: [IngredientsUpdateColumn.NAME]
          }
        }
      })),
    }

    await updateRecipeIngredients({ variables: updateIngredients })
  }

  const handleUpdateRecipe = async (recipeId: string, data: RecipeFormData, uploadedFile?: File | null): Promise<void> => {
    const recipeUpdate = filterDirtyFields<RecipesSetInput>(form.formState.dirtyFields, data)

    if (uploadedFile) {
      const filename = getFileName(uploadedFile, data.title)
      recipeUpdate.image_url = filename
    }

    await updateRecipe({ variables: { id: recipeId, recipe: recipeUpdate } })
  }

  const handleSubmit = async (data: RecipeFormData, uploadedFile?: File | null): Promise<string | null> => {
    if (!id || !currentUserId) {
      return 'Missing recipe ID or user authentication'
    }

    setIsLoading(true)
    setError(null)

    try {
      await Promise.all([
        handleUpdateRecipe(id, data, uploadedFile),
        handleUpdateIngredients(id)
      ])

      if (recipe?.id) {
        navigate(`/recipe/${recipe.id}`)
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
  if (!recipe) return <Navigate to="*" replace />;

  if (recipe.owner_id !== currentUserId) {
    return <div>You don't have permission to edit this recipe</div>
  }

  return (
    <FormProvider {...form}>
      <RecipeForm
        title="Edit Recipe"
        submitText="Update Recipe"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
    </FormProvider>
  )
} 
