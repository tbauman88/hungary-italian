const BASE_S3_URL = `https://${import.meta.env.VITE_CLOUDFRONT_ID}.cloudfront.net/recipes`
const PLACEHOLDER_IMAGE = 'https://placehold.co/1200'

export const getImageUrl = (imageUrl: string) => `${BASE_S3_URL}/${imageUrl}`

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, title: string) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = `${PLACEHOLDER_IMAGE}?text=${title}`;
}
