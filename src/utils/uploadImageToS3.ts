export const uploadImageToS3 = async ({
  file,
  recipeTitle,
}: {
  file: File
  recipeTitle: string
}): Promise<{ success: boolean; filename?: string; error?: string }> => {
  try {
    const fileExtension = file.type.split('/')[1]
    const recipeName = recipeTitle.toLowerCase().replace(/ /g, '-')
    const filename = `${recipeName}.${fileExtension}`

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

export const getFileName = (file: File | null | undefined, recipeTitle: string) => {
  if (!file) return null

  const fileExtension = file.type.split('/')[1]
  const recipeName = recipeTitle.toLowerCase().replace(/ /g, '-')
  return `${recipeName}.${fileExtension}`
}
