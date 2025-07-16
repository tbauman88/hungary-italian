
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
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label} {required && '*'}
      </label>
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <InputComponent
              {...register(`${fieldName}.${index}.${isTextarea ? 'description' : 'name'}`)}
              type={isTextarea ? undefined : "text"}
              placeholder={placeholder(index)}
              rows={isTextarea ? 3 : undefined}
              className={`flex-1 px-4 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${isTextarea ? 'resize-none' : ''
                } border-gray-300`}
            />
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className={`px-3 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors ${isTextarea ? 'self-start' : ''
                  }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}



        <button
          type="button"
          onClick={() => append(isTextarea ? { description: '' } : { name: '' })}
          className="w-full py-3 px-4 text-primary-600 hover:text-primary-700 hover:bg-primary-50 text-base font-medium rounded-lg border-2 border-dashed border-primary-300 hover:border-primary-400 transition-colors"
        >
          + Add {isTextarea ? 'Step' : 'Ingredient'}
        </button>
      </div>
    </div>
  )
} 
