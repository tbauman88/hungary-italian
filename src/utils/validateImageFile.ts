const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif', 'image/webp']
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.heic', '.heif', '.webp']

export const validateImageFile = (file: File): string[] => {
  const errors: string[] = []

  if (file.size > MAX_FILE_SIZE) {
    errors.push('File size must be less than 5MB')
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    errors.push('Only JPEG, PNG, and GIF files are allowed')
  }

  if (!ALLOWED_EXTENSIONS.some(ext => file.name.toLowerCase().endsWith(ext))) {
    errors.push('File extension must be JPG, JPEG, PNG, or GIF')
  }

  return errors
}
