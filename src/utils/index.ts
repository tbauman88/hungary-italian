export const getImageUrl = (imageUrl?: string) => imageUrl ? `https://${import.meta.env.VITE_CLOUDFRONT_ID}.cloudfront.net/recipes/${imageUrl}` : ''
