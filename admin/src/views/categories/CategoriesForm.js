// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Components Imports
import AppFileUploadOrLink from 'src/@core/components/app-file-upload-or-link/app-file-upload-or-link'

// ** Form Validation
import { useFormik } from 'formik'
import { validationSchema, initialValues as defaultValues } from './categories-form-utils'

// ** Hooks Imports
import { useSnackbar } from 'src/@core/context/snackbarContext'
import { useGetTags } from 'src/api/hooks/tags'
import { useAddCategory, useUpdateCategory } from 'src/api/hooks/categories'
import { useUploadImage } from 'src/api/hooks/images'

// ** Constants Imports
// import { SUCCESSFULLY_SAVED, SOMETHING_WENT_WRONG } from '@/utils/constants/notifications'

// ** Utils Imports
import PropTypes from 'prop-types'
import { getError } from 'src/utils/getError'

const CategoriesForm = ({ onClose, initialValues }) => {
  const [isLoading, setIsLoading] = useState(false)

  const { setSnackbar } = useSnackbar()

  const { mutateAsync: addCategory } = useAddCategory()
  const { mutateAsync: updateCategory } = useUpdateCategory()
  const { mutateAsync: uploadImage } = useUploadImage()

  const formik = useFormik({
    initialValues: initialValues ?? defaultValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true)

        const data = {
          ...values
        }

        if (data.tag) {
          data.tagId = values.tag.id
        }
        delete data.tag

        if (typeof data.imageUrl === 'object') {
          const formData = new FormData()
          formData.append('image', data.imageUrl)

          const res = await uploadImage(formData)
          data.imageUrl = res.data.imagePath
        }

        if (initialValues) {
          await updateCategory({ categoryId: initialValues.id, data })
        } else {
          await addCategory(data)
        }

        onClose()
        resetForm()
        setSnackbar({ children: 'Categoriya saqlandi', severity: 'success' })
      } catch (error) {
        setSnackbar({ children: 'Hatolik yuz berdi', severity: 'error' })
      } finally {
        setIsLoading(false)
      }
    }
  })

  const { data: tags = [] } = useGetTags()

  useEffect(() => {
    if (initialValues && tags.length !== 0) {
      const selectedTag = tags.find(v => initialValues.tagId === v.id)
      formik.setFieldValue('tag', selectedTag ?? '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])

  const handleAutocompleteChange = (_, newVal) => {
    formik.setFieldValue('tag', newVal)
  }

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid spacing={6} sx={{ pt: 5 }} container>
          <Grid md={9} xs={12} item>
            <Card sx={{ textAlign: 'initial' }} variant='outlined'>
              <CardHeader title='Categoriya qoshish' />
              <Divider sx={{ my: 0 }} />
              <CardContent>
                <Box sx={{ mb: 5 }}>
                  <Typography mb={1} sx={{ fontWeight: 'medium' }} variant='subtitle1'>
                    Nomi
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
                <Box sx={{ mb: 5 }}>
                  <Typography mb={1} sx={{ fontWeight: 'medium' }} variant='subtitle1'>
                    Tavsifi
                  </Typography>
                  <TextField
                    error={Boolean(getError(formik, 'description'))}
                    helperText={getError(formik, 'description')}
                    name='description'
                    rows={4}
                    value={formik.values.description}
                    fullWidth
                    multiline
                    onChange={formik.handleChange}
                  />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography mb={1} sx={{ fontWeight: 'medium' }} variant='subtitle1'>
                    Teg
                  </Typography>
                  <Autocomplete
                    fullWidth
                    getOptionLabel={item => item.title ?? ''}
                    isOptionEqualToValue={(option, value) => {
                      return value.id === option.id
                    }}
                    options={tags}
                    renderInput={params => (
                      <TextField
                        size='small'
                        fullWidth
                        error={Boolean(getError(formik, 'tag'))}
                        helperText={getError(formik, 'tag')}
                        {...params}
                        placeholder='Teg tanlang'
                      />
                    )}
                    value={formik.values.tag}
                    onChange={handleAutocompleteChange}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid md={3} xs={12} item>
            <Card sx={{ mb: 4, textAlign: 'initial' }} variant='outlined'>
              <Typography fontWeight={500} p={5} pb={0} variant='subtitle1'>
                Rasmi
              </Typography>

              <CardContent sx={{ pt: 2 }}>
                <AppFileUploadOrLink name='imageUrl' value={formik.values.imageUrl} onChange={formik.setFieldValue} />
              </CardContent>
            </Card>
          </Grid>
          <Grid md={9} sx={{ display: 'flex', justifyContent: 'flex-end' }} xs={12} item>
            <Button color='secondary' variant='outlined' onClick={onClose}>
              Bekor qilish
            </Button>
            <LoadingButton loading={isLoading} sx={{ ml: 4 }} type='submit' variant='contained'>
              Saqlash
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

CategoriesForm.propTypes = {
  //   initialValues: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}

export default CategoriesForm
