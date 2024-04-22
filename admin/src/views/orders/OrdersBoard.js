import { useState, useEffect } from 'react'

import { Box } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

import BoardColumn from './BoardColumn'
import ReactSortableWrapperStyled from 'src/@core/styles/libs/react-sortable'

import { useGetOrders, useUpdateOrderStatus } from 'src/api/hooks/orders'

import { ORDER_STATUSES } from 'src/utils/constants/orders'

const boardColumnStyles = {
  px: 2,
  flex: '1 1 350px',
  minWidth: 350,

  '&:first-child': {
    pl: 0
  },
  '&:last-child': {
    pr: 0
  }
}

const OrdersBoard = ({ dateRange, searchQuery }) => {
  const [orders, setOrders] = useState({
    [ORDER_STATUSES.NEW]: [],
    [ORDER_STATUSES.PENDING]: [],
    [ORDER_STATUSES.COMPLETED]: [],
    [ORDER_STATUSES.REJECTED]: []
  })

  const { data, isLoading, isFetching } = useGetOrders({ ...dateRange, search: searchQuery })

  useEffect(() => {
    const filterByStatus = status => data?.filter(order => order.status === status) ?? []

    setOrders({
      [ORDER_STATUSES.NEW]: filterByStatus(ORDER_STATUSES.NEW),
      [ORDER_STATUSES.PENDING]: filterByStatus(ORDER_STATUSES.PENDING),
      [ORDER_STATUSES.COMPLETED]: filterByStatus(ORDER_STATUSES.COMPLETED),
      [ORDER_STATUSES.REJECTED]: filterByStatus(ORDER_STATUSES.REJECTED)
    })
  }, [data])

  const { mutate } = useUpdateOrderStatus()

  const handleChange = (status, data) => {
    const prevData = orders[status]

    setOrders(prevOrders => {
      return {
        ...prevOrders,
        [status]: data
      }
    })

    if (prevData.length < data.length) {
      const addedElement = data.filter(item1 => !prevData.find(item2 => item2.id === item1.id))
      mutate({
        orderId: addedElement[0].id,
        status
      })
    }
  }

  return (
    <>
      <Box sx={{ mb: 4 }}>
        {isFetching ? <LinearProgress sx={{ height: 4, borderRadius: 2 }} /> : <Box sx={{ height: 4 }} />}
      </Box>
      <ReactSortableWrapperStyled>
        <Box
          sx={{
            overflow: 'auto',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }}
        >
          <Box
            sx={{
              display: 'flex'
            }}
          >
            <Box sx={boardColumnStyles}>
              <BoardColumn
                title='Yangi'
                data={orders[ORDER_STATUSES.NEW]}
                isLoading={isLoading}
                onChange={handleChange.bind(null, ORDER_STATUSES.NEW)}
                borderColor='info.main'
              />
            </Box>

            <Box sx={boardColumnStyles}>
              <BoardColumn
                title='Bajarilmoqda'
                data={orders[ORDER_STATUSES.PENDING]}
                isLoading={isLoading}
                onChange={handleChange.bind(null, ORDER_STATUSES.PENDING)}
                borderColor='warning.main'
              />
            </Box>

            <Box sx={boardColumnStyles}>
              <BoardColumn
                title='Tayyor'
                data={orders[ORDER_STATUSES.COMPLETED]}
                isLoading={isLoading}
                onChange={handleChange.bind(null, ORDER_STATUSES.COMPLETED)}
                borderColor='success.main'
              />
            </Box>

            <Box sx={boardColumnStyles}>
              <BoardColumn
                title="To'langan"
                data={orders[ORDER_STATUSES.REJECTED]}
                isLoading={isLoading}
                onChange={handleChange.bind(null, ORDER_STATUSES.REJECTED)}
                borderColor='error.main'
              />
            </Box>
          </Box>
        </Box>
      </ReactSortableWrapperStyled>
    </>
  )
}

export default OrdersBoard
