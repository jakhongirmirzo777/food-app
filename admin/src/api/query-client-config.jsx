// ** React Imports
import { useState } from 'react'

// ** Utils Imports
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import PropTypes from 'prop-types'

const CACHE_STALE_TIME = 5 * 60 * 1000 // 5 minutes

const QueryClientConfig = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            staleTime: CACHE_STALE_TIME
          }
        }
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

QueryClientConfig.propTypes = {
  children: PropTypes.node
}

export default QueryClientConfig
