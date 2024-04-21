import { Skeleton, Box, Typography } from '@mui/material'
import AppImage from 'src/@core/components/AppImage'

import { formatNumber } from 'src/utils/formatNumber'

const OrderItem = ({ data }) => {
  const calculatedCost = data?.meal?.price * data?.mealQuantity

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <AppImage
          sx={{ width: 70, minWidth: 70, height: 70, border: 1, borderColor: 'primary.orders', borderRadius: 1 }}
          src={data?.meal?.imageUrl}
          alt={data?.meal?.title}
        />

        <Box sx={{ ml: 3 }}>
          <Typography variant='subtitle2' fontWeight={600} color='text.primary' className='oneLineText'>
            {data?.meal?.title}
          </Typography>
          <Typography variant='subtitle2'>x{data?.mealQuantity}</Typography>
        </Box>
      </Box>

      <Typography variant='subtitle2' color='primary' fontWeight={500}>
        +{formatNumber(calculatedCost)} so'm
      </Typography>
    </Box>
  )
}

OrderItem.Skeleton = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Skeleton variant='rounded' sx={{ width: 70, height: 70 }} />

        <Box sx={{ ml: 3 }}>
          <Typography variant='subtitle2' fontWeight={600} color='text.primary'>
            <Skeleton width={100} />
          </Typography>
          <Typography variant='subtitle2'>
            <Skeleton width={40} />
          </Typography>
        </Box>
      </Box>

      <Typography variant='subtitle2' color='primary' fontWeight={500}>
        <Skeleton width={100} />
      </Typography>
    </Box>
  )
}

export default OrderItem
