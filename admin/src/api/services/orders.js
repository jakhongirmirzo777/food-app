// ** API Imports
import axios from '../axios'
import { useResetCounterOrder } from '../hooks/orders'

export async function getOrders(startDate, endDate, search) {
  const params = {}

  if (startDate) {
    params.startDate = new Date(startDate).toISOString()
  }
  if (endDate) {
    params.endDate = new Date(endDate).toISOString()
  }
  if (search) {
    params.search = search
  }

  const res = await axios.get('/orders', {
    params: new URLSearchParams(params)
  })

  return res.data
}

export async function getOrder(orderId) {
  const res = await axios.get(`/orders/${orderId}`)

  return res.data
}

export async function updateOrderStatus(orderId, status) {
  return await axios.patch(`/orders/update-status/${orderId}`, { status })
}

export async function updateOrder(orderId, formData) {
  return await axios.patch(`/orders/${orderId}`, formData)
}

export async function addOrder(formData) {
  return await axios.post(`/orders`, formData)
}

export async function resetCounterOrder() {
  return await axios.post(`/orders/reset-counter`)
}

export async function deleteOrder(orderId) {
  return await axios.delete(`/orders/${orderId}`)
}
