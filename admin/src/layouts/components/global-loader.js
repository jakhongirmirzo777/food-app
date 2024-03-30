// ** MUI Imports
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'

const LoaderWrapper = styled('div')(({ theme }) => ({
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper
}))

const GlobalLoader = () => {
  return (
    <LoaderWrapper>
      <CircularProgress color='primary' size={35} />
    </LoaderWrapper>
  )
}

export default GlobalLoader
