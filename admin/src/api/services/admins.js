import axios, { publicAxios } from '../axios'

export async function login(data) {
  return await publicAxios.post('/login', data)
}

export async function refresh() {
  const userId = localStorage.getItem('user_id')

  return await publicAxios.get(`/login/${userId}/refresh`)
}

export async function getCurrentAdmin() {
  const res = await axios.get('/admins/me')

  return res.data
}

export async function getAdmins() {
  const res = await axios.get('/admins')

  return res.data
}

export async function addAdmin(data) {
  return await axios.post('/admins', data)
}

export async function updateAdmin(adminsId, data) {
  return await axios.patch(`/admins/${adminsId}`, data)
}

export async function deleteAdmin(adminsId) {
  return await axios.delete(`/admins/${adminsId}`)
}
