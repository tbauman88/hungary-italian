import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Controller } from 'react-hook-form'
import { IngredientTypeahead } from './IngredientTypeahead'

interface DynamicFieldArrayProps {
  label: string
  fields: Array<{ id: string }>
  register: any
  remove: (index: number) => void
  append: (value: any) => void
  fieldName: string
  placeholder: (index: number) => string
  isTextarea?: boolean
  required?: boolean
  errors?: any
  control?: any
}

export const DynamicFieldArray = ({
  label,
  fields,
  register,
  remove,
  append,
  fieldName,
  placeholder,
  isTextarea = false,
  required = false,
  errors = {},
  control,
}: DynamicFieldArrayProps) => {
  const InputComponent = isTextarea ? 'textarea' : 'input'

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="group relative">
            <div className="flex gap-3">
              {fieldName === 'ingredients' && !isTextarea && control ? (
                <>
                  <div className="w-32">
                    <input
                      {...register(`${fieldName}.${index}.amount`)}
                      type="text"
                      placeholder="Amount"
                      className="w-full px-4 py-3.5 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg border-gray-300 bg-white hover:border-gray-400"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <Controller
                      name={`${fieldName}.${index}.name`}
                      control={control}
                      render={({ field: rhfField }) => (
                        <IngredientTypeahead
                          value={rhfField.value}
                          onChange={rhfField.onChange}
                          placeholder={placeholder(index)}
                          onBlur={rhfField.onBlur}
                        />
                      )}
                    />
                    {errors && errors[index] && errors[index].name && (
                      <p className="text-sm text-red-600 font-medium mt-1 flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{errors[index].name.message}</span>
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 relative">
                  <InputComponent
                    {...register(`${fieldName}.${index}.${isTextarea ? 'description' : 'name'}`)}
                    type={isTextarea ? undefined : 'text'}
                    placeholder={placeholder(index)}
                    rows={isTextarea ? 4 : undefined}
                    className={`w-full px-4 py-3.5 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg ${isTextarea ? 'resize-none' : ''} border-gray-300 bg-white hover:border-gray-400`}
                    onBlur={register(`${fieldName}.${index}.${isTextarea ? 'description' : 'name'}`).onBlur}
                  />
                  {errors && errors[index] && errors[index][isTextarea ? 'description' : 'name'] && (
                    <p className="text-sm text-red-600 font-medium mt-1 flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{errors[index][isTextarea ? 'description' : 'name'].message}</span>
                    </p>
                  )}
                </div>
              )}
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 text-red-500 hover:text-red-600 transition-colors"
                  title="Remove field"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append(isTextarea ? { description: '' } : { name: '', amount: '', ingredientId: '' })}
          className="flex items-center justify-center w-full px-4 py-3.5 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg border-gray-300 bg-white hover:border-gray-400"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add {fieldName}
        </button>
      </div>
    </div >
  )
}
