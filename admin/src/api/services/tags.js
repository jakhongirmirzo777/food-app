// ** API Imports
import axios from '../axios'

export async function getTags() {
  const res = await axios.get('/tags')

  return res.data
}

export async function addTag(data) {
  return await axios.post('/tags', data)
}

export async function updateTag(tagId, data) {
  return await axios.patch(`/tags/${tagId}`, data)
}

export async function deleteTag(tagId) {
  return await axios.delete(`/tags/${tagId}`)
}
