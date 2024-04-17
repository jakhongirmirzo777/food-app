// ** API Imports
import axios from '../axios'

// import { format } from 'date-fns'

export async function getOrders(startDate, endDate) {
  console.log(startDate, endDate)
  
  const params = {}

  if (startDate) {
    params.startDate = new Date(startDate).toISOString();
    // params.startDate = format(new Date(startDate), "yyyy-MM-dd'T'HH:mm:ss")
  }
  if (endDate) {
    params.endDate = new Date(endDate).toISOString();
    // params.endDate = format(new Date(endDate), "yyyy-MM-dd'T'HH:mm:ss")
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
