import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'
import CloseIcon from 'mdi-material-ui/Close'
import DeleteIcon from 'mdi-material-ui/Delete'
import PencilIcon from 'mdi-material-ui/Pencil'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

import AppConfirmationDialog from '../../../@core/components/AppConfirmationDialog'
import OrderCreateUpdateDialog from '../order-create-update-dialog/OrderCreateUpdateDialog'
import OrderItem from './OrderItem'

import { styled } from '@mui/material/styles'
import { useDeleteOrder, useGetOrder } from 'src/api/hooks/orders'
import { formatDate } from 'src/utils/formatDate'
import { formatNumber } from 'src/utils/formatNumber'
import { useState } from 'react'
import { useSnackbar } from '../../../@core/context/snackbarContext'
import { useRole } from '../../../layouts/useRole'
import { ROLES } from '../../../utils/constants/roles'
import { ORDER_STATUSES } from '../../../utils/constants/orders'

const DeleteButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: '5px',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '30px',
  [theme.breakpoints.up('xl')]: {
    minWidth: '40px'
  }
}))

const OrderDetailsDialog = ({ id, open, onClose }) => {
  const { data, isFetching } = useGetOrder(id, { enabled: open })
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false)
  const [isOrderCreateUpdateDialogOpen, setIsOrderCreateUpdateDialogOpen] = useState(false)
  const [itemToDeleteId, setItemToDeleteId] = useState(null)
  const validateRole = useRole()
  const hasAccessToEditAndDelete = validateRole(ROLES.SUPER_ADMIN)

  const openDeleteConfirmation = id => {
    setItemToDeleteId(id)
    setShowDeleteConfirmDialog(true)
  }

  const closeDeleteConfirmation = () => setShowDeleteConfirmDialog(false)
  const { mutate, isLoading: isDeleteLoading } = useDeleteOrder()

  const { setSnackbar } = useSnackbar()

  const handleDelete = () => {
    mutate(itemToDeleteId, {
      onSuccess() {
        setSnackbar({ children: "Buyurtma o'chirildi", severity: 'success' })
        closeDeleteConfirmation()
      },
      onError() {
        setSnackbar({ children: 'Hatolik yuz berdi', severity: 'error' })
      }
    })
  }

  const skeletonItems = Array.from(new Array(5).keys())

  return (
    <>
      <Dialog maxWidth='md' scroll='paper' open={open} fullWidth onClose={onClose}>
        {open ? (
          <>
            <Box
              sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', position: 'relative' }}
            >
              <DialogTitle variant='subtitle1' sx={{ py: 3 }} color='text.primary' fontWeight={500}>
                Buyurtma #{data?.orderNumber}
                <Typography component='span' variant='subtitle2' sx={{ display: 'block' }}>
                  {isFetching ? <Skeleton width={150} /> : formatDate(data?.createdAt)}
                </Typography>
              </DialogTitle>

              {!data?.tableNumber ? (
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
              ) : (
                <Box sx={{ display: 'flex', mb: 8 }}>
                  <Chip
                    label={`Stol: ${data?.tableNumber}`}
                    color='info'
                    size='small'
                    sx={{ mr: 10, textAlign: 'right' }}
                  />
                </Box>
              )}

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
              <Box
                sx={{
                  width: '100%',
                  pt: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end'
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4
                  }}
                >
                  <Typography variant='subtitle1' color='text.primary' fontWeight={600}>
                    Jami
                  </Typography>
                  <Typography variant='subtitle1' color='primary' fontWeight={500}>
                    {isFetching ? <Skeleton width={100} /> : `${formatNumber(data?.totalCost)} so'm`}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}
                >
                  {!hasAccessToEditAndDelete &&
                  (data?.status === ORDER_STATUSES.COMPLETED || data?.status === ORDER_STATUSES.REJECTED) ? null : (
                    <Button
                      size='small'
                      color='warning'
                      variant='contained'
                      onClick={() => setIsOrderCreateUpdateDialogOpen(true)}
                    >
                      <Typography component='span' color='white' variant='subtitle2' sx={{ mr: 1 }}>
                        Tahrirlash
                      </Typography>
                      <PencilIcon fontSize='small' color='white' />
                    </Button>
                  )}
                  {hasAccessToEditAndDelete && (
                    <DeleteButton
                      loading={isDeleteLoading}
                      size='small'
                      color='error'
                      variant='contained'
                      onClick={openDeleteConfirmation.bind(null, data?.id)}
                      style={{ marginLeft: 10 }}
                    >
                      <Typography component='span' color='white' variant='subtitle2' sx={{ mr: 1 }}>
                        O'chirish
                      </Typography>
                      <DeleteIcon fontSize='small' color='white' />
                    </DeleteButton>
                  )}
                </Box>
              </Box>
            </DialogActions>
          </>
        ) : null}
      </Dialog>
      <AppConfirmationDialog
        isLoading={isDeleteLoading}
        open={showDeleteConfirmDialog}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDelete}
      />
      <OrderCreateUpdateDialog
        data={data}
        isDialogOpen={isOrderCreateUpdateDialogOpen}
        setIsDialogOpen={setIsOrderCreateUpdateDialogOpen}
      />
    </>
  )
}

export default OrderDetailsDialog
