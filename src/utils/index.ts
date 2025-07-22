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
  try {
    // Generate a unique filename
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const filename = `${timestamp}.${fileExtension}`

    const response = await fetch('/api/uploader', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename,
        contentType: file.type,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return { success: false, error: errorData.error || 'Failed to get upload URL' }
    }

    const { uploadUrl } = await response.json()

    // Upload to S3 using the presigned URL
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    })

    if (!uploadResponse.ok) {
      return { success: false, error: 'Failed to upload to S3' }
    }

    return { success: true, filename }
  } catch (error) {
    console.error('Upload error:', error)
    return { success: false, error: 'Upload failed' }
  }
}
