import { Box, Typography } from '@mui/material'
import AppImage from '../../../@core/components/AppImage'
import { formatNumber } from '../../../utils/formatNumber'
import IconButton from '@mui/material/IconButton'
import MinusIcon from 'mdi-material-ui/Minus'
import PlusIcon from 'mdi-material-ui/Plus'
import CardHeader from '@mui/material/CardHeader'

const OrderedMeals = ({ orderItems, setOrderItems }) => {
  const totalAmount = orderItems.reduce((acc, cur) => {
    return acc + cur.mealQuantity * cur.meal.price
  }, 0)

  const onRemoveMeal = meal => {
    const orders = JSON.parse(JSON.stringify(orderItems))
    const orderIndex = orders.findIndex(order => order.mealId === meal.mealId)
    if (orderIndex >= 0 && meal.mealQuantity > 1) {
      orders.splice(orderIndex, 1, {
        ...meal,
        mealQuantity: meal.mealQuantity - 1
      })
    } else if (orderIndex >= 0 && meal.mealQuantity === 1) {
      orders.splice(orderIndex, 1)
    }
    setOrderItems(orders)
  }

  const onAddMeal = meal => {
    const orders = JSON.parse(JSON.stringify(orderItems))
    const orderIndex = orders.findIndex(order => order.mealId === meal.mealId)
    if (orderIndex >= 0) {
      orders.splice(orderIndex, 1, {
        ...meal,
        mealQuantity: meal.mealQuantity + 1
      })
    }
    setOrderItems(orders)
  }

  return (
    <>
      <CardHeader title='Buyurtmalar' sx={{ padding: 0, mb: 8 }} />
      {orderItems.map(orderItem => (
        <Box
          key={orderItem.mealId}
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 3 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <AppImage
              sx={{ width: 70, minWidth: 70, height: 70, border: 1, borderColor: 'primary.orders', borderRadius: 1 }}
              src={orderItem?.meal?.imageUrl}
              alt={orderItem?.meal?.title}
            />
            <Box sx={{ ml: 3 }}>
              <Typography variant='subtitle2' fontWeight={600} color='text.primary' className='oneLineText'>
                {orderItem?.meal?.title}
              </Typography>
              <Typography variant='subtitle2'>{formatNumber(orderItem?.meal?.price)} so'm</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton onClick={() => onRemoveMeal(orderItem)}>
              <MinusIcon />
            </IconButton>
            <Typography mx={4} variant='subtitle1' fontWeight={600} color='text.primary'>
              {orderItem?.mealQuantity}
            </Typography>
            <IconButton onClick={() => onAddMeal(orderItem)}>
              <PlusIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
      <CardHeader title={`Ja'mi: ${formatNumber(totalAmount)} so'm`} sx={{ padding: 0, mt: 8 }} />
    </>
  )
}

export default OrderedMeals
