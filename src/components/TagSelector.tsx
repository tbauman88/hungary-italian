import { RecipeTag } from '../types'

interface TagSelectorProps {
  label: string
  selectedTags: RecipeTag[]
  onTagToggle: (tag: RecipeTag) => void
}

export const TagSelector = ({ label, selectedTags, onTagToggle }: TagSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {Object.values(RecipeTag).map((tag) => {
          const isSelected = selectedTags.includes(tag)

          return (
            <button
              key={tag}
              type="button"
              onClick={() => onTagToggle(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isSelected
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {tag}
            </button>
          )
        })}
      </div>
    </div>
  )
}
