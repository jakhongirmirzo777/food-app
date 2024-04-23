import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from 'mdi-material-ui/Close'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import * as yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from '../../@core/context/snackbarContext'
import { getError } from '../../utils/getError'

const NEXT_PUBLIC_FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL

const validationSchema = yup.object({
  tableNumber: yup
    .number()
    .min(1, "To'g'ri stol raqami kiriting")
    .label('Stol raqami')
    .required('Stol raqamini kiriting')
})

const copyToClipboard = value => {
  navigator.clipboard.writeText(value)
}

const QrCodeDialog = ({ qrCodeOpen, setQrCodeOpen }) => {
  const { setSnackbar } = useSnackbar()

  const formik = useFormik({
    initialValues: {
      tableNumber: ''
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const url = `${NEXT_PUBLIC_FRONTEND_URL}?tableNumber=${values.tableNumber}`
      copyToClipboard(url)
      resetForm()
      setSnackbar({ children: 'Clipboard ga saqlandi', severity: 'success' })
    }
  })

  return (
    <Dialog maxWidth='xs' scroll='paper' open={qrCodeOpen} fullWidth onClose={() => setQrCodeOpen(false)}>
      {qrCodeOpen && (
        <Box sx={{ padding: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', position: 'relative' }}>
            <DialogTitle variant='subtitle1' sx={{ py: 3, px: 0 }} color='text.primary' fontWeight={500}>
              QR code
            </DialogTitle>
            <IconButton onClick={() => setQrCodeOpen(false)} sx={{ position: 'absolute', top: 2, right: 0 }}>
              <CloseIcon fontSize='small' />
            </IconButton>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid spacing={4} container>
              <Grid xs={12} item>
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
              <Grid xs={12} sm={6} item>
                <Button
                  fullWidth
                  color='secondary'
                  variant='outlined'
                  type='button'
                  onClick={() => setQrCodeOpen(false)}
                >
                  Bekor qilish
                </Button>
              </Grid>
              <Grid xs={12} sm={6} item>
                <Button fullWidth type='submit' variant='contained'>
                  Yaratish
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      )}
    </Dialog>
  )
}

export default QrCodeDialog
