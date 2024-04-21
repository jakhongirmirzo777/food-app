import { useQuery, useMutation, useQueryClient } from 'react-query'
import { QUERY_ORDERS, QUERY_ORDER, QUERY_STATISTICS } from '../query-keys'
import {
  getOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
  resetCounterOrder,
  updateOrder,
  addOrder
} from '../services/orders'

export const useGetOrders = params => {
  return useQuery([QUERY_ORDERS, params], () => getOrders(params.startDate, params.endDate, params.search), {
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
    ({ orderId, formData }) => {
      queryClient.cancelQueries(QUERY_ORDER)

      return updateOrder(orderId, formData)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_ORDER)
        queryClient.invalidateQueries(QUERY_ORDERS)
        queryClient.invalidateQueries(QUERY_STATISTICS)
      }
    }
  )
}

export const useAddOrder = () => {
  const queryClient = useQueryClient()

  return useMutation(
    formData => {
      queryClient.cancelQueries(QUERY_ORDERS)

      return addOrder(formData)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_ORDERS)
        queryClient.invalidateQueries(QUERY_STATISTICS)
      }
    }
  )
}

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ({ orderId, status }) => {
      queryClient.cancelQueries(QUERY_ORDERS)

      return updateOrderStatus(orderId, status)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_ORDERS)
        queryClient.invalidateQueries(QUERY_STATISTICS)
      }
    }
  )
}

export const useResetCounterOrder = () => {
  const queryClient = useQueryClient()

  return useMutation(
    () => {
      queryClient.cancelQueries(QUERY_ORDERS)

      return resetCounterOrder()
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_ORDERS)
      }
    }
  )
}

export const useDeleteOrder = () => {
  const queryClient = useQueryClient()

  return useMutation(orderId => deleteOrder(orderId), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_ORDERS)
    }
  })
}
