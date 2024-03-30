// ** Next Imports
import { useRouter } from 'next/router'

// ** React Imports
import { useState, useEffect } from 'react'

export const usePagination = (queryParamName = 'page') => {
  const router = useRouter()

  const initialPage = (!isNaN(router.query[queryParamName]) && +router.query[queryParamName]) || 0

  const [page, setPage] = useState(initialPage)

  useEffect(() => {
    if (router.isReady) {
      const initialPage = (!isNaN(router.query[queryParamName]) && +router.query[queryParamName]) || 0
      setPage(initialPage)
    }
  }, [router.isReady, router.query, queryParamName])

  const updatePage = newPage => {
    setPage(newPage)

    // Update url
    router.replace(
      {
        query: { ...router.query, [queryParamName]: newPage }
      },
      null,
      { shallow: true }
    )
  }

  return [page, updatePage]
}
