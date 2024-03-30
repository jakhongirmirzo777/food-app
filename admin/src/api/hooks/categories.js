import { useQuery, useMutation, useQueryClient } from 'react-query'
import { QUERY_CATEGORIES } from '../query-keys'
import { getCategories, addCategory, updateCategory, deleteCategory } from '../services/categories'

export const useGetCategories = options => {
  return useQuery([QUERY_CATEGORIES], () => getCategories(), options)
}

export const useAddCategory = () => {
  const queryClient = useQueryClient()

  return useMutation(data => addCategory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_CATEGORIES)
    }
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation(({ categoryId, data }) => updateCategory(categoryId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_CATEGORIES)
    }
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation(categoryId => deleteCategory(categoryId), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_CATEGORIES)
    }
  })
}
