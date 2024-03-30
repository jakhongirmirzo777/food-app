import { useQuery, useMutation, useQueryClient } from 'react-query'
import { QUERY_CURRENT_ADMIN, QUERY_ADMINS } from '../query-keys'
import { getCurrentAdmin, getAdmins, addAdmin, updateAdmin, deleteAdmin } from '../services/admins'

export const useGetCurrentAdmin = options => {
  return useQuery([QUERY_CURRENT_ADMIN], getCurrentAdmin, {
    enabled: false,
    staleTime: 0,
    ...options
  })
}

export const useGetAdmins = options => {
  return useQuery([QUERY_ADMINS], () => getAdmins(), options)
}

export const useAddAdmin = () => {
  const queryClient = useQueryClient()

  return useMutation(data => addAdmin(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_ADMINS)
    }
  })
}

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient()

  return useMutation(({ adminId, data }) => updateAdmin(adminId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_ADMINS)
    }
  })
}

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient()

  return useMutation(adminId => deleteAdmin(adminId), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_ADMINS)
    }
  })
}
