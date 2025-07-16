import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { DynamicFieldArray } from '../components/DynamicFieldArray'
import { FormContainer } from '../components/FormContainer'
import { FormInput } from '../components/FormInput'
import { FormSelect } from '../components/FormSelect'
import { FormTextarea } from '../components/FormTextarea'
import { TagSelector } from '../components/TagSelector'
import { IngredientsConstraint, IngredientsUpdateColumn, useAddRecipeMutation, type RecipesInsertInput } from '../generated/graphql'
import { RecipeComplexity, RecipeSchema, RecipeType } from '../types'

type RecipeFormData = z.infer<typeof RecipeSchema>

export function AddRecipePage() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const [addRecipe, { loading }] = useAddRecipeMutation({
    onError: (error) => {
      setError(error.message)
    }
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<RecipeFormData>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      title: '',
      notes: undefined,
      cooking_time: undefined,
      complexity: undefined,
      portion_size: 1,
      image_url: '',
      video_url: '',
      ingredients: [{ name: '' }],
      steps: [{ description: '' }],
      tags: [],
      type: undefined,
    },
    mode: 'onChange'
  })

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient
  } = useFieldArray({
    control,
    name: 'ingredients'
  })

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep
  } = useFieldArray({
    control,
    name: 'steps'
  })

  const onSubmit = async (data: RecipeFormData) => {
    try {
      const recipe: RecipesInsertInput = {
        ...data,
        cooking_time: data.cooking_time ? String(data.cooking_time) : null,
        portion_size: String(data.portion_size),
        recipe_ingredients: {
          data: data.ingredients.map(ingredient => ({
            ingredient: {
              data: { name: ingredient.name },
              on_conflict: {
                constraint: IngredientsConstraint.INGREDIENTS_NAME_KEY,
                update_columns: [IngredientsUpdateColumn.NAME]
              }
            }
          }))
        },
        steps: data.steps.map(step => step.description)
      }

      const result = await addRecipe({ variables: { recipe } })

      if (result.data?.insert_recipes_one?.id) {
        navigate(`/recipe/${result.data.insert_recipes_one.id}`)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }

  return (
    <FormContainer
      title="Create New Recipe"
      onSubmit={handleSubmit(onSubmit)}
      submitText="Add Recipe"
      isLoading={loading}
      isValid={isValid}
      error={error}
    >
      <FormInput
        {...register('title')}
        label="Recipe Title"
        placeholder="Enter recipe title"
        error={errors.title}
        required
      />

      <FormSelect
        {...register('type')}
        label="Type"
        options={Object.values(RecipeType).map(type => ({ value: type, label: type }))}
        placeholder="Select recipe type"
        error={errors.type}
      />

      <FormSelect
        {...register('complexity')}
        label="Complexity"
        options={Object.values(RecipeComplexity).map(complexity => ({ value: complexity, label: complexity }))}
        placeholder="Select complexity"
        error={errors.complexity}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <FormInput
          {...register('cooking_time', { valueAsNumber: true })}
          label="Cooking Time (minutes)"
          type="number"
          placeholder="30"
          error={errors.cooking_time}
        />

        <FormInput
          {...register('portion_size', { valueAsNumber: true })}
          label="Portion Size"
          type="number"
          placeholder="4"
          error={errors.portion_size}
          required
        />
      </div>

      <DynamicFieldArray
        label="Ingredients"
        fields={ingredientFields}
        register={register}
        remove={removeIngredient}
        append={appendIngredient}
        fieldName="ingredients"
        placeholder={(index) => `Ingredient ${index + 1}`}
        required
      />

      <DynamicFieldArray
        label="Steps"
        fields={stepFields}
        register={register}
        remove={removeStep}
        append={appendStep}
        fieldName="steps"
        placeholder={(index) => `Step ${index + 1}: Describe what to do...`}
        isTextarea
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <FormInput
          {...register('image_url')}
          label="Image URL (optional)"
          type="url"
          placeholder="https://example.com/image.jpg"
          error={errors.image_url}
        />

        <FormInput
          {...register('video_url')}
          label="Video URL (optional)"
          type="url"
          placeholder="https://youtube.com/watch?v=..."
          error={errors.video_url}
        />
      </div>

      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <TagSelector
            label="Tags (optional)"
            selectedTags={field.value || []}
            onTagToggle={(tag) => {
              const newTags = field.value?.includes(tag)
                ? field.value.filter(t => t !== tag)
                : [...(field.value || []), tag]

              field.onChange(newTags)
            }}
          />
        )}
      />

      <FormTextarea
        {...register('notes')}
        label="Notes (optional)"
        rows={4}
        placeholder="Add any notes about this recipe..."
        error={errors.notes}
      />
    </FormContainer>
  )
} 
