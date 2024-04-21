import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from 'mdi-material-ui/Close'
import MealsTable from './MealsTable'
import OrderedMeals from './OrderedMeals'
import { useEffect, useState } from 'react'
import Divider from '@mui/material/Divider'
import OrderForm from './OrderForm'

const OrderCreateUpdateDialog = ({ data, isDialogOpen, setIsDialogOpen }) => {
  const [orderItems, setOrderItems] = useState([])

  useEffect(() => {
    const orderedMeals = data?.orderItems?.length > 0 ? data.orderItems : []
    setOrderItems(orderedMeals)
  }, [data?.orderItems, isDialogOpen])

  return (
    <Dialog maxWidth='lg' scroll='paper' open={isDialogOpen} fullWidth onClose={() => setIsDialogOpen(false)}>
      {isDialogOpen && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', position: 'relative' }}>
            <DialogTitle variant='subtitle1' sx={{ py: 3 }} color='text.primary' fontWeight={500}>
              {data ? 'Tahrirlash' : 'Yangi yaratish'}
            </DialogTitle>
            <IconButton onClick={() => setIsDialogOpen(false)} sx={{ position: 'absolute', top: 2, right: 2 }}>
              <CloseIcon fontSize='small' />
            </IconButton>
          </Box>
          <Box sx={{ padding: 5 }}>
            <OrderForm setIsDialogOpen={setIsDialogOpen} data={data} orderItems={orderItems} />
            <Divider sx={{ mt: 10 }} />
          </Box>
          {orderItems.length > 0 && (
            <>
              <Box sx={{ padding: 5 }}>
                <OrderedMeals orderItems={orderItems} setOrderItems={setOrderItems} />
              </Box>
              <Divider sx={{ mt: 4 }} />
            </>
          )}
          <Box sx={{ padding: 5 }}>
            <MealsTable orderItems={orderItems} setOrderItems={setOrderItems} />
          </Box>
        </>
      )}
    </Dialog>
  )
}

export default OrderCreateUpdateDialog
