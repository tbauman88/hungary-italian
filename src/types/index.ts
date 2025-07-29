// import { array, z } from "zod"
import { yupResolver } from '@hookform/resolvers/yup'
import type { Resolver } from 'react-hook-form'
import { array, number, object, string, type InferType } from 'yup'
import type { RecipeFragment } from "../generated/graphql"

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

export type Ingredient = Pick<RecipeFragment['recipe_ingredients'][number], 'ingredient' | 'amount'>

export const RecipeSchema = object({
  title: string().required('Title is required'),
  type: string()
    .oneOf(Object.values(RecipeType), 'Type is required')
    .required('Type is required'),
  complexity: string()
    .oneOf(Object.values(RecipeComplexity), 'Complexity is required')
    .required('Complexity is required'),
  cooking_time: number()
    .transform((value, og) => og === '' ? undefined : value)
    .typeError('Cooking time is required')
    .required(),
  portion_size: number()
    .transform((value, og) => og === '' ? undefined : value)
    .typeError('Portion size is required')
    .required(),
  ingredients: array(object({
    name: string().required('Ingredient name is required'),
    amount: string().required('Amount is required'),
    ingredientId: string().optional().nullable(),
  })).min(1, 'At least one ingredient is required').default([]),
  steps: array(string().required('Step description is required')).default([]),
  image_url: string().optional(),
  video_url: string().url('Must be a valid URL').optional(),
  tags: array(string()).optional(),
  notes: string().optional(),
})

export type RecipeFormData = InferType<typeof RecipeSchema>

export const RecipeResolver = yupResolver(RecipeSchema) as Resolver<RecipeFormData>

export const FORM_DEFAULT_VALUES: InferType<typeof RecipeSchema> = {
  title: '',
  notes: '',
  cooking_time: 0,
  complexity: RecipeComplexity.SIMPLE,
  portion_size: 1,
  image_url: '',
  video_url: '',
  ingredients: [{ ingredientId: '', name: '', amount: '' }],
  steps: [''],
  tags: [],
  type: RecipeType.SIDES,
}
