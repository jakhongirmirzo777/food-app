import { useQuery, useMutation, useQueryClient } from 'react-query'
import { QUERY_MEALS } from '../query-keys'
import { getMeals, addMeal, updateMeal, deleteMeal } from '../services/meals'

export const useGetMeals = ({ offset, search }) => {
  return useQuery([QUERY_MEALS, offset, search], () => getMeals({ offset, search }))
}

export const useAddMeal = () => {
  const queryClient = useQueryClient()

  return useMutation(data => addMeal(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_MEALS)
    }
  })
}

export const useUpdateMeal = () => {
  const queryClient = useQueryClient()

  return useMutation(({ mealId, data }) => updateMeal(mealId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_MEALS)
    }
  })
}

export const useDeleteMeal = () => {
  const queryClient = useQueryClient()

  return useMutation(mealId => deleteMeal(mealId), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_MEALS)
    }
  })
}
