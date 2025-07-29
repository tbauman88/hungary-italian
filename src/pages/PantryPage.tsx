import { AddIngredientList, PantryHeader, PantryList } from '../components'
import { useAuth } from '../contexts/AuthContext'
import {
  useAddUserIngredientMutation,
  useGetAllIngredientsQuery,
  useGetUserIngredientsQuery,
  useRemoveUserIngredientMutation
} from '../generated/graphql'


export const PantryPage = () => {
  const { currentUserId } = useAuth()

  const {
    data: userIngredients,
    loading: loadingUserIngredients,
    refetch: refetchUserIngredients
  } = useGetUserIngredientsQuery({
    variables: { user_id: currentUserId! },
    skip: !currentUserId
  })

  const {
    data: allIngredients,
    loading: loadingAllIngredients,
    refetch: refetchAllIngredients
  } = useGetAllIngredientsQuery({
    skip: !currentUserId
  })

  const [addIngredient, { loading: addingIngredient }] = useAddUserIngredientMutation()
  const [removeIngredient, { loading: removingIngredient }] = useRemoveUserIngredientMutation()

  const handleAddIngredient = async (ingredientNames?: string[]) => {
    if (!currentUserId || !ingredientNames || ingredientNames.length === 0) return

    try {
      const addPromises = ingredientNames.map(ingredientName =>
        addIngredient({
          variables: {
            user_id: currentUserId,
            ingredient_name: ingredientName.toLowerCase(),
          },
        })
      )

      await Promise.all(addPromises)
      refetchData()
    } catch (error) {
      console.error('Error adding ingredient:', error)
    }
  }

  const refetchData = () => {
    refetchUserIngredients()
    refetchAllIngredients()
  }

  const handleRemoveIngredient = async (ingredientId: string) => {
    try {
      await removeIngredient({ variables: { id: ingredientId } })
      refetchUserIngredients()
    } catch (error) {
      console.error('Error removing ingredient:', error)
    }
  }

  if (!currentUserId) return;

  return (
    <div className="min-h-screen">
      <PantryHeader />

      <div className="py-4 space-y-4">
        <PantryList
          userIngredients={userIngredients?.user_ingredients || []}
          loading={loadingUserIngredients}
          onRemoveIngredient={handleRemoveIngredient}
          removingIngredient={removingIngredient}
        />

        <AddIngredientList
          onAddIngredient={handleAddIngredient}
          allIngredients={allIngredients?.ingredients || []}
          loadingAllIngredients={loadingAllIngredients}
          addingIngredient={addingIngredient}
          userIngredients={userIngredients?.user_ingredients.map(ui => ui.ingredient) || []}
        />
      </div>
    </div>
  )
} 
