import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'

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
  required = false
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
              <div className="flex-1 relative">
                <InputComponent
                  {...register(`${fieldName}.${index}.${isTextarea ? 'description' : 'name'}`)}
                  type={isTextarea ? undefined : "text"}
                  placeholder={placeholder(index)}
                  rows={isTextarea ? 4 : undefined}
                  className={`w-full px-4 py-3.5 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg ${isTextarea ? 'resize-none' : ''
                    } border-gray-300 bg-white hover:border-gray-400`}
                />


              </div>

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className={`flex items-center justify-center w-12 h-12 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 border border-red-200 hover:border-red-300 shadow-sm hover:shadow-md ${isTextarea ? 'self-start mt-0' : ''
                    }`}
                  title={`Remove ${isTextarea ? 'step' : 'ingredient'} ${index + 1}`}
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append(isTextarea ? { description: '' } : { name: '' })}
          className="w-full py-4 px-6 text-primary-600 hover:text-primary-700 hover:bg-primary-50 text-base font-semibold rounded-xl border-2 border-dashed border-primary-300 hover:border-primary-400 transition-all duration-200 shadow-sm hover:shadow-md group"
        >
          <div className="flex items-center justify-center space-x-2">
            <PlusIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span>Add {isTextarea ? 'Step' : 'Ingredient'}</span>
          </div>
        </button>
      </div>
    </div>
  )
} 
