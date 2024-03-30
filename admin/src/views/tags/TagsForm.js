// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Form Validation
import { useFormik } from 'formik'
import { validationSchema, initialValues as defaultValues } from './tags-form-utils'

// ** Hooks Imports
import { useSnackbar } from 'src/@core/context/snackbarContext'
import { useAddTag, useUpdateTag } from 'src/api/hooks/tags'

// ** Utils Imports
import PropTypes from 'prop-types'
import { getError } from 'src/utils/getError'

const TagsForm = ({ onClose, initialValues }) => {
  const [isLoading, setIsLoading] = useState(false)

  const { setSnackbar } = useSnackbar()

  const { mutateAsync: addTag } = useAddTag()
  const { mutateAsync: updateTag } = useUpdateTag()

  const formik = useFormik({
    initialValues: initialValues ?? defaultValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true)

        if (initialValues) {
          await updateTag({ tagId: initialValues.id, data: values })
        } else {
          await addTag(values)
        }

        onClose()
        resetForm()
        setSnackbar({ children: 'Teg saqlandi', severity: 'success' })
      } catch (error) {
        console.log(error)
        setSnackbar({ children: 'Hatolik yuz berdi', severity: 'error' })
      } finally {
        setIsLoading(false)
      }
    }
  })

  return (
    <Box sx={{ textAlign: 'initial' }}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ mb: 5 }}>
          <Typography mb={1} sx={{ fontWeight: 'medium' }} variant='subtitle1'>
            Teg nomi
          </Typography>
          <TextField
            error={Boolean(getError(formik, 'title'))}
            helperText={getError(formik, 'title')}
            name='title'
            size='small'
            value={formik.values.title}
            fullWidth
            onChange={formik.handleChange}
          />
        </Box>

        <Box sx={{ textAlign: 'right' }}>
          <Button color='secondary' variant='outlined' onClick={onClose}>
            Bekor qilish
          </Button>
          <LoadingButton loading={isLoading} sx={{ ml: 4 }} type='submit' variant='contained'>
            Saqlash
          </LoadingButton>
        </Box>
      </form>
    </Box>
  )
}

TagsForm.propTypes = {
  //   initialValues: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}

export default TagsForm
