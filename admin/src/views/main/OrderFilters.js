import dynamic from 'next/dynamic'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import MagnifyIcon from 'mdi-material-ui/Magnify'
import LoadingButton from '@mui/lab/LoadingButton'
import { useResetCounterOrder } from '../../api/hooks/orders'
import { useSnackbar } from '../../@core/context/snackbarContext'
import AppConfirmationDialog from '../../@core/components/AppConfirmationDialog'
import CloseIcon from 'mdi-material-ui/Close'

// ** Components Imports
const AppDateRangePicker = dynamic(() => import('src/@core/components/react-date-range/app-date-range-picker'), {
  ssr: false
})

const OrderFilters = ({ range, search, handleRangeChange, handleSearchChange, handleSearchQueryChange }) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.up('md'))
  const [showResetConfirmDialog, setShowResetConfirmDialog] = useState(false)
  const { mutate, isLoading: isResetLoading } = useResetCounterOrder()

  const openResetConfirmation = () => setShowResetConfirmDialog(true)

  const closeResetConfirmation = () => setShowResetConfirmDialog(false)

  const { setSnackbar } = useSnackbar()

  const handleResetCounter = () => {
    mutate(null, {
      onSuccess() {
        setSnackbar({ children: 'Buyurtmalar tarixi yangilandi', severity: 'success' })
        closeResetConfirmation()
      },
      onError() {
        setSnackbar({ children: 'Hatolik yuz berdi', severity: 'error' })
      }
    })
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={4} pr={isMobile ? 2 : 0}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ backgroundColor: 'common.white' }}>
              <AppDateRangePicker value={range} onChange={handleRangeChange} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} px={isMobile ? 2 : 0}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ backgroundColor: 'common.white' }}>
              <TextField
                size='small'
                sx={{ width: '100%' }}
                name='search'
                value={search}
                onChange={e => {
                  handleSearchChange(e.target.value)
                  handleSearchQueryChange(e.target.value)
                }}
                placeholder='Qidirish'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MagnifyIcon fontSize='small' />
                    </InputAdornment>
                  ),
                  endAdornment: search && (
                    <InputAdornment
                      position='end'
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        handleSearchChange('')
                        handleSearchQueryChange('')
                      }}
                    >
                      <CloseIcon fontSize='small' color='error' />
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={2} px={isMobile ? 2 : 0}>
          <Box sx={{ mb: 4 }}>
            <LoadingButton
              loading={isResetLoading}
              fullWidth
              variant='contained'
              color='secondary'
              onClick={openResetConfirmation}
            >
              yangilash
            </LoadingButton>
          </Box>
        </Grid>
        <Grid item xs={12} md={2} pl={isMobile ? 2 : 0}>
          <Box sx={{ mb: 4 }}>
            <LoadingButton loading={isResetLoading} fullWidth variant='contained'>
              qo'shish
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
      <AppConfirmationDialog
        isLoading={isResetLoading}
        open={showResetConfirmDialog}
        onClose={closeResetConfirmation}
        onConfirm={handleResetCounter}
      />
    </>
  )
}

export default OrderFilters
