import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useMemo, useRef, useState } from 'react'
import { uploadImageToS3, validateImageFile } from '../utils'

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  onFileSelect?: (file: File) => void
  label?: string
  error?: string
  className?: string
  recipeTitle: string
}

export const ImageUpload = ({
  value,
  onChange,
  onFileSelect,
  label = "Recipe Image",
  error,
  className = "",
  recipeTitle
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState<string[]>([])

  const disabled = useMemo(() => !recipeTitle, [recipeTitle])

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setErrors([])

    const validationErrors = validateImageFile(file)

    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    if (onFileSelect) {
      onFileSelect(file)
    }

    setIsUploading(true)
    try {
      const uploadResult = await uploadImageToS3({ file, recipeTitle })

      if (uploadResult.success && uploadResult.filename) {
        onChange(uploadResult.filename)
      } else {
        setErrors([uploadResult.error || 'Upload failed. Please try again.'])
      }
    } catch (error) {
      setErrors(['Upload failed. Please try again.'])
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onChange('')
    setErrors([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const input = fileInputRef.current
      if (input) {
        input.files = event.dataTransfer.files
        handleFileSelect({ target: { files: event.dataTransfer.files } } as any)
      }
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    if (disabled) return;
    event.preventDefault()
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>

      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((msg, idx) => (
            <span key={idx} className="text-sm text-red-500 block">{msg}</span>
          ))}
        </div>
      )}

      <div
        className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${error
          ? 'border-red-300 bg-red-50'
          : 'border-gray-300 bg-white hover:border-gray-400'
          } ${preview ? 'border-primary-300 bg-primary-50' : ''} ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => {
          if (!isUploading && !disabled && fileInputRef.current) {
            fileInputRef.current.click();
          }
        }}
        style={{ cursor: isUploading || disabled ? 'not-allowed' : 'pointer' }}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="p-8 text-center select-none">
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-900">Click or drag and drop</p>
            <p className="mt-1 text-xs text-gray-500">PNG, JPG, HEIC, HEIF, WebP up to 5MB</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isUploading || disabled}
          className="hidden"
        />
      </div>

      {value && !preview && (
        <div className="text-sm text-gray-500">
          Current image: {value}
        </div>
      )}
    </div>
  )
} 
