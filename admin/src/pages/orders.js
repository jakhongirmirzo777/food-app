import dynamic from 'next/dynamic'

// ! To avoid 'Window is not defined' error
const OrdersBoard = dynamic(() => import('src/views/orders/OrdersBoard'), {
  ssr: false
})

import OrderFilters from 'src/views/orders/OrderFilters'

import { useDateRangeFilter } from 'src/views/orders/use-date-range-filter'
import OrderCreateUpdateDialog from '../views/orders/order-create-update-dialog/OrderCreateUpdateDialog'
import { useState } from 'react'

const OrdersPage = () => {
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

export default OrdersPage
