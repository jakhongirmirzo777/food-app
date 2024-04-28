import * as yup from 'yup'

export const validationSchema = yup.object({
  title: yup.string().label('Nomi').required('Taom nomini kiriting'),
  description: yup.string().max(280).label('Tasvifi'),
  imageUrl: yup.string().label('Rasmi'),
  category: yup.object().required('Categoriyni tanlang').label('Categoriya'),
  price: yup.number().typeError("Narxni tog'ri kiriting").required('Taom narxini kiriting')
})

export const initialValues = {
  title: '',
  description: '',
  imageUrl: '',
  category: '',
  price: ''
}
