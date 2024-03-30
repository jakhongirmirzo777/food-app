// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material'

// ** Utils Imports
import PropTypes from 'prop-types'

const ImageContainer = styled(Box)(() => ({
  overflow: 'hidden',
  position: 'relative'
}))

const Placeholder = styled('img')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover'
}))

const AppImage = ({ src, notFoundImagePath = '/images/not-found.jpg', sx, placeholderProps, alt, ...props }) => {
  const [currentState, setCurrentState] = useState('Loading')

  const imageStates = {
    Loading: '/images/loading.gif',
    Error: notFoundImagePath
  }

  useEffect(() => {
    const imageNew = new Image()
    imageNew.src = src
    imageNew.onload = () => {
      setCurrentState('Loaded')
    }
    imageNew.onerror = () => {
      setCurrentState('Error')
    }
  }, [src])

  return (
    <ImageContainer sx={sx}>
      {currentState !== 'Loaded' && <Placeholder src={imageStates[currentState]} {...placeholderProps} />}

      {currentState !== 'Error' && (
        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={alt} src={src} {...props} />
      )}
    </ImageContainer>
  )
}

AppImage.propTypes = {
  src: PropTypes.string.isRequired,
  notFoundImagePath: PropTypes.string,
  sx: PropTypes.object,
  placeholderProps: PropTypes.object
}

export default AppImage
