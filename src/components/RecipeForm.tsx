import { useState } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { RecipeComplexity, RecipeTag, RecipeType, type RecipeFormData } from '../types'
import { DynamicFieldArray } from './DynamicFieldArray'
import { FormContainer } from './FormContainer'
import { FormInput } from './FormInput'
import { FormSelect } from './FormSelect'
import { FormTextarea } from './FormTextarea'
import { ImageUpload } from './ImageUpload'
import { TagSelector } from './TagSelector'

interface RecipeFormProps {
  title: string
  submitText: string
  onSubmit: (data: RecipeFormData, uploadedFile?: File | null) => Promise<string | null>
  isLoading?: boolean
  error?: string | null
}

export const RecipeForm = ({ title, submitText, onSubmit, isLoading, error }: RecipeFormProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useFormContext<RecipeFormData>()

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
    name: 'steps',
  })

  const handleFormSubmit = async (data: RecipeFormData) => {
    await onSubmit(data, uploadedFile)
  }

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
                required
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
                required
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
              control={control}
              remove={removeIngredient}
              append={appendIngredient}
              fieldName="ingredients"
              placeholder={(index) => `Ingredient ${index + 1}`}
              required
              errors={errors.ingredients}
            />

            <DynamicFieldArray
              label="Steps"
              fields={stepFields.length === 0 ? [{ id: '' }] : stepFields}
              register={register}
              control={control}
              remove={removeStep}
              append={appendStep}
              fieldName="steps"
              placeholder={(index) => `Step ${index + 1}: Describe what to do...`}
              isTextarea
              required
              errors={errors.steps}
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
              recipeTitle={watch('title') || ''}
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
                  selectedTags={field.value as RecipeTag[] || []}
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
