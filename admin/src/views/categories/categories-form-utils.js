import * as yup from 'yup'

export const validationSchema = yup.object({
  title: yup.string().label('Nomi').required('Categoriya nomini kiriting'),
  description: yup.string().max(280).label('Tasvifi').required('Categoriya tasvifini kiriting!'),
  imageUrl: yup.string().label('Rasmi'),
  tag: yup.object().nullable().label('Teg')
})

export const initialValues = {
  title: '',
  description: '',
  imageUrl: '',
  tag: ''
}
