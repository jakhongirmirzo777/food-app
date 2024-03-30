import axios from 'axios'

import { refresh } from './services/admins'

const baseURL = process.env.NEXT_PUBLIC_API_GATEWAY

axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true
axios.defaults.headers['ngrok-skip-browser-warning'] = 'true'

const privateAxios = axios.create()

export const setupAxiosInterceptors = handleRefetchTokenFail => {
  privateAxios.interceptors.request.use(
    async config => {
      const token = localStorage.getItem('access_token')

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  let refreshPromise = null
  const clearPromise = () => (refreshPromise = null)

  privateAxios.interceptors.response.use(
    response => {
      return response
    },
    async error => {
      const config = error.config

      if (error.response.status === 401) {
        if (!refreshPromise) {
          refreshPromise = refresh().catch(handleRefetchTokenFail).finally(clearPromise)
        }

        const tokenResponse = await refreshPromise
        const { accessToken } = tokenResponse.data
        localStorage.setItem('access_token', accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`

        return privateAxios(config)
      }

      return Promise.reject(error)
    }
  )
}

export default privateAxios

// Axios instance without auth check
const publicAxios = axios.create({
  baseURL
})

export { publicAxios }
