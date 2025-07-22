import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { type RecipeFragment } from '../generated/graphql'
import { RecipeComplexity, RecipeSchema, RecipeType } from '../types'
import { DynamicFieldArray } from './DynamicFieldArray'
import { FormContainer } from './FormContainer'
import { FormInput } from './FormInput'
import { FormSelect } from './FormSelect'
import { FormTextarea } from './FormTextarea'
import { ImageUpload } from './ImageUpload'
import { TagSelector } from './TagSelector'

type RecipeFormData = z.infer<typeof RecipeSchema>

interface RecipeFormProps {
  mode: 'add' | 'edit'
  recipe?: RecipeFragment
  onSubmit: (data: RecipeFormData, uploadedFile?: File | null) => Promise<string | null>
  isLoading?: boolean
  error?: string | null
}

export const RecipeForm = ({ mode, recipe, onSubmit, isLoading, error }: RecipeFormProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
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
    await onSubmit(data, uploadedFile)
  }

  const title = mode === 'add' ? 'Create New Recipe' : 'Edit Recipe'
  const submitText = mode === 'add' ? 'Create Recipe' : 'Update Recipe'

  return (
    <FormContainer
      title={title}
      onSubmit={handleSubmit(handleFormSubmit)}
      submitText={submitText}
      isLoading={isLoading}
      isValid={isValid}
      error={error}
    >
      {/* Basic Information Section */}
      <div className="space-y-10 sm:space-y-16">
        <div className="border-b border-gray-200 pb-8 sm:pb-12">
          <div className="flex items-center space-x-4 mb-8 sm:mb-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Basic Information</h3>
          </div>
          <div className="space-y-6 sm:space-y-8">
            <FormInput
              {...register('title')}
              name="title"
              label="Recipe Title"
              placeholder="Enter recipe title"
              error={errors.title}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <FormSelect
                {...register('type')}
                name="type"
                label="Type"
                options={Object.values(RecipeType).map(type => ({ value: type, label: type }))}
                placeholder="Select recipe type"
                error={errors.type}
                required
              />

              <FormSelect
                {...register('complexity')}
                name="complexity"
                label="Complexity"
                options={Object.values(RecipeComplexity).map(complexity => ({ value: complexity, label: complexity }))}
                placeholder="Select complexity"
                error={errors.complexity}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
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
          </div>
        </div>

        {/* Recipe Content Section */}
        <div className="border-b border-gray-200 pb-8 sm:pb-12">
          <div className="flex items-center space-x-4 mb-8 sm:mb-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Recipe Content</h3>
          </div>
          <div className="space-y-8 sm:space-y-12">
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
          </div>
        </div>

        {/* Media & Additional Information Section */}
        <div>
          <div className="flex items-center space-x-4 mb-8 sm:mb-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Media & Additional Information</h3>
          </div>
          <div className="space-y-6 sm:space-y-8">
            <ImageUpload
              value={watch('image_url')}
              onChange={(value: string) => setValue('image_url', value)}
              onFileSelect={(file: File) => setUploadedFile(file)}
              error={errors.image_url?.message}
            />

            <FormInput
              {...register('video_url')}
              name="video_url"
              label="Video URL (optional)"
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              error={errors.video_url}
            />

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
          </div>
        </div>
      </div>
    </FormContainer>
  )
} 
