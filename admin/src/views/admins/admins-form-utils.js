import * as yup from 'yup'

export const validationSchema = yup.object({
  name: yup.string().label('Ismi').required('Ism ni kiriting'),
  login: yup.string().label('Login').required('Login ni kiriting'),
  password: yup.string().label('Parol').nullable()
})

export const initialValues = {
  name: '',
  login: '',
  password: ''
}
