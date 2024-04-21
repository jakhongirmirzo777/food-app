import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import InputMask from 'react-input-mask'

import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'

import { getError } from '../../../utils/getError'
import { useSnackbar } from '../../../@core/context/snackbarContext'
import { useAddOrder, useUpdateOrder } from '../../../api/hooks/orders'

export const defaultValues = {
  userPhoneNumber: '',
  address: '',
  tableNumber: ''
}

const ORDER_TYPE = {
  TABLE: 'TABLE',
  TAKE_AWAY: 'TAKE_AWAY'
}

const MASK_OPTIONS = {
  mask: '+\\9\\9\\8(99) 999\\-99\\-99',
  maskChar: '_',
  alwaysShowMask: true,
  formatChars: {
    9: '[0-9]'
  }
}

const OrderForm = ({ setIsDialogOpen, data, orderItems }) => {
  const { setSnackbar } = useSnackbar()
  const { mutateAsync: updateOrder } = useUpdateOrder()
  const { mutateAsync: addOrder } = useAddOrder()

  const [isLoading, setIsLoading] = useState(false)
  const [orderType, setOrderType] = useState(ORDER_TYPE.TABLE)

  const initialValues = data
    ? {
        userPhoneNumber: data.userPhoneNumber || '',
        address: data.address || '',
        tableNumber: data.tableNumber || ''
      }
    : null

  useEffect(() => {
    if (data) {
      if (data.tableNumber) {
        setOrderType(ORDER_TYPE.TABLE)
      } else {
        setOrderType(ORDER_TYPE.TAKE_AWAY)
      }
    } else {
      setOrderType(ORDER_TYPE.TABLE)
    }
  }, [data?.tableNumber])

  const validationSchema =
    orderType === ORDER_TYPE.TABLE
      ? yup.object({
          userPhoneNumber: yup.string().label('Telefon raqam').nullable(),
          address: yup.string().max(280).label('Manzil').nullable(),
          tableNumber: yup.string().nullable().label('Stol raqami').required('Stol raqamini kiriting')
        })
      : yup.object({
          userPhoneNumber: yup.string().label('Telefon raqam').required('Telefon raqamni kiriting'),
          address: yup.string().max(280).label('Manzil').required('Manzilni kiriting'),
          tableNumber: yup.string().label('Stol raqami').nullable()
        })

  const formik = useFormik({
    initialValues: initialValues ?? defaultValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true)

        const formData = {
          orderItems: orderItems.map(orderItem => ({ mealId: orderItem.mealId, mealQuantity: orderItem.mealQuantity }))
        }

        if (orderType === ORDER_TYPE.TABLE) {
          formData['tableNumber'] = values.tableNumber
          formData['userPhoneNumber'] = null
          formData['address'] = null
        } else {
          formData['userPhoneNumber'] = values.userPhoneNumber?.replace(/\D/gi, '')
          formData['address'] = values.address
          formData['tableNumber'] = null
        }

        if (initialValues) {
          await updateOrder({
            orderId: data.id,
            formData
          })
        } else {
          await addOrder(formData)
        }

        setIsDialogOpen(false)
        resetForm()
        setSnackbar({ children: 'Buyurtma saqlandi', severity: 'success' })
      } catch (error) {
        setSnackbar({ children: 'Hatolik yuz berdi', severity: 'error' })
      } finally {
        setIsLoading(false)
      }
    }
  })

  return (
    <>
      <CardHeader title="Ma'lumotlar" sx={{ padding: 0, mb: 5 }} />
      <form onSubmit={formik.handleSubmit}>
        <Grid spacing={4} container mb={7}>
          <Grid md={3} xs={12} item>
            <Typography id='order-type' mb={1} sx={{ fontWeight: 'medium' }} variant='subtitle1'>
              Buyurtma turi
            </Typography>
            <RadioGroup
              row
              value={orderType}
              onChange={e => setOrderType(e.target.value)}
              aria-labelledby='order-type'
              defaultValue={ORDER_TYPE.TABLE}
              name='radio-buttons-group'
            >
              <FormControlLabel value={ORDER_TYPE.TABLE} control={<Radio color='info' />} label='Stol' />
              <FormControlLabel value={ORDER_TYPE.TAKE_AWAY} control={<Radio color='info' />} label='Dostavka' />
            </RadioGroup>
          </Grid>
          {orderType === ORDER_TYPE.TABLE && (
            <Grid md xs={12} item>
              <Box>
                <Typography mb={1} sx={{ fontWeight: 'medium' }} variant='subtitle1'>
                  Stol raqami
                </Typography>
                <TextField
                  type='number'
                  error={Boolean(getError(formik, 'tableNumber'))}
                  helperText={getError(formik, 'tableNumber')}
                  name='tableNumber'
                  size='small'
                  value={formik.values.tableNumber}
                  fullWidth
                  onChange={formik.handleChange}
                />
              </Box>
            </Grid>
          )}
          {orderType === ORDER_TYPE.TAKE_AWAY && (
            <>
              <Grid md xs={12} item>
                <Box>
                  <Typography mb={1} sx={{ fontWeight: 'medium' }} variant='subtitle1'>
                    Telefon raqam
                  </Typography>
                  <InputMask {...MASK_OPTIONS} value={formik.values.userPhoneNumber} onChange={formik.handleChange}>
                    {inputProps => (
                      <TextField
                        {...inputProps}
                        error={Boolean(getError(formik, 'userPhoneNumber'))}
                        helperText={getError(formik, 'userPhoneNumber')}
                        name='userPhoneNumber'
                        size='small'
                        fullWidth
                      />
                    )}
                  </InputMask>
                </Box>
              </Grid>
              <Grid md xs={12} item>
                <Box>
                  <Typography mb={1} sx={{ fontWeight: 'medium' }} variant='subtitle1'>
                    Manzil
                  </Typography>
                  <TextField
                    error={Boolean(getError(formik, 'address'))}
                    helperText={getError(formik, 'address')}
                    name='address'
                    size='small'
                    value={formik.values.address}
                    fullWidth
                    onChange={formik.handleChange}
                  />
                </Box>
              </Grid>
            </>
          )}
        </Grid>
        <Grid spacing={7} container justifyContent='flex-end'>
          <Grid xs={12} sm={6} md={3} lg={2} item>
            <Button fullWidth color='secondary' variant='outlined' type='button' onClick={() => setIsDialogOpen(false)}>
              Bekor qilish
            </Button>
          </Grid>
          <Grid xs={12} sm={6} md={3} lg={2} item>
            <LoadingButton fullWidth loading={isLoading} type='submit' variant='contained'>
              Saqlash
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default OrderForm
