// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Form Validation
import { useFormik } from 'formik'
import { validationSchema, initialValues as defaultValues } from './admins-form-utils'

// ** Hooks Imports
import { useSnackbar } from 'src/@core/context/snackbarContext'
import { useAddAdmin, useUpdateAdmin } from 'src/api/hooks/admins'

// ** Utils Imports
import PropTypes from 'prop-types'
import { getError } from 'src/utils/getError'

const AdminsForm = ({ onClose, initialValues }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { setSnackbar } = useSnackbar()

  const { mutateAsync: addAdmin } = useAddAdmin()
  const { mutateAsync: updateAdmin } = useUpdateAdmin()

  const formik = useFormik({
    initialValues: {
      ...(initialValues ?? defaultValues),
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true)

        if (initialValues) {
          await updateAdmin({ adminId: initialValues.id, data: values })
        } else {
          await addAdmin(values)
        }

        onClose()
        resetForm()
        setSnackbar({ children: 'Admin saqlandi', severity: 'success' })
      } catch (error) {
        console.log(error)
        setSnackbar({ children: 'Hatolik yuz berdi', severity: 'error' })
      } finally {
        setIsLoading(false)
      }
    }
  })

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <Box component='form' sx={{ p: 5 }} onSubmit={formik.handleSubmit}>
      <TextField
        error={Boolean(getError(formik, 'name'))}
        helperText={getError(formik, 'name')}
        label='Ismi'
        name='name'
        sx={{ mb: 5 }}
        value={formik.values.name}
        fullWidth
        onChange={formik.handleChange}
      />
      <TextField
        error={Boolean(getError(formik, 'login'))}
        helperText={getError(formik, 'login')}
        label='Login'
        name='login'
        sx={{ mb: 5 }}
        value={formik.values.login}
        fullWidth
        onChange={formik.handleChange}
      />
      <FormControl fullWidth sx={{ mb: 6 }}>
        <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
        <OutlinedInput
          error={formik.touched.password && Boolean(formik.errors.password)}
          label='Parol'
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
      <Box>
        <LoadingButton loading={isLoading} sx={{ mr: 3 }} type='submit' variant='contained'>
          Saqlash
        </LoadingButton>
        <Button color='secondary' variant='outlined' onClick={onClose}>
          Bekor qilish
        </Button>
      </Box>
    </Box>
  )
}

AdminsForm.propTypes = {
  //   initialValues: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}

export default AdminsForm
