import { useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Chip from '@mui/material/Chip'
import ArrowLeftIcon from 'mdi-material-ui/ArrowLeft'
import ArrowRightIcon from 'mdi-material-ui/ArrowRight'
import { styled } from '@mui/material/styles'

import OrderDetailsDialog from './order-details-dialog'

import { formatDate } from 'src/utils/formatDate'
import { formatNumber } from 'src/utils/formatNumber'
import { useUpdateOrderStatus } from '../../api/hooks/orders'
import { ORDER_STATUSES } from '../../utils/constants/orders'

const RoundedButton = styled(Button)(({ theme }) => ({
  borderRadius: '50%',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  minWidth: '30px',
  width: '30px',
  height: '30px',
  [theme.breakpoints.up('xl')]: {
    minWidth: '40px',
    width: '40px',
    height: '40px'
  }
}))

const BoardCard = ({ id, orderNumber, price, createdAt, tableNumber, status }) => {
  const { mutate } = useUpdateOrderStatus()

  const [showDetails, setShowDetails] = useState(false)

  const openDetails = () => setShowDetails(true)
  const closeDetails = () => setShowDetails(false)

  const updateStatusPrev = e => {
    e.preventDefault()
    e.stopPropagation()
    mutate({
      orderId: id,
      status:
        status === ORDER_STATUSES.REJECTED
          ? ORDER_STATUSES.COMPLETED
          : status === ORDER_STATUSES.COMPLETED
          ? ORDER_STATUSES.PENDING
          : ORDER_STATUSES.NEW
    })
  }

  const updateStatusNext = e => {
    e.preventDefault()
    e.stopPropagation()
    mutate({
      orderId: id,
      status:
        status === ORDER_STATUSES.NEW
          ? ORDER_STATUSES.PENDING
          : status === ORDER_STATUSES.PENDING
          ? ORDER_STATUSES.COMPLETED
          : ORDER_STATUSES.REJECTED
    })
  }

  return (
    <>
      <Box className='sortable-item'>
        <Card sx={{ height: '100%', position: 'relative' }} variant='outlined' onClick={openDetails}>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Chip
                label={`Buyurtma #${orderNumber} ${tableNumber ? '(ST-' + tableNumber + ')' : ''}`}
                color={tableNumber ? 'info' : 'success'}
                size='small'
              />
              <Typography variant='subtitle2' fontWeight={500}>
                {formatDate(createdAt)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='subtitle1' color='primary' fontWeight={500}>
                {formatNumber(price)} so'm
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                <RoundedButton size='small' color='secondary' variant='outlined' onClick={updateStatusPrev}>
                  <ArrowLeftIcon />
                </RoundedButton>
                <RoundedButton size='small' color='secondary' variant='outlined' onClick={updateStatusNext}>
                  <ArrowRightIcon />
                </RoundedButton>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>

      <OrderDetailsDialog id={id} open={showDetails} onClose={closeDetails} />
    </>
  )
}

const BoardCardSkeleton = () => {
  return <Skeleton className='ignoreDrag' sx={{ m: '2px' }} variant='rounded' height={86} />
}

BoardCard.Skeleton = BoardCardSkeleton

export default BoardCard
