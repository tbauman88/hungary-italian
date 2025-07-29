import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  recipe_complexity: { input: any; output: any; }
  recipe_tag: { input: any; output: any; }
  recipe_type: { input: any; output: any; }
  timestamptz: { input: string; output: string; }
  uuid: { input: string; output: string; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringArrayComparisonExp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['String']['input']>>;
  _eq?: InputMaybe<Array<Scalars['String']['input']>>;
  _gt?: InputMaybe<Array<Scalars['String']['input']>>;
  _gte?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['String']['input']>>;
  _lte?: InputMaybe<Array<Scalars['String']['input']>>;
  _neq?: InputMaybe<Array<Scalars['String']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** ordering argument of a cursor */
export enum CursorOrdering {
  /** ascending ordering of the cursor */
  ASC = 'ASC',
  /** descending ordering of the cursor */
  DESC = 'DESC'
}

/** columns and relationships of "ingredients" */
export type Ingredients = {
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  /** An array relationship */
  recipe_ingredients: Array<RecipeIngredients>;
  /** An aggregate relationship */
  recipe_ingredients_aggregate: RecipeIngredientsAggregate;
  /** An array relationship */
  user_ingredients: Array<UserIngredients>;
  /** An aggregate relationship */
  user_ingredients_aggregate: UserIngredientsAggregate;
};


/** columns and relationships of "ingredients" */
export type IngredientsRecipeIngredientsArgs = {
  distinct_on?: InputMaybe<Array<RecipeIngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RecipeIngredientsOrderBy>>;
  where?: InputMaybe<RecipeIngredientsBoolExp>;
};


/** columns and relationships of "ingredients" */
export type IngredientsRecipeIngredientsAggregateArgs = {
  distinct_on?: InputMaybe<Array<RecipeIngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RecipeIngredientsOrderBy>>;
  where?: InputMaybe<RecipeIngredientsBoolExp>;
};


/** columns and relationships of "ingredients" */
export type IngredientsUserIngredientsArgs = {
  distinct_on?: InputMaybe<Array<UserIngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserIngredientsOrderBy>>;
  where?: InputMaybe<UserIngredientsBoolExp>;
};


/** columns and relationships of "ingredients" */
export type IngredientsUserIngredientsAggregateArgs = {
  distinct_on?: InputMaybe<Array<UserIngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserIngredientsOrderBy>>;
  where?: InputMaybe<UserIngredientsBoolExp>;
};

/** aggregated selection of "ingredients" */
export type IngredientsAggregate = {
  aggregate?: Maybe<IngredientsAggregateFields>;
  nodes: Array<Ingredients>;
};

/** aggregate fields of "ingredients" */
export type IngredientsAggregateFields = {
  count: Scalars['Int']['output'];
  max?: Maybe<IngredientsMaxFields>;
  min?: Maybe<IngredientsMinFields>;
};


/** aggregate fields of "ingredients" */
export type IngredientsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<IngredientsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "ingredients". All fields are combined with a logical 'AND'. */
export type IngredientsBoolExp = {
  _and?: InputMaybe<Array<IngredientsBoolExp>>;
  _not?: InputMaybe<IngredientsBoolExp>;
  _or?: InputMaybe<Array<IngredientsBoolExp>>;
  id?: InputMaybe<UuidComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  recipe_ingredients?: InputMaybe<RecipeIngredientsBoolExp>;
  recipe_ingredients_aggregate?: InputMaybe<RecipeIngredientsAggregateBoolExp>;
  user_ingredients?: InputMaybe<UserIngredientsBoolExp>;
  user_ingredients_aggregate?: InputMaybe<UserIngredientsAggregateBoolExp>;
};

/** unique or primary key constraints on table "ingredients" */
export enum IngredientsConstraint {
  /** unique or primary key constraint on columns "name" */
  INGREDIENTS_NAME_KEY = 'ingredients_name_key',
  /** unique or primary key constraint on columns "id" */
  INGREDIENTS_PKEY = 'ingredients_pkey'
}

/** input type for inserting data into table "ingredients" */
export type IngredientsInsertInput = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  recipe_ingredients?: InputMaybe<RecipeIngredientsArrRelInsertInput>;
  user_ingredients?: InputMaybe<UserIngredientsArrRelInsertInput>;
};

/** aggregate max on columns */
export type IngredientsMaxFields = {
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type IngredientsMinFields = {
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "ingredients" */
export type IngredientsMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Ingredients>;
};

/** input type for inserting object relation for remote table "ingredients" */
export type IngredientsObjRelInsertInput = {
  data: IngredientsInsertInput;
  /** upsert condition */
  on_conflict?: InputMaybe<IngredientsOnConflict>;
};

/** on_conflict condition type for table "ingredients" */
export type IngredientsOnConflict = {
  constraint: IngredientsConstraint;
  update_columns?: Array<IngredientsUpdateColumn>;
  where?: InputMaybe<IngredientsBoolExp>;
};

/** Ordering options when selecting data from "ingredients". */
export type IngredientsOrderBy = {
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  recipe_ingredients_aggregate?: InputMaybe<RecipeIngredientsAggregateOrderBy>;
  user_ingredients_aggregate?: InputMaybe<UserIngredientsAggregateOrderBy>;
};

/** primary key columns input for table: ingredients */
export type IngredientsPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "ingredients" */
export enum IngredientsSelectColumn {
  /** column name */
  ID = 'id',
  /** column name */
  NAME = 'name'
}

/** input type for updating data in table "ingredients" */
export type IngredientsSetInput = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "ingredients" */
export type IngredientsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: IngredientsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type IngredientsStreamCursorValueInput = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "ingredients" */
export enum IngredientsUpdateColumn {
  /** column name */
  ID = 'id',
  /** column name */
  NAME = 'name'
}

export type IngredientsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<IngredientsSetInput>;
  /** filter the rows which have to be updated */
  where: IngredientsBoolExp;
};

export type MissingIngredientsCountRecipesArgs = {
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

export type MissingIngredientsRecipesArgs = {
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** mutation root */
export type MutationRoot = {
  /** delete data from the table: "ingredients" */
  delete_ingredients?: Maybe<IngredientsMutationResponse>;
  /** delete single row from the table: "ingredients" */
  delete_ingredients_by_pk?: Maybe<Ingredients>;
  /** delete data from the table: "recipe_ingredients" */
  delete_recipe_ingredients?: Maybe<RecipeIngredientsMutationResponse>;
  /** delete single row from the table: "recipe_ingredients" */
  delete_recipe_ingredients_by_pk?: Maybe<RecipeIngredients>;
  /** delete data from the table: "recipes" */
  delete_recipes?: Maybe<RecipesMutationResponse>;
  /** delete single row from the table: "recipes" */
  delete_recipes_by_pk?: Maybe<Recipes>;
  /** delete data from the table: "user_ingredients" */
  delete_user_ingredients?: Maybe<UserIngredientsMutationResponse>;
  /** delete single row from the table: "user_ingredients" */
  delete_user_ingredients_by_pk?: Maybe<UserIngredients>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<UsersMutationResponse>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "ingredients" */
  insert_ingredients?: Maybe<IngredientsMutationResponse>;
  /** insert a single row into the table: "ingredients" */
  insert_ingredients_one?: Maybe<Ingredients>;
  /** insert data into the table: "recipe_ingredients" */
  insert_recipe_ingredients?: Maybe<RecipeIngredientsMutationResponse>;
  /** insert a single row into the table: "recipe_ingredients" */
  insert_recipe_ingredients_one?: Maybe<RecipeIngredients>;
  /** insert data into the table: "recipes" */
  insert_recipes?: Maybe<RecipesMutationResponse>;
  /** insert a single row into the table: "recipes" */
  insert_recipes_one?: Maybe<Recipes>;
  /** insert data into the table: "user_ingredients" */
  insert_user_ingredients?: Maybe<UserIngredientsMutationResponse>;
  /** insert a single row into the table: "user_ingredients" */
  insert_user_ingredients_one?: Maybe<UserIngredients>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<UsersMutationResponse>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "ingredients" */
  update_ingredients?: Maybe<IngredientsMutationResponse>;
  /** update single row of the table: "ingredients" */
  update_ingredients_by_pk?: Maybe<Ingredients>;
  /** update multiples rows of table: "ingredients" */
  update_ingredients_many?: Maybe<Array<Maybe<IngredientsMutationResponse>>>;
  /** update data of the table: "recipe_ingredients" */
  update_recipe_ingredients?: Maybe<RecipeIngredientsMutationResponse>;
  /** update single row of the table: "recipe_ingredients" */
  update_recipe_ingredients_by_pk?: Maybe<RecipeIngredients>;
  /** update multiples rows of table: "recipe_ingredients" */
  update_recipe_ingredients_many?: Maybe<Array<Maybe<RecipeIngredientsMutationResponse>>>;
  /** update data of the table: "recipes" */
  update_recipes?: Maybe<RecipesMutationResponse>;
  /** update single row of the table: "recipes" */
  update_recipes_by_pk?: Maybe<Recipes>;
  /** update multiples rows of table: "recipes" */
  update_recipes_many?: Maybe<Array<Maybe<RecipesMutationResponse>>>;
  /** update data of the table: "user_ingredients" */
  update_user_ingredients?: Maybe<UserIngredientsMutationResponse>;
  /** update single row of the table: "user_ingredients" */
  update_user_ingredients_by_pk?: Maybe<UserIngredients>;
  /** update multiples rows of table: "user_ingredients" */
  update_user_ingredients_many?: Maybe<Array<Maybe<UserIngredientsMutationResponse>>>;
  /** update data of the table: "users" */
  update_users?: Maybe<UsersMutationResponse>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<UsersMutationResponse>>>;
};


/** mutation root */
export type MutationRootDeleteIngredientsArgs = {
  where: IngredientsBoolExp;
};


/** mutation root */
export type MutationRootDeleteIngredientsByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type MutationRootDeleteRecipeIngredientsArgs = {
  where: RecipeIngredientsBoolExp;
};


/** mutation root */
export type MutationRootDeleteRecipeIngredientsByPkArgs = {
  ingredient_id: Scalars['uuid']['input'];
  recipe_id: Scalars['uuid']['input'];
};


/** mutation root */
export type MutationRootDeleteRecipesArgs = {
  where: RecipesBoolExp;
};


/** mutation root */
export type MutationRootDeleteRecipesByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type MutationRootDeleteUserIngredientsArgs = {
  where: UserIngredientsBoolExp;
};


/** mutation root */
export type MutationRootDeleteUserIngredientsByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type MutationRootDeleteUsersArgs = {
  where: UsersBoolExp;
};


/** mutation root */
export type MutationRootDeleteUsersByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type MutationRootInsertIngredientsArgs = {
  objects: Array<IngredientsInsertInput>;
  on_conflict?: InputMaybe<IngredientsOnConflict>;
};


/** mutation root */
export type MutationRootInsertIngredientsOneArgs = {
  object: IngredientsInsertInput;
  on_conflict?: InputMaybe<IngredientsOnConflict>;
};


/** mutation root */
export type MutationRootInsertRecipeIngredientsArgs = {
  objects: Array<RecipeIngredientsInsertInput>;
  on_conflict?: InputMaybe<RecipeIngredientsOnConflict>;
};


/** mutation root */
export type MutationRootInsertRecipeIngredientsOneArgs = {
  object: RecipeIngredientsInsertInput;
  on_conflict?: InputMaybe<RecipeIngredientsOnConflict>;
};


/** mutation root */
export type MutationRootInsertRecipesArgs = {
  objects: Array<RecipesInsertInput>;
  on_conflict?: InputMaybe<RecipesOnConflict>;
};


/** mutation root */
export type MutationRootInsertRecipesOneArgs = {
  object: RecipesInsertInput;
  on_conflict?: InputMaybe<RecipesOnConflict>;
};


/** mutation root */
export type MutationRootInsertUserIngredientsArgs = {
  objects: Array<UserIngredientsInsertInput>;
  on_conflict?: InputMaybe<UserIngredientsOnConflict>;
};


/** mutation root */
export type MutationRootInsertUserIngredientsOneArgs = {
  object: UserIngredientsInsertInput;
  on_conflict?: InputMaybe<UserIngredientsOnConflict>;
};


/** mutation root */
export type MutationRootInsertUsersArgs = {
  objects: Array<UsersInsertInput>;
  on_conflict?: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type MutationRootInsertUsersOneArgs = {
  object: UsersInsertInput;
  on_conflict?: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type MutationRootUpdateIngredientsArgs = {
  _set?: InputMaybe<IngredientsSetInput>;
  where: IngredientsBoolExp;
};


/** mutation root */
export type MutationRootUpdateIngredientsByPkArgs = {
  _set?: InputMaybe<IngredientsSetInput>;
  pk_columns: IngredientsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateIngredientsManyArgs = {
  updates: Array<IngredientsUpdates>;
};


/** mutation root */
export type MutationRootUpdateRecipeIngredientsArgs = {
  _set?: InputMaybe<RecipeIngredientsSetInput>;
  where: RecipeIngredientsBoolExp;
};


/** mutation root */
export type MutationRootUpdateRecipeIngredientsByPkArgs = {
  _set?: InputMaybe<RecipeIngredientsSetInput>;
  pk_columns: RecipeIngredientsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateRecipeIngredientsManyArgs = {
  updates: Array<RecipeIngredientsUpdates>;
};


/** mutation root */
export type MutationRootUpdateRecipesArgs = {
  _inc?: InputMaybe<RecipesIncInput>;
  _set?: InputMaybe<RecipesSetInput>;
  where: RecipesBoolExp;
};


/** mutation root */
export type MutationRootUpdateRecipesByPkArgs = {
  _inc?: InputMaybe<RecipesIncInput>;
  _set?: InputMaybe<RecipesSetInput>;
  pk_columns: RecipesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateRecipesManyArgs = {
  updates: Array<RecipesUpdates>;
};


/** mutation root */
export type MutationRootUpdateUserIngredientsArgs = {
  _set?: InputMaybe<UserIngredientsSetInput>;
  where: UserIngredientsBoolExp;
};


/** mutation root */
export type MutationRootUpdateUserIngredientsByPkArgs = {
  _set?: InputMaybe<UserIngredientsSetInput>;
  pk_columns: UserIngredientsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateUserIngredientsManyArgs = {
  updates: Array<UserIngredientsUpdates>;
};


/** mutation root */
export type MutationRootUpdateUsersArgs = {
  _set?: InputMaybe<UsersSetInput>;
  where: UsersBoolExp;
};


/** mutation root */
export type MutationRootUpdateUsersByPkArgs = {
  _set?: InputMaybe<UsersSetInput>;
  pk_columns: UsersPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateUsersManyArgs = {
  updates: Array<UsersUpdates>;
};

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  ASC = 'asc',
  /** in ascending order, nulls first */
  ASC_NULLS_FIRST = 'asc_nulls_first',
  /** in ascending order, nulls last */
  ASC_NULLS_LAST = 'asc_nulls_last',
  /** in descending order, nulls first */
  DESC = 'desc',
  /** in descending order, nulls first */
  DESC_NULLS_FIRST = 'desc_nulls_first',
  /** in descending order, nulls last */
  DESC_NULLS_LAST = 'desc_nulls_last'
}

export type QueryRoot = {
  /** fetch data from the table: "ingredients" */
  ingredients: Array<Ingredients>;
  /** fetch aggregated fields from the table: "ingredients" */
  ingredients_aggregate: IngredientsAggregate;
  /** fetch data from the table: "ingredients" using primary key columns */
  ingredients_by_pk?: Maybe<Ingredients>;
  /** An array relationship */
  recipe_ingredients: Array<RecipeIngredients>;
  /** An aggregate relationship */
  recipe_ingredients_aggregate: RecipeIngredientsAggregate;
  /** fetch data from the table: "recipe_ingredients" using primary key columns */
  recipe_ingredients_by_pk?: Maybe<RecipeIngredients>;
  /** An array relationship */
  recipes: Array<Recipes>;
  /** An aggregate relationship */
  recipes_aggregate: RecipesAggregate;
  /** fetch data from the table: "recipes" using primary key columns */
  recipes_by_pk?: Maybe<Recipes>;
  /** An array relationship */
  user_ingredients: Array<UserIngredients>;
  /** An aggregate relationship */
  user_ingredients_aggregate: UserIngredientsAggregate;
  /** fetch data from the table: "user_ingredients" using primary key columns */
  user_ingredients_by_pk?: Maybe<UserIngredients>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type QueryRootIngredientsArgs = {
  distinct_on?: InputMaybe<Array<IngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<IngredientsOrderBy>>;
  where?: InputMaybe<IngredientsBoolExp>;
};


export type QueryRootIngredientsAggregateArgs = {
  distinct_on?: InputMaybe<Array<IngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<IngredientsOrderBy>>;
  where?: InputMaybe<IngredientsBoolExp>;
};


export type QueryRootIngredientsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type QueryRootRecipeIngredientsArgs = {
  distinct_on?: InputMaybe<Array<RecipeIngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RecipeIngredientsOrderBy>>;
  where?: InputMaybe<RecipeIngredientsBoolExp>;
};


export type QueryRootRecipeIngredientsAggregateArgs = {
  distinct_on?: InputMaybe<Array<RecipeIngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RecipeIngredientsOrderBy>>;
  where?: InputMaybe<RecipeIngredientsBoolExp>;
};


export type QueryRootRecipeIngredientsByPkArgs = {
  ingredient_id: Scalars['uuid']['input'];
  recipe_id: Scalars['uuid']['input'];
};


export type QueryRootRecipesArgs = {
  distinct_on?: InputMaybe<Array<RecipesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RecipesOrderBy>>;
  where?: InputMaybe<RecipesBoolExp>;
};


export type QueryRootRecipesAggregateArgs = {
  distinct_on?: InputMaybe<Array<RecipesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RecipesOrderBy>>;
  where?: InputMaybe<RecipesBoolExp>;
};


export type QueryRootRecipesByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type QueryRootUserIngredientsArgs = {
  distinct_on?: InputMaybe<Array<UserIngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserIngredientsOrderBy>>;
  where?: InputMaybe<UserIngredientsBoolExp>;
};


export type QueryRootUserIngredientsAggregateArgs = {
  distinct_on?: InputMaybe<Array<UserIngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserIngredientsOrderBy>>;
  where?: InputMaybe<UserIngredientsBoolExp>;
};


export type QueryRootUserIngredientsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type QueryRootUsersArgs = {
  distinct_on?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type QueryRootUsersAggregateArgs = {
  distinct_on?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type QueryRootUsersByPkArgs = {
  id: Scalars['uuid']['input'];
};

/** Boolean expression to compare columns of type "recipe_complexity". All fields are combined with logical 'AND'. */
export type RecipeComplexityComparisonExp = {
  _eq?: InputMaybe<Scalars['recipe_complexity']['input']>;
  _gt?: InputMaybe<Scalars['recipe_complexity']['input']>;
  _gte?: InputMaybe<Scalars['recipe_complexity']['input']>;
  _in?: InputMaybe<Array<Scalars['recipe_complexity']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['recipe_complexity']['input']>;
  _lte?: InputMaybe<Scalars['recipe_complexity']['input']>;
  _neq?: InputMaybe<Scalars['recipe_complexity']['input']>;
  _nin?: InputMaybe<Array<Scalars['recipe_complexity']['input']>>;
};

/** columns and relationships of "recipe_ingredients" */
export type RecipeIngredients = {
  amount?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  ingredient: Ingredients;
  ingredient_id: Scalars['uuid']['output'];
  /** An object relationship */
  recipe: Recipes;
  recipe_id: Scalars['uuid']['output'];
};

/** aggregated selection of "recipe_ingredients" */
export type RecipeIngredientsAggregate = {
  aggregate?: Maybe<RecipeIngredientsAggregateFields>;
  nodes: Array<RecipeIngredients>;
};

export type RecipeIngredientsAggregateBoolExp = {
  count?: InputMaybe<RecipeIngredientsAggregateBoolExpCount>;
};

export type RecipeIngredientsAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<RecipeIngredientsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<RecipeIngredientsBoolExp>;
  predicate: IntComparisonExp;
};

/** aggregate fields of "recipe_ingredients" */
export type RecipeIngredientsAggregateFields = {
  count: Scalars['Int']['output'];
  max?: Maybe<RecipeIngredientsMaxFields>;
  min?: Maybe<RecipeIngredientsMinFields>;
};


/** aggregate fields of "recipe_ingredients" */
export type RecipeIngredientsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<RecipeIngredientsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recipe_ingredients" */
export type RecipeIngredientsAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<RecipeIngredientsMaxOrderBy>;
  min?: InputMaybe<RecipeIngredientsMinOrderBy>;
};

/** input type for inserting array relation for remote table "recipe_ingredients" */
export type RecipeIngredientsArrRelInsertInput = {
  data: Array<RecipeIngredientsInsertInput>;
  /** upsert condition */
  on_conflict?: InputMaybe<RecipeIngredientsOnConflict>;
};

/** Boolean expression to filter rows from the table "recipe_ingredients". All fields are combined with a logical 'AND'. */
export type RecipeIngredientsBoolExp = {
  _and?: InputMaybe<Array<RecipeIngredientsBoolExp>>;
  _not?: InputMaybe<RecipeIngredientsBoolExp>;
  _or?: InputMaybe<Array<RecipeIngredientsBoolExp>>;
  amount?: InputMaybe<StringComparisonExp>;
  ingredient?: InputMaybe<IngredientsBoolExp>;
  ingredient_id?: InputMaybe<UuidComparisonExp>;
  recipe?: InputMaybe<RecipesBoolExp>;
  recipe_id?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "recipe_ingredients" */
export enum RecipeIngredientsConstraint {
  /** unique or primary key constraint on columns "ingredient_id", "recipe_id" */
  RECIPE_INGREDIENTS_PKEY = 'recipe_ingredients_pkey'
}

/** input type for inserting data into table "recipe_ingredients" */
export type RecipeIngredientsInsertInput = {
  amount?: InputMaybe<Scalars['String']['input']>;
  ingredient?: InputMaybe<IngredientsObjRelInsertInput>;
  ingredient_id?: InputMaybe<Scalars['uuid']['input']>;
  recipe?: InputMaybe<RecipesObjRelInsertInput>;
  recipe_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type RecipeIngredientsMaxFields = {
  amount?: Maybe<Scalars['String']['output']>;
  ingredient_id?: Maybe<Scalars['uuid']['output']>;
  recipe_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "recipe_ingredients" */
export type RecipeIngredientsMaxOrderBy = {
  amount?: InputMaybe<OrderBy>;
  ingredient_id?: InputMaybe<OrderBy>;
  recipe_id?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type RecipeIngredientsMinFields = {
  amount?: Maybe<Scalars['String']['output']>;
  ingredient_id?: Maybe<Scalars['uuid']['output']>;
  recipe_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "recipe_ingredients" */
export type RecipeIngredientsMinOrderBy = {
  amount?: InputMaybe<OrderBy>;
  ingredient_id?: InputMaybe<OrderBy>;
  recipe_id?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "recipe_ingredients" */
export type RecipeIngredientsMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<RecipeIngredients>;
};

/** on_conflict condition type for table "recipe_ingredients" */
export type RecipeIngredientsOnConflict = {
  constraint: RecipeIngredientsConstraint;
  update_columns?: Array<RecipeIngredientsUpdateColumn>;
  where?: InputMaybe<RecipeIngredientsBoolExp>;
};

/** Ordering options when selecting data from "recipe_ingredients". */
export type RecipeIngredientsOrderBy = {
  amount?: InputMaybe<OrderBy>;
  ingredient?: InputMaybe<IngredientsOrderBy>;
  ingredient_id?: InputMaybe<OrderBy>;
  recipe?: InputMaybe<RecipesOrderBy>;
  recipe_id?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: recipe_ingredients */
export type RecipeIngredientsPkColumnsInput = {
  ingredient_id: Scalars['uuid']['input'];
  recipe_id: Scalars['uuid']['input'];
};

/** select columns of table "recipe_ingredients" */
export enum RecipeIngredientsSelectColumn {
  /** column name */
  AMOUNT = 'amount',
  /** column name */
  INGREDIENT_ID = 'ingredient_id',
  /** column name */
  RECIPE_ID = 'recipe_id'
}

/** input type for updating data in table "recipe_ingredients" */
export type RecipeIngredientsSetInput = {
  amount?: InputMaybe<Scalars['String']['input']>;
  ingredient_id?: InputMaybe<Scalars['uuid']['input']>;
  recipe_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "recipe_ingredients" */
export type RecipeIngredientsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: RecipeIngredientsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type RecipeIngredientsStreamCursorValueInput = {
  amount?: InputMaybe<Scalars['String']['input']>;
  ingredient_id?: InputMaybe<Scalars['uuid']['input']>;
  recipe_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "recipe_ingredients" */
export enum RecipeIngredientsUpdateColumn {
  /** column name */
  AMOUNT = 'amount',
  /** column name */
  INGREDIENT_ID = 'ingredient_id',
  /** column name */
  RECIPE_ID = 'recipe_id'
}

export type RecipeIngredientsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<RecipeIngredientsSetInput>;
  /** filter the rows which have to be updated */
  where: RecipeIngredientsBoolExp;
};

/** Boolean expression to compare columns of type "recipe_tag". All fields are combined with logical 'AND'. */
export type RecipeTagArrayComparisonExp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['recipe_tag']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['recipe_tag']['input']>>;
  _eq?: InputMaybe<Array<Scalars['recipe_tag']['input']>>;
  _gt?: InputMaybe<Array<Scalars['recipe_tag']['input']>>;
  _gte?: InputMaybe<Array<Scalars['recipe_tag']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['recipe_tag']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['recipe_tag']['input']>>;
  _lte?: InputMaybe<Array<Scalars['recipe_tag']['input']>>;
  _neq?: InputMaybe<Array<Scalars['recipe_tag']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['recipe_tag']['input']>>>;
};

/** Boolean expression to compare columns of type "recipe_type". All fields are combined with logical 'AND'. */
export type RecipeTypeComparisonExp = {
  _eq?: InputMaybe<Scalars['recipe_type']['input']>;
  _gt?: InputMaybe<Scalars['recipe_type']['input']>;
  _gte?: InputMaybe<Scalars['recipe_type']['input']>;
  _in?: InputMaybe<Array<Scalars['recipe_type']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['recipe_type']['input']>;
  _lte?: InputMaybe<Scalars['recipe_type']['input']>;
  _neq?: InputMaybe<Scalars['recipe_type']['input']>;
  _nin?: InputMaybe<Array<Scalars['recipe_type']['input']>>;
};

/** columns and relationships of "recipes" */
export type Recipes = {
  complexity: Scalars['recipe_complexity']['output'];
  cooking_time?: Maybe<Scalars['Int']['output']>;
  created_at: Scalars['timestamptz']['output'];
  has_protein: Scalars['Boolean']['output'];
  id: Scalars['uuid']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  /** A computed field, executes function "missing_list" */
  missing_ingredients?: Maybe<Array<RecipeIngredients>>;
  /** A computed field, executes function "missing_count" */
  missing_ingredients_count?: Maybe<Scalars['Int']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  owner?: Maybe<Users>;
  owner_id?: Maybe<Scalars['uuid']['output']>;
  portion_size?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  recipe_ingredients: Array<RecipeIngredients>;
  /** An aggregate relationship */
  recipe_ingredients_aggregate: RecipeIngredientsAggregate;
  steps: Array<Scalars['String']['output']>;
  tags: Array<Scalars['recipe_tag']['output']>;
  title: Scalars['String']['output'];
  type: Scalars['recipe_type']['output'];
  updated_at: Scalars['timestamptz']['output'];
  video_url?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "recipes" */
export type RecipesMissingIngredientsArgs = {
  args: MissingIngredientsRecipesArgs;
  distinct_on?: InputMaybe<Array<RecipeIngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RecipeIngredientsOrderBy>>;
  where?: InputMaybe<RecipeIngredientsBoolExp>;
};


/** columns and relationships of "recipes" */
export type RecipesMissingIngredientsCountArgs = {
  args: MissingIngredientsCountRecipesArgs;
};


/** columns and relationships of "recipes" */
export type RecipesRecipeIngredientsArgs = {
  distinct_on?: InputMaybe<Array<RecipeIngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RecipeIngredientsOrderBy>>;
  where?: InputMaybe<RecipeIngredientsBoolExp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipeIngredientsAggregateArgs = {
  distinct_on?: InputMaybe<Array<RecipeIngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RecipeIngredientsOrderBy>>;
  where?: InputMaybe<RecipeIngredientsBoolExp>;
};

/** aggregated selection of "recipes" */
export type RecipesAggregate = {
  aggregate?: Maybe<RecipesAggregateFields>;
  nodes: Array<Recipes>;
};

export type RecipesAggregateBoolExp = {
  bool_and?: InputMaybe<RecipesAggregateBoolExpBoolAnd>;
  bool_or?: InputMaybe<RecipesAggregateBoolExpBoolOr>;
  count?: InputMaybe<RecipesAggregateBoolExpCount>;
};

export type RecipesAggregateBoolExpBoolAnd = {
  arguments: RecipesSelectColumnRecipesAggregateBoolExpBoolAndArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<RecipesBoolExp>;
  predicate: BooleanComparisonExp;
};

export type RecipesAggregateBoolExpBoolOr = {
  arguments: RecipesSelectColumnRecipesAggregateBoolExpBoolOrArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<RecipesBoolExp>;
  predicate: BooleanComparisonExp;
};

export type RecipesAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<RecipesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<RecipesBoolExp>;
  predicate: IntComparisonExp;
};

/** aggregate fields of "recipes" */
export type RecipesAggregateFields = {
  avg?: Maybe<RecipesAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<RecipesMaxFields>;
  min?: Maybe<RecipesMinFields>;
  stddev?: Maybe<RecipesStddevFields>;
  stddev_pop?: Maybe<RecipesStddevPopFields>;
  stddev_samp?: Maybe<RecipesStddevSampFields>;
  sum?: Maybe<RecipesSumFields>;
  var_pop?: Maybe<RecipesVarPopFields>;
  var_samp?: Maybe<RecipesVarSampFields>;
  variance?: Maybe<RecipesVarianceFields>;
};


/** aggregate fields of "recipes" */
export type RecipesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<RecipesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recipes" */
export type RecipesAggregateOrderBy = {
  avg?: InputMaybe<RecipesAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<RecipesMaxOrderBy>;
  min?: InputMaybe<RecipesMinOrderBy>;
  stddev?: InputMaybe<RecipesStddevOrderBy>;
  stddev_pop?: InputMaybe<RecipesStddevPopOrderBy>;
  stddev_samp?: InputMaybe<RecipesStddevSampOrderBy>;
  sum?: InputMaybe<RecipesSumOrderBy>;
  var_pop?: InputMaybe<RecipesVarPopOrderBy>;
  var_samp?: InputMaybe<RecipesVarSampOrderBy>;
  variance?: InputMaybe<RecipesVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "recipes" */
export type RecipesArrRelInsertInput = {
  data: Array<RecipesInsertInput>;
  /** upsert condition */
  on_conflict?: InputMaybe<RecipesOnConflict>;
};

/** aggregate avg on columns */
export type RecipesAvgFields = {
  cooking_time?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "missing_count" */
  missing_ingredients_count?: Maybe<Scalars['Int']['output']>;
  portion_size?: Maybe<Scalars['Float']['output']>;
};


/** aggregate avg on columns */
export type RecipesAvgFieldsMissingIngredientsCountArgs = {
  args: MissingIngredientsCountRecipesArgs;
};

/** order by avg() on columns of table "recipes" */
export type RecipesAvgOrderBy = {
  cooking_time?: InputMaybe<OrderBy>;
  portion_size?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "recipes". All fields are combined with a logical 'AND'. */
export type RecipesBoolExp = {
  _and?: InputMaybe<Array<RecipesBoolExp>>;
  _not?: InputMaybe<RecipesBoolExp>;
  _or?: InputMaybe<Array<RecipesBoolExp>>;
  complexity?: InputMaybe<RecipeComplexityComparisonExp>;
  cooking_time?: InputMaybe<IntComparisonExp>;
  created_at?: InputMaybe<TimestamptzComparisonExp>;
  has_protein?: InputMaybe<BooleanComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  image_url?: InputMaybe<StringComparisonExp>;
  notes?: InputMaybe<StringComparisonExp>;
  owner?: InputMaybe<UsersBoolExp>;
  owner_id?: InputMaybe<UuidComparisonExp>;
  portion_size?: InputMaybe<IntComparisonExp>;
  recipe_ingredients?: InputMaybe<RecipeIngredientsBoolExp>;
  recipe_ingredients_aggregate?: InputMaybe<RecipeIngredientsAggregateBoolExp>;
  steps?: InputMaybe<StringArrayComparisonExp>;
  tags?: InputMaybe<RecipeTagArrayComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
  type?: InputMaybe<RecipeTypeComparisonExp>;
  updated_at?: InputMaybe<TimestamptzComparisonExp>;
  video_url?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "recipes" */
export enum RecipesConstraint {
  /** unique or primary key constraint on columns "id" */
  RECIPES_PKEY = 'recipes_pkey',
  /** unique or primary key constraint on columns "title" */
  RECIPES_TITLE_KEY = 'recipes_title_key'
}

/** input type for incrementing numeric columns in table "recipes" */
export type RecipesIncInput = {
  cooking_time?: InputMaybe<Scalars['Int']['input']>;
  portion_size?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "recipes" */
export type RecipesInsertInput = {
  complexity?: InputMaybe<Scalars['recipe_complexity']['input']>;
  cooking_time?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  has_protein?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<UsersObjRelInsertInput>;
  owner_id?: InputMaybe<Scalars['uuid']['input']>;
  portion_size?: InputMaybe<Scalars['Int']['input']>;
  recipe_ingredients?: InputMaybe<RecipeIngredientsArrRelInsertInput>;
  steps?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['recipe_tag']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['recipe_type']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  video_url?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type RecipesMaxFields = {
  complexity?: Maybe<Scalars['recipe_complexity']['output']>;
  cooking_time?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  /** A computed field, executes function "missing_count" */
  missing_ingredients_count?: Maybe<Scalars['Int']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  owner_id?: Maybe<Scalars['uuid']['output']>;
  portion_size?: Maybe<Scalars['Int']['output']>;
  steps?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<Scalars['recipe_tag']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['recipe_type']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  video_url?: Maybe<Scalars['String']['output']>;
};


/** aggregate max on columns */
export type RecipesMaxFieldsMissingIngredientsCountArgs = {
  args: MissingIngredientsCountRecipesArgs;
};

/** order by max() on columns of table "recipes" */
export type RecipesMaxOrderBy = {
  complexity?: InputMaybe<OrderBy>;
  cooking_time?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  image_url?: InputMaybe<OrderBy>;
  notes?: InputMaybe<OrderBy>;
  owner_id?: InputMaybe<OrderBy>;
  portion_size?: InputMaybe<OrderBy>;
  steps?: InputMaybe<OrderBy>;
  tags?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  type?: InputMaybe<OrderBy>;
  updated_at?: InputMaybe<OrderBy>;
  video_url?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type RecipesMinFields = {
  complexity?: Maybe<Scalars['recipe_complexity']['output']>;
  cooking_time?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  /** A computed field, executes function "missing_count" */
  missing_ingredients_count?: Maybe<Scalars['Int']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  owner_id?: Maybe<Scalars['uuid']['output']>;
  portion_size?: Maybe<Scalars['Int']['output']>;
  steps?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<Scalars['recipe_tag']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['recipe_type']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  video_url?: Maybe<Scalars['String']['output']>;
};


/** aggregate min on columns */
export type RecipesMinFieldsMissingIngredientsCountArgs = {
  args: MissingIngredientsCountRecipesArgs;
};

/** order by min() on columns of table "recipes" */
export type RecipesMinOrderBy = {
  complexity?: InputMaybe<OrderBy>;
  cooking_time?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  image_url?: InputMaybe<OrderBy>;
  notes?: InputMaybe<OrderBy>;
  owner_id?: InputMaybe<OrderBy>;
  portion_size?: InputMaybe<OrderBy>;
  steps?: InputMaybe<OrderBy>;
  tags?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  type?: InputMaybe<OrderBy>;
  updated_at?: InputMaybe<OrderBy>;
  video_url?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "recipes" */
export type RecipesMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipes>;
};

/** input type for inserting object relation for remote table "recipes" */
export type RecipesObjRelInsertInput = {
  data: RecipesInsertInput;
  /** upsert condition */
  on_conflict?: InputMaybe<RecipesOnConflict>;
};

/** on_conflict condition type for table "recipes" */
export type RecipesOnConflict = {
  constraint: RecipesConstraint;
  update_columns?: Array<RecipesUpdateColumn>;
  where?: InputMaybe<RecipesBoolExp>;
};

/** Ordering options when selecting data from "recipes". */
export type RecipesOrderBy = {
  complexity?: InputMaybe<OrderBy>;
  cooking_time?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  has_protein?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  image_url?: InputMaybe<OrderBy>;
  notes?: InputMaybe<OrderBy>;
  owner?: InputMaybe<UsersOrderBy>;
  owner_id?: InputMaybe<OrderBy>;
  portion_size?: InputMaybe<OrderBy>;
  recipe_ingredients_aggregate?: InputMaybe<RecipeIngredientsAggregateOrderBy>;
  steps?: InputMaybe<OrderBy>;
  tags?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  type?: InputMaybe<OrderBy>;
  updated_at?: InputMaybe<OrderBy>;
  video_url?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: recipes */
export type RecipesPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "recipes" */
export enum RecipesSelectColumn {
  /** column name */
  COMPLEXITY = 'complexity',
  /** column name */
  COOKING_TIME = 'cooking_time',
  /** column name */
  CREATED_AT = 'created_at',
  /** column name */
  HAS_PROTEIN = 'has_protein',
  /** column name */
  ID = 'id',
  /** column name */
  IMAGE_URL = 'image_url',
  /** column name */
  NOTES = 'notes',
  /** column name */
  OWNER_ID = 'owner_id',
  /** column name */
  PORTION_SIZE = 'portion_size',
  /** column name */
  STEPS = 'steps',
  /** column name */
  TAGS = 'tags',
  /** column name */
  TITLE = 'title',
  /** column name */
  TYPE = 'type',
  /** column name */
  UPDATED_AT = 'updated_at',
  /** column name */
  VIDEO_URL = 'video_url'
}

/** select "recipes_aggregate_bool_exp_bool_and_arguments_columns" columns of table "recipes" */
export enum RecipesSelectColumnRecipesAggregateBoolExpBoolAndArgumentsColumns {
  /** column name */
  HAS_PROTEIN = 'has_protein'
}

/** select "recipes_aggregate_bool_exp_bool_or_arguments_columns" columns of table "recipes" */
export enum RecipesSelectColumnRecipesAggregateBoolExpBoolOrArgumentsColumns {
  /** column name */
  HAS_PROTEIN = 'has_protein'
}

/** input type for updating data in table "recipes" */
export type RecipesSetInput = {
  complexity?: InputMaybe<Scalars['recipe_complexity']['input']>;
  cooking_time?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  has_protein?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  owner_id?: InputMaybe<Scalars['uuid']['input']>;
  portion_size?: InputMaybe<Scalars['Int']['input']>;
  steps?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['recipe_tag']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['recipe_type']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  video_url?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type RecipesStddevFields = {
  cooking_time?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "missing_count" */
  missing_ingredients_count?: Maybe<Scalars['Int']['output']>;
  portion_size?: Maybe<Scalars['Float']['output']>;
};


/** aggregate stddev on columns */
export type RecipesStddevFieldsMissingIngredientsCountArgs = {
  args: MissingIngredientsCountRecipesArgs;
};

/** order by stddev() on columns of table "recipes" */
export type RecipesStddevOrderBy = {
  cooking_time?: InputMaybe<OrderBy>;
  portion_size?: InputMaybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type RecipesStddevPopFields = {
  cooking_time?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "missing_count" */
  missing_ingredients_count?: Maybe<Scalars['Int']['output']>;
  portion_size?: Maybe<Scalars['Float']['output']>;
};


/** aggregate stddev_pop on columns */
export type RecipesStddevPopFieldsMissingIngredientsCountArgs = {
  args: MissingIngredientsCountRecipesArgs;
};

/** order by stddev_pop() on columns of table "recipes" */
export type RecipesStddevPopOrderBy = {
  cooking_time?: InputMaybe<OrderBy>;
  portion_size?: InputMaybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type RecipesStddevSampFields = {
  cooking_time?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "missing_count" */
  missing_ingredients_count?: Maybe<Scalars['Int']['output']>;
  portion_size?: Maybe<Scalars['Float']['output']>;
};


/** aggregate stddev_samp on columns */
export type RecipesStddevSampFieldsMissingIngredientsCountArgs = {
  args: MissingIngredientsCountRecipesArgs;
};

/** order by stddev_samp() on columns of table "recipes" */
export type RecipesStddevSampOrderBy = {
  cooking_time?: InputMaybe<OrderBy>;
  portion_size?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "recipes" */
export type RecipesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: RecipesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type RecipesStreamCursorValueInput = {
  complexity?: InputMaybe<Scalars['recipe_complexity']['input']>;
  cooking_time?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  has_protein?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  owner_id?: InputMaybe<Scalars['uuid']['input']>;
  portion_size?: InputMaybe<Scalars['Int']['input']>;
  steps?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['recipe_tag']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['recipe_type']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  video_url?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type RecipesSumFields = {
  cooking_time?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "missing_count" */
  missing_ingredients_count?: Maybe<Scalars['Int']['output']>;
  portion_size?: Maybe<Scalars['Int']['output']>;
};


/** aggregate sum on columns */
export type RecipesSumFieldsMissingIngredientsCountArgs = {
  args: MissingIngredientsCountRecipesArgs;
};

/** order by sum() on columns of table "recipes" */
export type RecipesSumOrderBy = {
  cooking_time?: InputMaybe<OrderBy>;
  portion_size?: InputMaybe<OrderBy>;
};

/** update columns of table "recipes" */
export enum RecipesUpdateColumn {
  /** column name */
  COMPLEXITY = 'complexity',
  /** column name */
  COOKING_TIME = 'cooking_time',
  /** column name */
  CREATED_AT = 'created_at',
  /** column name */
  HAS_PROTEIN = 'has_protein',
  /** column name */
  ID = 'id',
  /** column name */
  IMAGE_URL = 'image_url',
  /** column name */
  NOTES = 'notes',
  /** column name */
  OWNER_ID = 'owner_id',
  /** column name */
  PORTION_SIZE = 'portion_size',
  /** column name */
  STEPS = 'steps',
  /** column name */
  TAGS = 'tags',
  /** column name */
  TITLE = 'title',
  /** column name */
  TYPE = 'type',
  /** column name */
  UPDATED_AT = 'updated_at',
  /** column name */
  VIDEO_URL = 'video_url'
}

export type RecipesUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<RecipesIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<RecipesSetInput>;
  /** filter the rows which have to be updated */
  where: RecipesBoolExp;
};

/** aggregate var_pop on columns */
export type RecipesVarPopFields = {
  cooking_time?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "missing_count" */
  missing_ingredients_count?: Maybe<Scalars['Int']['output']>;
  portion_size?: Maybe<Scalars['Float']['output']>;
};


/** aggregate var_pop on columns */
export type RecipesVarPopFieldsMissingIngredientsCountArgs = {
  args: MissingIngredientsCountRecipesArgs;
};

/** order by var_pop() on columns of table "recipes" */
export type RecipesVarPopOrderBy = {
  cooking_time?: InputMaybe<OrderBy>;
  portion_size?: InputMaybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type RecipesVarSampFields = {
  cooking_time?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "missing_count" */
  missing_ingredients_count?: Maybe<Scalars['Int']['output']>;
  portion_size?: Maybe<Scalars['Float']['output']>;
};


/** aggregate var_samp on columns */
export type RecipesVarSampFieldsMissingIngredientsCountArgs = {
  args: MissingIngredientsCountRecipesArgs;
};

/** order by var_samp() on columns of table "recipes" */
export type RecipesVarSampOrderBy = {
  cooking_time?: InputMaybe<OrderBy>;
  portion_size?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type RecipesVarianceFields = {
  cooking_time?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "missing_count" */
  missing_ingredients_count?: Maybe<Scalars['Int']['output']>;
  portion_size?: Maybe<Scalars['Float']['output']>;
};


/** aggregate variance on columns */
export type RecipesVarianceFieldsMissingIngredientsCountArgs = {
  args: MissingIngredientsCountRecipesArgs;
};

/** order by variance() on columns of table "recipes" */
export type RecipesVarianceOrderBy = {
  cooking_time?: InputMaybe<OrderBy>;
  portion_size?: InputMaybe<OrderBy>;
};

export type SubscriptionRoot = {
  /** fetch data from the table: "ingredients" */
  ingredients: Array<Ingredients>;
  /** fetch aggregated fields from the table: "ingredients" */
  ingredients_aggregate: IngredientsAggregate;
  /** fetch data from the table: "ingredients" using primary key columns */
  ingredients_by_pk?: Maybe<Ingredients>;
  /** fetch data from the table in a streaming manner: "ingredients" */
  ingredients_stream: Array<Ingredients>;
  /** An array relationship */
  recipe_ingredients: Array<RecipeIngredients>;
  /** An aggregate relationship */
  recipe_ingredients_aggregate: RecipeIngredientsAggregate;
  /** fetch data from the table: "recipe_ingredients" using primary key columns */
  recipe_ingredients_by_pk?: Maybe<RecipeIngredients>;
  /** fetch data from the table in a streaming manner: "recipe_ingredients" */
  recipe_ingredients_stream: Array<RecipeIngredients>;
  /** An array relationship */
  recipes: Array<Recipes>;
  /** An aggregate relationship */
  recipes_aggregate: RecipesAggregate;
  /** fetch data from the table: "recipes" using primary key columns */
  recipes_by_pk?: Maybe<Recipes>;
  /** fetch data from the table in a streaming manner: "recipes" */
  recipes_stream: Array<Recipes>;
  /** An array relationship */
  user_ingredients: Array<UserIngredients>;
  /** An aggregate relationship */
  user_ingredients_aggregate: UserIngredientsAggregate;
  /** fetch data from the table: "user_ingredients" using primary key columns */
  user_ingredients_by_pk?: Maybe<UserIngredients>;
  /** fetch data from the table in a streaming manner: "user_ingredients" */
  user_ingredients_stream: Array<UserIngredients>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
};


export type SubscriptionRootIngredientsArgs = {
  distinct_on?: InputMaybe<Array<IngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<IngredientsOrderBy>>;
  where?: InputMaybe<IngredientsBoolExp>;
};


export type SubscriptionRootIngredientsAggregateArgs = {
  distinct_on?: InputMaybe<Array<IngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<IngredientsOrderBy>>;
  where?: InputMaybe<IngredientsBoolExp>;
};


export type SubscriptionRootIngredientsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type SubscriptionRootIngredientsStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<IngredientsStreamCursorInput>>;
  where?: InputMaybe<IngredientsBoolExp>;
};


export type SubscriptionRootRecipeIngredientsArgs = {
  distinct_on?: InputMaybe<Array<RecipeIngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RecipeIngredientsOrderBy>>;
  where?: InputMaybe<RecipeIngredientsBoolExp>;
};


export type SubscriptionRootRecipeIngredientsAggregateArgs = {
  distinct_on?: InputMaybe<Array<RecipeIngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RecipeIngredientsOrderBy>>;
  where?: InputMaybe<RecipeIngredientsBoolExp>;
};


export type SubscriptionRootRecipeIngredientsByPkArgs = {
  ingredient_id: Scalars['uuid']['input'];
  recipe_id: Scalars['uuid']['input'];
};


export type SubscriptionRootRecipeIngredientsStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<RecipeIngredientsStreamCursorInput>>;
  where?: InputMaybe<RecipeIngredientsBoolExp>;
};


export type SubscriptionRootRecipesArgs = {
  distinct_on?: InputMaybe<Array<RecipesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RecipesOrderBy>>;
  where?: InputMaybe<RecipesBoolExp>;
};


export type SubscriptionRootRecipesAggregateArgs = {
  distinct_on?: InputMaybe<Array<RecipesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RecipesOrderBy>>;
  where?: InputMaybe<RecipesBoolExp>;
};


export type SubscriptionRootRecipesByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type SubscriptionRootRecipesStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<RecipesStreamCursorInput>>;
  where?: InputMaybe<RecipesBoolExp>;
};


export type SubscriptionRootUserIngredientsArgs = {
  distinct_on?: InputMaybe<Array<UserIngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserIngredientsOrderBy>>;
  where?: InputMaybe<UserIngredientsBoolExp>;
};


export type SubscriptionRootUserIngredientsAggregateArgs = {
  distinct_on?: InputMaybe<Array<UserIngredientsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UserIngredientsOrderBy>>;
  where?: InputMaybe<UserIngredientsBoolExp>;
};


export type SubscriptionRootUserIngredientsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type SubscriptionRootUserIngredientsStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<UserIngredientsStreamCursorInput>>;
  where?: InputMaybe<UserIngredientsBoolExp>;
};


export type SubscriptionRootUsersArgs = {
  distinct_on?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type SubscriptionRootUsersAggregateArgs = {
  distinct_on?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type SubscriptionRootUsersByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type SubscriptionRootUsersStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<UsersStreamCursorInput>>;
  where?: InputMaybe<UsersBoolExp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "user_ingredients" */
export type UserIngredients = {
  amount?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  ingredient: Ingredients;
  ingredient_id: Scalars['uuid']['output'];
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "user_ingredients" */
export type UserIngredientsAggregate = {
  aggregate?: Maybe<UserIngredientsAggregateFields>;
  nodes: Array<UserIngredients>;
};

export type UserIngredientsAggregateBoolExp = {
  count?: InputMaybe<UserIngredientsAggregateBoolExpCount>;
};

export type UserIngredientsAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<UserIngredientsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<UserIngredientsBoolExp>;
  predicate: IntComparisonExp;
};

/** aggregate fields of "user_ingredients" */
export type UserIngredientsAggregateFields = {
  count: Scalars['Int']['output'];
  max?: Maybe<UserIngredientsMaxFields>;
  min?: Maybe<UserIngredientsMinFields>;
};


/** aggregate fields of "user_ingredients" */
export type UserIngredientsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<UserIngredientsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "user_ingredients" */
export type UserIngredientsAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<UserIngredientsMaxOrderBy>;
  min?: InputMaybe<UserIngredientsMinOrderBy>;
};

/** input type for inserting array relation for remote table "user_ingredients" */
export type UserIngredientsArrRelInsertInput = {
  data: Array<UserIngredientsInsertInput>;
  /** upsert condition */
  on_conflict?: InputMaybe<UserIngredientsOnConflict>;
};

/** Boolean expression to filter rows from the table "user_ingredients". All fields are combined with a logical 'AND'. */
export type UserIngredientsBoolExp = {
  _and?: InputMaybe<Array<UserIngredientsBoolExp>>;
  _not?: InputMaybe<UserIngredientsBoolExp>;
  _or?: InputMaybe<Array<UserIngredientsBoolExp>>;
  amount?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  ingredient?: InputMaybe<IngredientsBoolExp>;
  ingredient_id?: InputMaybe<UuidComparisonExp>;
  user_id?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "user_ingredients" */
export enum UserIngredientsConstraint {
  /** unique or primary key constraint on columns "id" */
  USER_INGREDIENTS_PKEY = 'user_ingredients_pkey',
  /** unique or primary key constraint on columns "user_id", "ingredient_id" */
  USER_INGREDIENTS_USER_ID_INGREDIENT_ID_KEY = 'user_ingredients_user_id_ingredient_id_key'
}

/** input type for inserting data into table "user_ingredients" */
export type UserIngredientsInsertInput = {
  amount?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  ingredient?: InputMaybe<IngredientsObjRelInsertInput>;
  ingredient_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type UserIngredientsMaxFields = {
  amount?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  ingredient_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "user_ingredients" */
export type UserIngredientsMaxOrderBy = {
  amount?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  ingredient_id?: InputMaybe<OrderBy>;
  user_id?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type UserIngredientsMinFields = {
  amount?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  ingredient_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "user_ingredients" */
export type UserIngredientsMinOrderBy = {
  amount?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  ingredient_id?: InputMaybe<OrderBy>;
  user_id?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "user_ingredients" */
export type UserIngredientsMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<UserIngredients>;
};

/** on_conflict condition type for table "user_ingredients" */
export type UserIngredientsOnConflict = {
  constraint: UserIngredientsConstraint;
  update_columns?: Array<UserIngredientsUpdateColumn>;
  where?: InputMaybe<UserIngredientsBoolExp>;
};

/** Ordering options when selecting data from "user_ingredients". */
export type UserIngredientsOrderBy = {
  amount?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  ingredient?: InputMaybe<IngredientsOrderBy>;
  ingredient_id?: InputMaybe<OrderBy>;
  user_id?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: user_ingredients */
export type UserIngredientsPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "user_ingredients" */
export enum UserIngredientsSelectColumn {
  /** column name */
  AMOUNT = 'amount',
  /** column name */
  ID = 'id',
  /** column name */
  INGREDIENT_ID = 'ingredient_id',
  /** column name */
  USER_ID = 'user_id'
}

/** input type for updating data in table "user_ingredients" */
export type UserIngredientsSetInput = {
  amount?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  ingredient_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "user_ingredients" */
export type UserIngredientsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: UserIngredientsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UserIngredientsStreamCursorValueInput = {
  amount?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  ingredient_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "user_ingredients" */
export enum UserIngredientsUpdateColumn {
  /** column name */
  AMOUNT = 'amount',
  /** column name */
  ID = 'id',
  /** column name */
  INGREDIENT_ID = 'ingredient_id',
  /** column name */
  USER_ID = 'user_id'
}

export type UserIngredientsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UserIngredientsSetInput>;
  /** filter the rows which have to be updated */
  where: UserIngredientsBoolExp;
};

/** columns and relationships of "users" */
export type Users = {
  created_at: Scalars['timestamptz']['output'];
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  email: Scalars['String']['output'];
  firebase_uid?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  /** An array relationship */
  recipes: Array<Recipes>;
  /** An aggregate relationship */
  recipes_aggregate: RecipesAggregate;
};


/** columns and relationships of "users" */
export type UsersRecipesArgs = {
  distinct_on?: InputMaybe<Array<RecipesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RecipesOrderBy>>;
  where?: InputMaybe<RecipesBoolExp>;
};


/** columns and relationships of "users" */
export type UsersRecipesAggregateArgs = {
  distinct_on?: InputMaybe<Array<RecipesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RecipesOrderBy>>;
  where?: InputMaybe<RecipesBoolExp>;
};

/** aggregated selection of "users" */
export type UsersAggregate = {
  aggregate?: Maybe<UsersAggregateFields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type UsersAggregateFields = {
  count: Scalars['Int']['output'];
  max?: Maybe<UsersMaxFields>;
  min?: Maybe<UsersMinFields>;
};


/** aggregate fields of "users" */
export type UsersAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<UsersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type UsersBoolExp = {
  _and?: InputMaybe<Array<UsersBoolExp>>;
  _not?: InputMaybe<UsersBoolExp>;
  _or?: InputMaybe<Array<UsersBoolExp>>;
  created_at?: InputMaybe<TimestamptzComparisonExp>;
  deleted_at?: InputMaybe<TimestamptzComparisonExp>;
  email?: InputMaybe<StringComparisonExp>;
  firebase_uid?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  recipes?: InputMaybe<RecipesBoolExp>;
  recipes_aggregate?: InputMaybe<RecipesAggregateBoolExp>;
};

/** unique or primary key constraints on table "users" */
export enum UsersConstraint {
  /** unique or primary key constraint on columns "email" */
  USERS_EMAIL_KEY = 'users_email_key',
  /** unique or primary key constraint on columns "id" */
  USERS_PKEY = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type UsersInsertInput = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firebase_uid?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  recipes?: InputMaybe<RecipesArrRelInsertInput>;
};

/** aggregate max on columns */
export type UsersMaxFields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firebase_uid?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type UsersMinFields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  deleted_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firebase_uid?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "users" */
export type UsersMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type UsersObjRelInsertInput = {
  data: UsersInsertInput;
  /** upsert condition */
  on_conflict?: InputMaybe<UsersOnConflict>;
};

/** on_conflict condition type for table "users" */
export type UsersOnConflict = {
  constraint: UsersConstraint;
  update_columns?: Array<UsersUpdateColumn>;
  where?: InputMaybe<UsersBoolExp>;
};

/** Ordering options when selecting data from "users". */
export type UsersOrderBy = {
  created_at?: InputMaybe<OrderBy>;
  deleted_at?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  firebase_uid?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  recipes_aggregate?: InputMaybe<RecipesAggregateOrderBy>;
};

/** primary key columns input for table: users */
export type UsersPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "users" */
export enum UsersSelectColumn {
  /** column name */
  CREATED_AT = 'created_at',
  /** column name */
  DELETED_AT = 'deleted_at',
  /** column name */
  EMAIL = 'email',
  /** column name */
  FIREBASE_UID = 'firebase_uid',
  /** column name */
  ID = 'id',
  /** column name */
  NAME = 'name'
}

/** input type for updating data in table "users" */
export type UsersSetInput = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firebase_uid?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "users" */
export type UsersStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: UsersStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UsersStreamCursorValueInput = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firebase_uid?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "users" */
export enum UsersUpdateColumn {
  /** column name */
  CREATED_AT = 'created_at',
  /** column name */
  DELETED_AT = 'deleted_at',
  /** column name */
  EMAIL = 'email',
  /** column name */
  FIREBASE_UID = 'firebase_uid',
  /** column name */
  ID = 'id',
  /** column name */
  NAME = 'name'
}

export type UsersUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UsersSetInput>;
  /** filter the rows which have to be updated */
  where: UsersBoolExp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type UuidComparisonExp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

export type BaseRecipeFragment = { id: string, title: string, type: any, notes?: string | null, complexity: any, portion_size?: number | null, cooking_time?: number | null, video_url?: string | null, image_url?: string | null };

export type RecipeIngredientFragment = { amount?: string | null, ingredient: { id: string, name: string } };

export type RecipeFragment = { steps: Array<string>, tags: Array<any>, owner_id?: string | null, id: string, title: string, type: any, notes?: string | null, complexity: any, portion_size?: number | null, cooking_time?: number | null, video_url?: string | null, image_url?: string | null, recipe_ingredients: Array<{ amount?: string | null, ingredient: { id: string, name: string } }> };

export type UserFragment = { id: string, email: string, name: string, created_at: string };

export type AddRecipeMutationVariables = Exact<{
  recipe: RecipesInsertInput;
}>;


export type AddRecipeMutation = { insert_recipes_one?: { steps: Array<string>, tags: Array<any>, owner_id?: string | null, id: string, title: string, type: any, notes?: string | null, complexity: any, portion_size?: number | null, cooking_time?: number | null, video_url?: string | null, image_url?: string | null, recipe_ingredients: Array<{ amount?: string | null, ingredient: { id: string, name: string } }> } | null };

export type AddUserIngredientMutationVariables = Exact<{
  user_id: Scalars['uuid']['input'];
  ingredient_name: Scalars['String']['input'];
}>;


export type AddUserIngredientMutation = { insert_user_ingredients_one?: { id: string, ingredient: { id: string, name: string } } | null };

export type CreateUserMutationVariables = Exact<{
  user: UsersInsertInput;
}>;


export type CreateUserMutation = { insert_users_one?: { id: string, email: string, name: string, created_at: string } | null };

export type DeleteRecipeMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type DeleteRecipeMutation = { delete_recipes_by_pk?: { id: string, title: string } | null };

export type RemoveUserIngredientMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type RemoveUserIngredientMutation = { delete_user_ingredients_by_pk?: { id: string, ingredient: { name: string } } | null };

export type UpdateRecipeMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  recipe: RecipesSetInput;
}>;


export type UpdateRecipeMutation = { update_recipes_by_pk?: { steps: Array<string>, tags: Array<any>, owner_id?: string | null, id: string, title: string, type: any, notes?: string | null, complexity: any, portion_size?: number | null, cooking_time?: number | null, video_url?: string | null, image_url?: string | null, recipe_ingredients: Array<{ amount?: string | null, ingredient: { id: string, name: string } }> } | null };

export type UpdateRecipeIngredientsMutationVariables = Exact<{
  oldIngredients?: Array<Scalars['uuid']['input']> | Scalars['uuid']['input'];
  newIngredients?: Array<RecipeIngredientsInsertInput> | RecipeIngredientsInsertInput;
  recipeId: Scalars['uuid']['input'];
}>;


export type UpdateRecipeIngredientsMutation = { delete_recipe_ingredients?: { affected_rows: number } | null, insert_recipe_ingredients?: { affected_rows: number } | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  user: UsersSetInput;
}>;


export type UpdateUserMutation = { update_users_by_pk?: { id: string, email: string, name: string, created_at: string } | null };

export type GetAllIngredientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllIngredientsQuery = { ingredients: Array<{ id: string, name: string }> };

export type GetRecipeByIdQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
}>;


export type GetRecipeByIdQuery = { recipes_by_pk?: { missing_ingredients_count?: number | null, steps: Array<string>, tags: Array<any>, owner_id?: string | null, id: string, title: string, type: any, notes?: string | null, complexity: any, portion_size?: number | null, cooking_time?: number | null, video_url?: string | null, image_url?: string | null, missing_ingredients?: Array<{ ingredient: { name: string } }> | null, recipe_ingredients: Array<{ amount?: string | null, ingredient: { id: string, name: string } }> } | null };

export type GetRecipesQueryVariables = Exact<{
  owner_id: Scalars['uuid']['input'];
}>;


export type GetRecipesQuery = { recipes: Array<{ missing_ingredients_count?: number | null, steps: Array<string>, tags: Array<any>, owner_id?: string | null, id: string, title: string, type: any, notes?: string | null, complexity: any, portion_size?: number | null, cooking_time?: number | null, video_url?: string | null, image_url?: string | null, recipe_ingredients: Array<{ amount?: string | null, ingredient: { id: string, name: string } }> }> };

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetUserByEmailQuery = { users: Array<{ id: string, email: string, name: string, created_at: string }> };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type GetUserByIdQuery = { users_by_pk?: { id: string, email: string, name: string, created_at: string } | null };

export type GetUserIngredientsQueryVariables = Exact<{
  user_id: Scalars['uuid']['input'];
}>;


export type GetUserIngredientsQuery = { user_ingredients: Array<{ id: string, ingredient: { id: string, name: string } }> };

export const BaseRecipeFragmentDoc = gql`
    fragment BaseRecipe on recipes {
  id
  title
  type
  notes
  complexity
  portion_size
  cooking_time
  video_url
  image_url
}
    `;
export const RecipeIngredientFragmentDoc = gql`
    fragment RecipeIngredient on recipe_ingredients {
  ingredient {
    id
    name
  }
  amount
}
    `;
export const RecipeFragmentDoc = gql`
    fragment Recipe on recipes {
  ...BaseRecipe
  recipe_ingredients {
    ...RecipeIngredient
  }
  steps
  tags
  owner_id
}
    ${BaseRecipeFragmentDoc}
${RecipeIngredientFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on users {
  id
  email
  name
  created_at
}
    `;
export const AddRecipeDocument = gql`
    mutation AddRecipe($recipe: recipes_insert_input!) {
  insert_recipes_one(object: $recipe) {
    ...Recipe
  }
}
    ${RecipeFragmentDoc}`;
export type AddRecipeMutationFn = Apollo.MutationFunction<AddRecipeMutation, AddRecipeMutationVariables>;

/**
 * __useAddRecipeMutation__
 *
 * To run a mutation, you first call `useAddRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRecipeMutation, { data, loading, error }] = useAddRecipeMutation({
 *   variables: {
 *      recipe: // value for 'recipe'
 *   },
 * });
 */
export function useAddRecipeMutation(baseOptions?: Apollo.MutationHookOptions<AddRecipeMutation, AddRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddRecipeMutation, AddRecipeMutationVariables>(AddRecipeDocument, options);
      }
export type AddRecipeMutationHookResult = ReturnType<typeof useAddRecipeMutation>;
export type AddRecipeMutationResult = Apollo.MutationResult<AddRecipeMutation>;
export type AddRecipeMutationOptions = Apollo.BaseMutationOptions<AddRecipeMutation, AddRecipeMutationVariables>;
export const AddUserIngredientDocument = gql`
    mutation AddUserIngredient($user_id: uuid!, $ingredient_name: String!) {
  insert_user_ingredients_one(
    object: {user_id: $user_id, ingredient: {data: {name: $ingredient_name}, on_conflict: {constraint: ingredients_name_key, update_columns: [name]}}}
  ) {
    id
    ingredient {
      id
      name
    }
  }
}
    `;
export type AddUserIngredientMutationFn = Apollo.MutationFunction<AddUserIngredientMutation, AddUserIngredientMutationVariables>;

/**
 * __useAddUserIngredientMutation__
 *
 * To run a mutation, you first call `useAddUserIngredientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserIngredientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserIngredientMutation, { data, loading, error }] = useAddUserIngredientMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      ingredient_name: // value for 'ingredient_name'
 *   },
 * });
 */
export function useAddUserIngredientMutation(baseOptions?: Apollo.MutationHookOptions<AddUserIngredientMutation, AddUserIngredientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserIngredientMutation, AddUserIngredientMutationVariables>(AddUserIngredientDocument, options);
      }
export type AddUserIngredientMutationHookResult = ReturnType<typeof useAddUserIngredientMutation>;
export type AddUserIngredientMutationResult = Apollo.MutationResult<AddUserIngredientMutation>;
export type AddUserIngredientMutationOptions = Apollo.BaseMutationOptions<AddUserIngredientMutation, AddUserIngredientMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($user: users_insert_input!) {
  insert_users_one(object: $user) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteRecipeDocument = gql`
    mutation DeleteRecipe($id: uuid!) {
  delete_recipes_by_pk(id: $id) {
    id
    title
  }
}
    `;
export type DeleteRecipeMutationFn = Apollo.MutationFunction<DeleteRecipeMutation, DeleteRecipeMutationVariables>;

/**
 * __useDeleteRecipeMutation__
 *
 * To run a mutation, you first call `useDeleteRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRecipeMutation, { data, loading, error }] = useDeleteRecipeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRecipeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRecipeMutation, DeleteRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRecipeMutation, DeleteRecipeMutationVariables>(DeleteRecipeDocument, options);
      }
export type DeleteRecipeMutationHookResult = ReturnType<typeof useDeleteRecipeMutation>;
export type DeleteRecipeMutationResult = Apollo.MutationResult<DeleteRecipeMutation>;
export type DeleteRecipeMutationOptions = Apollo.BaseMutationOptions<DeleteRecipeMutation, DeleteRecipeMutationVariables>;
export const RemoveUserIngredientDocument = gql`
    mutation RemoveUserIngredient($id: uuid!) {
  delete_user_ingredients_by_pk(id: $id) {
    id
    ingredient {
      name
    }
  }
}
    `;
export type RemoveUserIngredientMutationFn = Apollo.MutationFunction<RemoveUserIngredientMutation, RemoveUserIngredientMutationVariables>;

/**
 * __useRemoveUserIngredientMutation__
 *
 * To run a mutation, you first call `useRemoveUserIngredientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserIngredientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserIngredientMutation, { data, loading, error }] = useRemoveUserIngredientMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveUserIngredientMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserIngredientMutation, RemoveUserIngredientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserIngredientMutation, RemoveUserIngredientMutationVariables>(RemoveUserIngredientDocument, options);
      }
export type RemoveUserIngredientMutationHookResult = ReturnType<typeof useRemoveUserIngredientMutation>;
export type RemoveUserIngredientMutationResult = Apollo.MutationResult<RemoveUserIngredientMutation>;
export type RemoveUserIngredientMutationOptions = Apollo.BaseMutationOptions<RemoveUserIngredientMutation, RemoveUserIngredientMutationVariables>;
export const UpdateRecipeDocument = gql`
    mutation UpdateRecipe($id: uuid!, $recipe: recipes_set_input!) {
  update_recipes_by_pk(pk_columns: {id: $id}, _set: $recipe) {
    ...Recipe
  }
}
    ${RecipeFragmentDoc}`;
export type UpdateRecipeMutationFn = Apollo.MutationFunction<UpdateRecipeMutation, UpdateRecipeMutationVariables>;

/**
 * __useUpdateRecipeMutation__
 *
 * To run a mutation, you first call `useUpdateRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRecipeMutation, { data, loading, error }] = useUpdateRecipeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      recipe: // value for 'recipe'
 *   },
 * });
 */
export function useUpdateRecipeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRecipeMutation, UpdateRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRecipeMutation, UpdateRecipeMutationVariables>(UpdateRecipeDocument, options);
      }
export type UpdateRecipeMutationHookResult = ReturnType<typeof useUpdateRecipeMutation>;
export type UpdateRecipeMutationResult = Apollo.MutationResult<UpdateRecipeMutation>;
export type UpdateRecipeMutationOptions = Apollo.BaseMutationOptions<UpdateRecipeMutation, UpdateRecipeMutationVariables>;
export const UpdateRecipeIngredientsDocument = gql`
    mutation UpdateRecipeIngredients($oldIngredients: [uuid!]! = [], $newIngredients: [recipe_ingredients_insert_input!]! = [], $recipeId: uuid!) {
  delete_recipe_ingredients(
    where: {recipe_id: {_eq: $recipeId}, ingredient_id: {_in: $oldIngredients}}
  ) {
    affected_rows
  }
  insert_recipe_ingredients(objects: $newIngredients) {
    affected_rows
  }
}
    `;
export type UpdateRecipeIngredientsMutationFn = Apollo.MutationFunction<UpdateRecipeIngredientsMutation, UpdateRecipeIngredientsMutationVariables>;

/**
 * __useUpdateRecipeIngredientsMutation__
 *
 * To run a mutation, you first call `useUpdateRecipeIngredientsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRecipeIngredientsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRecipeIngredientsMutation, { data, loading, error }] = useUpdateRecipeIngredientsMutation({
 *   variables: {
 *      oldIngredients: // value for 'oldIngredients'
 *      newIngredients: // value for 'newIngredients'
 *      recipeId: // value for 'recipeId'
 *   },
 * });
 */
export function useUpdateRecipeIngredientsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRecipeIngredientsMutation, UpdateRecipeIngredientsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRecipeIngredientsMutation, UpdateRecipeIngredientsMutationVariables>(UpdateRecipeIngredientsDocument, options);
      }
export type UpdateRecipeIngredientsMutationHookResult = ReturnType<typeof useUpdateRecipeIngredientsMutation>;
export type UpdateRecipeIngredientsMutationResult = Apollo.MutationResult<UpdateRecipeIngredientsMutation>;
export type UpdateRecipeIngredientsMutationOptions = Apollo.BaseMutationOptions<UpdateRecipeIngredientsMutation, UpdateRecipeIngredientsMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: uuid!, $user: users_set_input!) {
  update_users_by_pk(pk_columns: {id: $id}, _set: $user) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetAllIngredientsDocument = gql`
    query GetAllIngredients {
  ingredients(order_by: {name: asc}) {
    id
    name
  }
}
    `;

/**
 * __useGetAllIngredientsQuery__
 *
 * To run a query within a React component, call `useGetAllIngredientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllIngredientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllIngredientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllIngredientsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllIngredientsQuery, GetAllIngredientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllIngredientsQuery, GetAllIngredientsQueryVariables>(GetAllIngredientsDocument, options);
      }
export function useGetAllIngredientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllIngredientsQuery, GetAllIngredientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllIngredientsQuery, GetAllIngredientsQueryVariables>(GetAllIngredientsDocument, options);
        }
export function useGetAllIngredientsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllIngredientsQuery, GetAllIngredientsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllIngredientsQuery, GetAllIngredientsQueryVariables>(GetAllIngredientsDocument, options);
        }
export type GetAllIngredientsQueryHookResult = ReturnType<typeof useGetAllIngredientsQuery>;
export type GetAllIngredientsLazyQueryHookResult = ReturnType<typeof useGetAllIngredientsLazyQuery>;
export type GetAllIngredientsSuspenseQueryHookResult = ReturnType<typeof useGetAllIngredientsSuspenseQuery>;
export type GetAllIngredientsQueryResult = Apollo.QueryResult<GetAllIngredientsQuery, GetAllIngredientsQueryVariables>;
export const GetRecipeByIdDocument = gql`
    query GetRecipeById($id: uuid!, $userId: uuid!) {
  recipes_by_pk(id: $id) {
    ...Recipe
    missing_ingredients_count(args: {user_id: $userId})
    missing_ingredients(args: {user_id: $userId}) {
      ingredient {
        name
      }
    }
  }
}
    ${RecipeFragmentDoc}`;

/**
 * __useGetRecipeByIdQuery__
 *
 * To run a query within a React component, call `useGetRecipeByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipeByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipeByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetRecipeByIdQuery(baseOptions: Apollo.QueryHookOptions<GetRecipeByIdQuery, GetRecipeByIdQueryVariables> & ({ variables: GetRecipeByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>(GetRecipeByIdDocument, options);
      }
export function useGetRecipeByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>(GetRecipeByIdDocument, options);
        }
export function useGetRecipeByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>(GetRecipeByIdDocument, options);
        }
export type GetRecipeByIdQueryHookResult = ReturnType<typeof useGetRecipeByIdQuery>;
export type GetRecipeByIdLazyQueryHookResult = ReturnType<typeof useGetRecipeByIdLazyQuery>;
export type GetRecipeByIdSuspenseQueryHookResult = ReturnType<typeof useGetRecipeByIdSuspenseQuery>;
export type GetRecipeByIdQueryResult = Apollo.QueryResult<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>;
export const GetRecipesDocument = gql`
    query GetRecipes($owner_id: uuid!) {
  recipes(where: {owner_id: {_eq: $owner_id}}, order_by: {created_at: desc}) {
    ...Recipe
    missing_ingredients_count(args: {user_id: $owner_id})
  }
}
    ${RecipeFragmentDoc}`;

/**
 * __useGetRecipesQuery__
 *
 * To run a query within a React component, call `useGetRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipesQuery({
 *   variables: {
 *      owner_id: // value for 'owner_id'
 *   },
 * });
 */
export function useGetRecipesQuery(baseOptions: Apollo.QueryHookOptions<GetRecipesQuery, GetRecipesQueryVariables> & ({ variables: GetRecipesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecipesQuery, GetRecipesQueryVariables>(GetRecipesDocument, options);
      }
export function useGetRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipesQuery, GetRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecipesQuery, GetRecipesQueryVariables>(GetRecipesDocument, options);
        }
export function useGetRecipesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRecipesQuery, GetRecipesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRecipesQuery, GetRecipesQueryVariables>(GetRecipesDocument, options);
        }
export type GetRecipesQueryHookResult = ReturnType<typeof useGetRecipesQuery>;
export type GetRecipesLazyQueryHookResult = ReturnType<typeof useGetRecipesLazyQuery>;
export type GetRecipesSuspenseQueryHookResult = ReturnType<typeof useGetRecipesSuspenseQuery>;
export type GetRecipesQueryResult = Apollo.QueryResult<GetRecipesQuery, GetRecipesQueryVariables>;
export const GetUserByEmailDocument = gql`
    query GetUserByEmail($email: String!) {
  users(where: {email: {_eq: $email}}) {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetUserByEmailQuery__
 *
 * To run a query within a React component, call `useGetUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetUserByEmailQuery(baseOptions: Apollo.QueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables> & ({ variables: GetUserByEmailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
      }
export function useGetUserByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
        }
export function useGetUserByEmailSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
        }
export type GetUserByEmailQueryHookResult = ReturnType<typeof useGetUserByEmailQuery>;
export type GetUserByEmailLazyQueryHookResult = ReturnType<typeof useGetUserByEmailLazyQuery>;
export type GetUserByEmailSuspenseQueryHookResult = ReturnType<typeof useGetUserByEmailSuspenseQuery>;
export type GetUserByEmailQueryResult = Apollo.QueryResult<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: uuid!) {
  users_by_pk(id: $id) {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables> & ({ variables: GetUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export function useGetUserByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetUserIngredientsDocument = gql`
    query GetUserIngredients($user_id: uuid!) {
  user_ingredients(where: {user_id: {_eq: $user_id}}) {
    id
    ingredient {
      id
      name
    }
  }
}
    `;

/**
 * __useGetUserIngredientsQuery__
 *
 * To run a query within a React component, call `useGetUserIngredientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserIngredientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserIngredientsQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useGetUserIngredientsQuery(baseOptions: Apollo.QueryHookOptions<GetUserIngredientsQuery, GetUserIngredientsQueryVariables> & ({ variables: GetUserIngredientsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserIngredientsQuery, GetUserIngredientsQueryVariables>(GetUserIngredientsDocument, options);
      }
export function useGetUserIngredientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserIngredientsQuery, GetUserIngredientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserIngredientsQuery, GetUserIngredientsQueryVariables>(GetUserIngredientsDocument, options);
        }
export function useGetUserIngredientsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserIngredientsQuery, GetUserIngredientsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserIngredientsQuery, GetUserIngredientsQueryVariables>(GetUserIngredientsDocument, options);
        }
export type GetUserIngredientsQueryHookResult = ReturnType<typeof useGetUserIngredientsQuery>;
export type GetUserIngredientsLazyQueryHookResult = ReturnType<typeof useGetUserIngredientsLazyQuery>;
export type GetUserIngredientsSuspenseQueryHookResult = ReturnType<typeof useGetUserIngredientsSuspenseQuery>;
export type GetUserIngredientsQueryResult = Apollo.QueryResult<GetUserIngredientsQuery, GetUserIngredientsQueryVariables>;