// ** Next Imports
import { useRouter } from 'next/router'

// ** React Imports
import { useState, useEffect } from 'react'

// ** Utils Imports
import { updateURLqueries } from 'src/utils/url-queries'
import debounce from 'lodash.debounce'

import { format, startOfToday, endOfToday } from 'date-fns'

export const getValueFromUrl = queryObject => {
  const { startDate, endDate } = queryObject

  const start = startDate ? new Date(startDate) : startOfToday()
  const end = endDate ? new Date(endDate) : endOfToday()

  return {
    startDate: start,
    endDate: end
  }
}

export const useDateRangeFilter = () => {
  const router = useRouter()

  const [search, setSearch] = useState(router.query?.search || '')
  const [range, setRange] = useState(getValueFromUrl(router.query))

  useEffect(() => {
    if (router.isReady) {
      setRange(getValueFromUrl(router.query))
      setSearch(router.query?.search || '')
    }
  }, [router.isReady, router.query])

  const handleRangeChange = newValue => {
    setRange(newValue)

    updateURLqueries(router, {
      startDate: format(newValue.startDate, "yyyy-MM-dd'T'HH:mm:ss"),
      endDate: format(newValue.endDate, "yyyy-MM-dd'T'HH:mm:ss")
    })
  }

  const handleSearchChange = newValue => {
    setSearch(newValue)

    // debounce(() => {
    //   updateURLqueries(router, {
    //     search: newValue
    //   })
    // }, 300)

    updateURLqueries(router, {
      search: newValue
    })
  }

  return { search, range, handleRangeChange, handleSearchChange }
}
