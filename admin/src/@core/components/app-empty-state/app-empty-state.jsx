// ** MUI Imports
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Utils Imports
import PropTypes from 'prop-types'

const AppEmptyState = ({ height, message, ...props }) => {
  return (
    <Stack alignItems='center' height={height} justifyContent='center' {...props}>
      <Box maxHeight={90} sx={{ mb: 2, maxWidth: '100%', textAlign: 'center' }}>
        <img alt='No data' height='100%' src='/images/empty-box.png' width='auto' />
      </Box>
      <Typography variant='subtitle1'>{message}</Typography>
    </Stack>
  )
}

AppEmptyState.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  message: PropTypes.string
}

AppEmptyState.defaultProps = {
  height: 180
}

export default AppEmptyState
