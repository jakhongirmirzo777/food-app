// ** React Imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// ** Components Imports
import AppFileUploader from './app-file-uploader'

// ** Utils Imports
import PropTypes from 'prop-types'

const AppFileUploadOrLink = ({ name, value, onChange, touched, error }) => {
  return (
    <Box sx={{ pt: 4 }}>
      <TextField
        error={Boolean(touched && error)}
        label='URL'
        size='small'
        value={typeof value === 'string' ? value : ''}
        fullWidth
        onChange={event => onChange?.(name, event.target.value)}
      />
      <Typography color='text.primary' fontWeight='medium' sx={{ my: 2 }} textAlign='center' variant={'subtitle1'}>
        YOKI
      </Typography>
      <AppFileUploader
        error={touched && error}
        height={200}
        value={value}
        width='100%'
        onChange={image => onChange?.(name, image)}
        onDelete={() => onChange?.(name, '')}
      />
    </Box>
  )
}

AppFileUploadOrLink.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func,
  touched: PropTypes.bool,
  error: PropTypes.string,
  setError: PropTypes.func
}

export default React.memo(AppFileUploadOrLink)
