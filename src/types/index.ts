import { z } from "zod"

export enum RecipeType {
  SIDES = 'Sides',
  APPETIZERS = 'Appetizers',
  SALADS = 'Salads',
  SOUPS = 'Soups',
  MAINS = 'Mains',
  DESSERTS = 'Desserts',
}

export enum RecipeComplexity {
  SIMPLE = 'Simple',
  COMPLEX = 'Complex',
}

export enum RecipeTag {
  MEAT = 'Meat',
  VEGGIE = 'Veggie',
  COMBO = 'Combo',
  QUICK_AND_SIMPLE = 'Quick & Simple',
  COMPLEX = 'Complex',
  SWEET = 'Sweet',
  SAVOURY = 'Savoury',
}

export const RecipeSchema = z.object({
  title: z.string().min(1, 'Recipe title is required').max(100, 'Title must be less than 100 characters'),
  type: z.enum(Object.values(RecipeType) as [string, ...string[]], { message: 'Type is required' }),
  complexity: z.enum(Object.values(RecipeComplexity) as [string, ...string[]], { message: 'Complexity is required' }),
  cooking_time: z.number({ message: 'Cooking time is required' })
    .min(1, { message: 'Cooking time must be at least 1 minute' })
    .max(1440, { message: 'Cooking time must be less than 24 hours' }),
  portion_size: z.number({ message: 'Portion size is required' })
    .min(1, { message: 'Portion size must be at least 1' })
    .max(20, { message: 'Portion size must be less than 20' }),
  ingredients: z.array(z.object({ name: z.string(), amount: z.string() })).min(1),
  steps: z.array(z.object({ description: z.string() })).min(1),
  image_url: z.string().optional().or(z.literal('')),
  video_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  tags: z.array(z.enum(Object.values(RecipeTag))).optional(),
  notes: z.string().optional(),
})
