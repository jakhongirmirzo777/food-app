// ** API Imports
import axios from '../axios'

export async function getCategories() {
  const res = await axios.get('/category')

  return res.data
}

export async function addCategory(data) {
  return await axios.post('/category', data)
}

export async function updateCategory(categoryId, data) {
  return await axios.patch(`/category/${categoryId}`, data)
}

export async function deleteCategory(categoryId) {
  return await axios.delete(`/category/${categoryId}`)
}
