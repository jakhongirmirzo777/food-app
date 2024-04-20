import dynamic from 'next/dynamic'

// ! To avoid 'Window is not defined' error
const OrdersBoard = dynamic(() => import('src/views/main/OrdersBoard'), {
  ssr: false
})

import OrderFilters from 'src/views/main/OrderFilters'

import { useDateRangeFilter } from 'src/views/main/use-date-range-filter'

const MainPage = () => {
  const { search, range, handleRangeChange, handleSearchChange } = useDateRangeFilter()

  return (
    <>
      <OrderFilters
        search={search}
        range={range}
        handleRangeChange={handleRangeChange}
        handleSearchChange={handleSearchChange}
      />
      <OrdersBoard search={search} dateRange={range} />
    </>
  )
}

export default MainPage
