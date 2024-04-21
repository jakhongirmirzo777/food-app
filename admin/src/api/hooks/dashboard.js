import { useQuery } from 'react-query'
import { QUERY_ORDER, QUERY_STATISTICS } from '../query-keys'
import { getStatistics } from '../services/dashboard'
import { getOrder } from '../services/orders'

export const useGetStatistics = ({ startDate, endDate }) => {
  return useQuery([QUERY_STATISTICS], () => getStatistics(startDate, endDate))
}
