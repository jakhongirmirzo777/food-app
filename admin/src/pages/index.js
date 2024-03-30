import dynamic from 'next/dynamic'

// ! To avoid 'Window is not defined' error
const OrdersBoard = dynamic(() => import('src/views/main/OrdersBoard'), {
  ssr: false
})

import OrderFilters from 'src/views/main/OrderFilters'

import { useDateRangeFilter } from 'src/views/main/use-date-range-filter'

const MainPage = () => {
  const { range, handleRangeChange } = useDateRangeFilter()

  return (
    <>
      <OrderFilters range={range} handleRangeChange={handleRangeChange} />
      <OrdersBoard dateRange={range} />
    </>
  )
}

export default MainPage
