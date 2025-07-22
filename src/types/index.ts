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
  notes: z.string().optional(),
  cooking_time: z.number().min(1, 'Cooking time must be at least 1 minute').max(1440, 'Cooking time must be less than 24 hours').optional().or(z.literal('')),
  complexity: z.enum(Object.values(RecipeComplexity)).optional(),
  portion_size: z.number().min(1, 'Portion size must be at least 1').max(20, 'Portion size must be less than 20'),
  image_url: z.string().optional().or(z.literal('')),
  video_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  ingredients: z.array(z.object({
    name: z.string().min(1, 'Ingredient name is required')
  })).min(1, 'At least one ingredient is required'),
  steps: z.array(z.object({
    description: z.string().min(1, 'Step description is required')
  })).min(1, 'At least one step is required'),
  tags: z.array(z.enum(Object.values(RecipeTag))).optional(),
  type: z.enum(Object.values(RecipeType)).optional(),
})
