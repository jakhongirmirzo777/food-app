// ** API Imports
import axios from '../axios'

export async function getStatistics(startDate, endDate) {
  const params = {
    startDate,
    endDate
  }

  const res = await axios.get('/orders/statistics', {
    params: new URLSearchParams(params)
  })

  return res.data
}
