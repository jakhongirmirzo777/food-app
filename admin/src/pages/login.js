// ** React Imports
import { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import LoadingButton from '@mui/lab/LoadingButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Form Validation
import { useFormik } from 'formik'
import * as yup from 'yup'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

import { login } from 'src/api/services/admins'
import AppImage from '../@core/components/AppImage'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const validationSchema = yup.object({
  login: yup.string('Enter your Login').required('Login is required'),
  password: yup.string('Enter your password').required('Password is required')
})

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      login: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      setIsLoading(true)

      try {
        const response = await login(values)

        localStorage.setItem('access_token', response.data.accessToken)
        localStorage.setItem('user_id', response.data.id)
        router.push('/')
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
  })

  // ** Hook
  const router = useRouter()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AppImage
              alt='Logo'
              src='/images/logo.png'
              sx={{
                borderRadius: '5px',
                height: { xs: 40, xl: 40 }
              }}
            />
          </Box>
          <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
            <TextField
              error={formik.touched.login && Boolean(formik.errors.login)}
              autoFocus
              fullWidth
              name='login'
              value={formik.values.login}
              onChange={formik.handleChange}
              label='Login'
              sx={{ marginBottom: 4 }}
            />
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                error={formik.touched.password && Boolean(formik.errors.password)}
                label='Password'
                value={formik.values.password}
                id='auth-login-password'
                autoComplete='password'
                name='password'
                onChange={formik.handleChange}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <LoadingButton
              loading={isLoading}
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              type='submit'
            >
              Login
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
