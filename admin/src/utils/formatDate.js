import { format } from 'date-fns'

export const formatDate = dateTime => {
  return format(new Date(dateTime), 'dd/MM/uuuu, HH:mm')
}
