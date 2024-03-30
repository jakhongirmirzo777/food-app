import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'
import CloseIcon from 'mdi-material-ui/Close'

import OrderItem from './OrderItem'

import { useGetOrder } from 'src/api/hooks/orders'
import { formatDate } from 'src/utils/formatDate'
import { formatNumber } from 'src/utils/formatNumber'

const OrderDetailsDialog = ({ id, open, onClose }) => {
  const { data, isFetching } = useGetOrder(id, { enabled: open })

  const skeletonItems = Array.from(new Array(5).keys())

  return (
    <Dialog maxWidth='md' scroll='paper' open={open} fullWidth onClose={onClose}>
      {open ? (
        <>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', position: 'relative' }}>
            <DialogTitle variant='subtitle1' sx={{ py: 3 }} color='text.primary' fontWeight={500}>
              Buyurtma #12
              <Typography component='span' variant='subtitle2' sx={{ display: 'block' }}>
                {isFetching ? <Skeleton width={150} /> : formatDate(data?.createdAt)}
              </Typography>
            </DialogTitle>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', overflow: 'hidden' }}>
              <Typography variant='subtitle1' fontWeight={500} sx={{ pr: 10, textAlign: 'right' }}>
                {isFetching ? <Skeleton width={200} /> : `+${data?.userPhoneNumber}`}
              </Typography>
              <Typography
                variant='subtitle2'
                sx={{
                  textAlign: 'right',
                  mb: 3,
                  maxWidth: '90%',
                  pr: 10,
                  wordBreak: 'keep-all',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {isFetching ? <Skeleton width={300} sx={{ mr: 10 }} /> : data?.address}
              </Typography>
            </Box>

            <IconButton onClick={onClose} sx={{ position: 'absolute', top: 2, right: 2 }}>
              <CloseIcon fontSize='small' />
            </IconButton>
          </Box>

          <DialogContent sx={{ pt: 2 }} dividers>
            <Typography variant='subtitle1' color='text.primary' fontWeight={500} sx={{ mb: 2 }}>
              Menu
            </Typography>
            <Box>
              {isFetching
                ? skeletonItems.map(item => <OrderItem.Skeleton key={item} />)
                : data?.orderItems.map(item => <OrderItem key={item.id} data={item} />)}
            </Box>
          </DialogContent>

          <DialogActions sx={{ pb: 3 }}>
            <Box sx={{ width: '100%', pt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant='subtitle1' color='text.primary' fontWeight={600}>
                Jami
              </Typography>
              <Typography variant='subtitle1' color='primary' fontWeight={500}>
                {isFetching ? <Skeleton width={100} /> : `${formatNumber(data?.totalCost)} so'm`}
              </Typography>
            </Box>
          </DialogActions>
        </>
      ) : null}
    </Dialog>
  )
}

export default OrderDetailsDialog
