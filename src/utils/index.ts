export const getImageUrl = (imageUrl?: string) => imageUrl ? `https://${import.meta.env.VITE_CLOUDFRONT_ID}.cloudfront.net/recipes/${imageUrl}` : ''

export const validateImageFile = (file: File): string | null => {
  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    return 'File size must be less than 5MB'
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return 'Only JPEG, PNG, and GIF files are allowed'
  }

  return null
}

export const uploadImageToS3 = async (file: File): Promise<{ success: boolean; filename?: string; error?: string }> => {
  console.log('🔄 Uploading image to S3:', file)

  return {
    success: true,
    filename: 'test.jpg',
  }
}

