// ** API Imports
import axios from '../axios'

export async function uploadImage(data) {
  return await axios.post('/image/upload', data)
}
