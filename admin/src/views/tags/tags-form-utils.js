import * as yup from 'yup'

export const validationSchema = yup.object({
  title: yup.string().label('Nomi').required('Teg nomini kiriting')
})

export const initialValues = {
  title: ''
}
