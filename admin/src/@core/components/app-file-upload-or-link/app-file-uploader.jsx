// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import DeleteIcon from 'mdi-material-ui/Delete'
import UploadFileIcon from 'mdi-material-ui/Upload'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'

// ** Utils Imports
import PropTypes from 'prop-types'

const StyledInput = styled('input')({
  position: 'absolute',
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  opacity: 0,
  appearance: 'none',
  zIndex: 100
})

const StyledImg = styled('img')({
  display: 'block',
  width: '100%',
  height: '100%',
  borderRadius: '5px',
  objectFit: 'cover'
})

const AppFileUploader = ({ value: file, onChange, onDelete, width, height, error, disabled }) => {
  const StyledBox = styled(Box)(({ theme }) => ({
    minWidth: '80px',
    width: width || '150px',
    height: height || '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: !file ? `2px dashed ${error ? theme.palette.error.main : theme.palette.text.secondary}` : '',
    borderRadius: '5px',
    position: 'relative',
    color: theme.palette.text.secondary,
    transition: 'all 0.1s ease',
    backgroundColor: !disabled && (dragging || file) ? theme.palette.background.default : '',
    '&:hover': !disabled && {
      backgroundColor: theme.palette.background.default
    }
  }))

  const [dragging, setDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
  }, [file])

  const handleChange = event => {
    if (event.target.files[0]) {
      onChange && onChange(event.target.files[0])
    }
  }

  const handleRemove = () => {
    onDelete && onDelete(file)
    dragging && setDragging(false)
  }

  const handleError = event => {
    console.log('ERROR')
    event.target.src = '/images/file-not-found.jpg'
  }

  const renderFilePreview = () => {
    const preview = file && (typeof file === 'string' ? file : URL.createObjectURL(file))

    return (
      <>
        <StyledImg alt='File' src={preview} onError={handleError} onLoad={setIsLoading.bind(null, false)} />

        <Backdrop
          open={isLoading}
          sx={{
            zIndex: 1,
            position: 'absolute',
            color: '#fff'
          }}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
        <Button
          color='error'
          size='small'
          sx={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            minWidth: '40px'
          }}
          variant='contained'
          onClick={handleRemove}
        >
          <DeleteIcon fontSize='small' />
        </Button>
      </>
    )
  }

  const renderUploadInput = () => (
    <>
      <StyledInput
        type='file'
        accept='image/jpeg, image/png'
        sx={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        onChange={handleChange}
        onDragLeave={setDragging.bind(null, false)}
        onDragOver={setDragging.bind(null, true)}
      />
      <Box sx={{ textAlign: 'center' }}>
        <UploadFileIcon color='inherit' />
        <Typography mt={1} variant='subtitle2'>
          File Yuklang
        </Typography>
      </Box>
    </>
  )

  return (
    <>
      <StyledBox>{file ? renderFilePreview() : renderUploadInput()}</StyledBox>

      {error && (
        <Typography color='error' variant='caption'>
          {error}
        </Typography>
      )}
    </>
  )
}

AppFileUploader.propTypes = {
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setError: PropTypes.func,
  disabled: PropTypes.bool
}

export default React.memo(AppFileUploader)
