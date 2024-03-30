// ** API Imports
import { PAGINATION_VALUE } from 'src/utils/constants/pagination'
import axios from '../axios'

export async function getMeals({ offset, search }) {
  const params = new URLSearchParams({
    title: search,
    offset,
    limit: PAGINATION_VALUE
  })

  const res = await axios.get('/meals', { params })

  return res.data
}

export async function addMeal(data) {
  return await axios.post('/meals', data)
}

export async function updateMeal(mealId, data) {
  return await axios.patch(`/meals/${mealId}`, data)
}

export async function deleteMeal(mealId) {
  return await axios.delete(`/meals/${mealId}`)
}
