const BASE_S3_URL = `https://${import.meta.env.VITE_CLOUDFRONT_ID}.cloudfront.net/recipes`

export const getImageUrl = (imageUrl?: string) => imageUrl ? `${BASE_S3_URL}/${imageUrl}` : ''
