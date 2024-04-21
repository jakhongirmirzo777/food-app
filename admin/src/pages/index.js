import dynamic from 'next/dynamic'

// ! To avoid 'Window is not defined' error
const OrdersBoard = dynamic(() => import('src/views/main/OrdersBoard'), {
  ssr: false
})

import OrderFilters from 'src/views/main/OrderFilters'

import { useDateRangeFilter } from 'src/views/main/use-date-range-filter'
import OrderCreateUpdateDialog from '../views/main/order-create-update-dialog/OrderCreateUpdateDialog'
import { useState } from 'react'

const MainPage = () => {
  const { search, searchQuery, range, handleRangeChange, handleSearchChange, handleSearchQueryChange } =
    useDateRangeFilter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <OrderFilters
        search={search}
        range={range}
        handleRangeChange={handleRangeChange}
        handleSearchChange={handleSearchChange}
        handleSearchQueryChange={handleSearchQueryChange}
        setOrderCreateDialogOpen={setIsDialogOpen}
      />
      <OrdersBoard searchQuery={searchQuery} dateRange={range} />
      <OrderCreateUpdateDialog data={null} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
    </>
  )
}

export default MainPage
