import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { type RecipeFragment } from '../generated/graphql'
import { RecipeComplexity, RecipeSchema, RecipeType } from '../types'
import { DynamicFieldArray } from './DynamicFieldArray'
import { FormContainer } from './FormContainer'
import { FormInput } from './FormInput'
import { FormSelect } from './FormSelect'
import { FormTextarea } from './FormTextarea'
import { TagSelector } from './TagSelector'

type RecipeFormData = z.infer<typeof RecipeSchema>

interface RecipeFormProps {
  mode: 'add' | 'edit'
  recipe?: RecipeFragment
  onSubmit: (data: RecipeFormData) => Promise<string | null>
  isLoading?: boolean
  error?: string | null
}

export const RecipeForm = ({ mode, recipe, onSubmit, isLoading, error }: RecipeFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset
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

  useEffect(() => {
    if (mode === 'edit' && recipe) {
      reset({
        title: recipe.title,
        notes: recipe.notes || undefined,
        cooking_time: recipe.cooking_time ? parseInt(recipe.cooking_time) : undefined,
        complexity: recipe.complexity || undefined,
        portion_size: recipe.portion_size ? parseInt(recipe.portion_size) : 1,
        image_url: recipe.image_url || '',
        video_url: recipe.video_url || '',
        ingredients: recipe.recipe_ingredients?.map(ri => ({ name: ri.ingredient.name })) || [{ name: '' }],
        steps: recipe.steps?.map(step => ({ description: step })) || [{ description: '' }],
        tags: recipe.tags || [],
        type: recipe.type || undefined,
      })
    }
  }, [mode, recipe, reset])

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

  const handleFormSubmit = async (data: RecipeFormData) => {
    await onSubmit(data)
  }

  const title = mode === 'add' ? 'Create New Recipe' : 'Edit Recipe'
  const submitText = mode === 'add' ? 'Add Recipe' : 'Update Recipe'

  return (
    <FormContainer
      title={title}
      onSubmit={handleSubmit(handleFormSubmit)}
      submitText={submitText}
      isLoading={isLoading}
      isValid={isValid}
      error={error}
    >
      <FormInput
        {...register('title')}
        name="title"
        label="Recipe Title"
        placeholder="Enter recipe title"
        error={errors.title}
        required
      />

      <FormSelect
        {...register('type')}
        name="type"
        label="Type"
        options={Object.values(RecipeType).map(type => ({ value: type, label: type }))}
        placeholder="Select recipe type"
        error={errors.type}
      />

      <FormSelect
        {...register('complexity')}
        name="complexity"
        label="Complexity"
        options={Object.values(RecipeComplexity).map(complexity => ({ value: complexity, label: complexity }))}
        placeholder="Select complexity"
        error={errors.complexity}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <FormInput
          {...register('cooking_time', { valueAsNumber: true })}
          name="cooking_time"
          label="Cooking Time (minutes)"
          type="number"
          placeholder="30"
          error={errors.cooking_time}
        />

        <FormInput
          {...register('portion_size', { valueAsNumber: true })}
          name="portion_size"
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
          name="image_url"
          label="Image URL (optional)"
          type="url"
          placeholder="https://example.com/image.jpg"
          error={errors.image_url}
        />

        <FormInput
          {...register('video_url')}
          name="video_url"
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
        name="notes"
        label="Notes (optional)"
        rows={4}
        placeholder="Add any notes about this recipe..."
        error={errors.notes}
      />
    </FormContainer>
  )
} 
