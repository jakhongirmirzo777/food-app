// ** React Imports
import { useRef } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

import ErrorOutlineIcon from 'mdi-material-ui/AlertCircleOutline'

// ** Utils Imports
import PropTypes from 'prop-types'

const AppConfirmationDialog = ({ open, onClose, onConfirm, isLoading, message }) => {
  const cancelButtonRef = useRef(null)

  const handleEntered = () => {
    cancelButtonRef.current?.focus()
  }

  return (
    <Dialog maxWidth='xs' open={open} TransitionProps={{ onEnter: handleEntered }} fullWidth onClose={onClose}>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'warning',
          justifyContent: 'center'
        }}
      >
        <ErrorOutlineIcon color='warning' sx={{ fontSize: '70px' }} />
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center' }}>{message}</DialogContent>
      <DialogActions sx={{ justifyContent: 'center', paddingTop: '16px !important' }}>
        <Button color='error' ref={cancelButtonRef} variant='outlined' onClick={onClose}>
          Bekor qilish
        </Button>
        <LoadingButton color='success' loading={isLoading} variant='contained' onClick={onConfirm}>
          Ha
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

AppConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  message: PropTypes.string
}

AppConfirmationDialog.defaultProps = {
  message: 'Ishonchingiz komilmi?'
}

export default AppConfirmationDialog
