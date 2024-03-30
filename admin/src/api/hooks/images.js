import { useMutation } from 'react-query'
import { uploadImage } from '../services/images'

export const useUploadImage = () => {
  return useMutation(data => uploadImage(data))
}
