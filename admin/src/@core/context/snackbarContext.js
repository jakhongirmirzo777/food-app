import { createContext, useState, useContext } from 'react'

// ** MUI Imports
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export const SnackbarContext = createContext({
  setSnackbar: () => {}
})

export const useSnackbar = () => useContext(SnackbarContext)

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState(null)

  const handleClose = () => {
    setSnackbar(null)
  }

  return (
    <>
      {!!snackbar && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={6000}
          open
          onClose={handleClose}
        >
          <Alert variant='filled' {...snackbar} onClose={handleClose} />
        </Snackbar>
      )}
      <SnackbarContext.Provider value={{ setSnackbar }}>{children}</SnackbarContext.Provider>
    </>
  )
}
