import { useQuery, useMutation, useQueryClient } from 'react-query'
import { QUERY_TAGS } from '../query-keys'
import { getTags, addTag, updateTag, deleteTag } from '../services/tags'

export const useGetTags = () => {
  return useQuery([QUERY_TAGS], () => getTags())
}

export const useAddTag = () => {
  const queryClient = useQueryClient()

  return useMutation(data => addTag(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_TAGS)
    }
  })
}

export const useUpdateTag = () => {
  const queryClient = useQueryClient()

  return useMutation(({ tagId, data }) => updateTag(tagId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_TAGS)
    }
  })
}

export const useDeleteTag = () => {
  const queryClient = useQueryClient()

  return useMutation(tagId => deleteTag(tagId), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_TAGS)
    }
  })
}
