// ** API Imports
import axios from '../axios'

export async function getOrders(startDate, endDate) {
  
  
  const params = {}

  if (startDate) {
    params.startDate = new Date(startDate).toISOString();
  }
  if (endDate) {
    params.endDate = new Date(endDate).toISOString();
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
  return await axios.patch(`/orders/${orderId}`, { status })
}
