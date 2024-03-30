import { useQuery, useMutation, useQueryClient } from 'react-query'
import { QUERY_ORDERS, QUERY_ORDER } from '../query-keys'
import { getOrders, getOrder, updateOrderStatus } from '../services/orders'

export const useGetOrders = params => {
  return useQuery([QUERY_ORDERS, params], () => getOrders(params.startDate, params.endDate), {
    refetchInterval: 10_000, // 10 seconds
    refetchIntervalInBackground: true
  })
}

export const useGetOrder = (orderId, options) => {
  return useQuery([QUERY_ORDER, orderId], () => getOrder(orderId), options)
}

export const useUpdateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ orderId, status }) => {
      queryClient.cancelQueries(QUERY_ORDERS)

      return updateOrderStatus(orderId, status)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_ORDERS)
      }
    }
  )
}
