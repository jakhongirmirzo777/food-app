import { useQuery } from 'react-query'
import { QUERY_STATISTICS } from '../query-keys'
import { getStatistics } from '../services/dashboard'

export const useGetStatistics = params => {
  return useQuery([QUERY_STATISTICS, params], () => getStatistics(params.startDate, params.endDate))
}
