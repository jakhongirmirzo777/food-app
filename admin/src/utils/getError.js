import get from 'lodash.get'

export const getError = (form, fieldName) => {
  return (get(form.touched, fieldName) && get(form.errors, fieldName)) || null
}
