import { useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import ChevronRightIcon from 'mdi-material-ui/ChevronRight'
import { styled } from '@mui/material/styles'

import OrderDetailsDialog from './order-details-dialog'

import { formatDate } from 'src/utils/formatDate'
import { formatNumber } from 'src/utils/formatNumber'

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

const BoardCard = ({ id, price, createdAt }) => {
  const [showDetails, setShowDetails] = useState(false)

  const openDetails = () => setShowDetails(true)
  const closeDetails = () => setShowDetails(false)

  return (
    <>
      <Box className='sortable-item'>
        <Card sx={{ height: '100%', position: 'relative' }} variant='outlined' onClick={openDetails}>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant='subtitle' fontWeight={500}>
                Buyurtma{' '}
                <Typography component='span' variant='subtitle' fontWeight={600}>
                  #{id}
                </Typography>
              </Typography>
              <Typography variant='subtitle2' fontWeight={500}>
                {formatDate(createdAt)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='subtitle1' color='primary' fontWeight={500}>
                {formatNumber(price)} so'm
              </Typography>
              <RoundedButton size='small' color='secondary' variant='outlined'>
                <ChevronRightIcon />
              </RoundedButton>
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
