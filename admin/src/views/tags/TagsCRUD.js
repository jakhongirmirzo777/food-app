import { useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import PencilIcon from 'mdi-material-ui/Pencil'
import DeleteIcon from 'mdi-material-ui/Delete'

// ** Components Imports
import AppImage from 'src/@core/components/AppImage'
import AppConfirmationDialog from 'src/@core/components/AppConfirmationDialog'
import StripedTableRow from 'src/@core/components/styled/StripedTableRow'
import WithEmptyState from 'src/@core/components/app-empty-state/with-empty-state'
import TagsForm from './TagsForm'

// ** Hooks Imports
import { useSnackbar } from 'src/@core/context/snackbarContext'
import { useGetTags, useDeleteTag } from 'src/api/hooks/tags'
import useMediaQuery from '@mui/material/useMediaQuery'

const CategoriesCRUD = () => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const { data: tags = [], isFetching } = useGetTags()

  const [showForm, setShowForm] = useState(false)

  const [itemToEdit, setItemToEdit] = useState(null)
  const openForm = () => setShowForm(true)

  const closeForm = () => {
    if (itemToEdit) setItemToEdit(null)
    setShowForm(false)
  }

  const startEditing = item => {
    setItemToEdit(item)
    setShowForm(true)
  }

  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false)
  const [itemToDeleteId, setItemToDeleteId] = useState(null)

  const openDeleteConfirmation = id => {
    setItemToDeleteId(id)
    setShowDeleteConfirmDialog(true)
  }
  const closeDeleteConfirmation = () => setShowDeleteConfirmDialog(false)
  const { mutate, isLoading: isDeleteLoading } = useDeleteTag()

  const { setSnackbar } = useSnackbar()

  const handleDelete = () => {
    mutate(itemToDeleteId, {
      onSuccess() {
        setSnackbar({ children: "Teg o'chirildi", severity: 'success' })
        closeDeleteConfirmation()
      },
      onError() {
        setSnackbar({ children: 'Hatolik yuz berdi', severity: 'error' })
      }
    })
  }

  return (
    <>
      <Card>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <CardHeader title='Teglar' />
          <Button fullWidth={isMobile} variant='contained' onClick={openForm} sx={{ mx: 3, mb: isMobile ? 4 : 0 }}>
            Teg qo'shish
          </Button>
        </Box>
        <Divider sx={{ my: 0 }} />
        <TableContainer component={Paper} sx={{ position: 'relative', minHeight: isFetching ? 200 : null }}>
          <Backdrop
            open={isFetching}
            sx={{
              zIndex: 100,
              position: 'absolute',
              color: '#fff'
            }}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
          <WithEmptyState show={isFetching || tags.length !== 0}>
            <Table aria-label='simple table' sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Teg</TableCell>
                  <TableCell width='15%'>Boshqarish</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tags.map(tag => (
                  <StripedTableRow key={tag.id}>
                    <TableCell sx={{ position: 'relative' }}>
                      <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                        {tag.title}
                      </Typography>
                    </TableCell>
                    <TableCell width='15%'>
                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
                        <IconButton onClick={startEditing.bind(null, tag)}>
                          <PencilIcon />
                        </IconButton>
                        <IconButton sx={{ ml: 1 }} onClick={openDeleteConfirmation.bind(null, tag.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </StripedTableRow>
                ))}
              </TableBody>
            </Table>
          </WithEmptyState>
        </TableContainer>
      </Card>
      <Dialog maxWidth='md' open={showForm} fullWidth onClose={closeForm}>
        <DialogContent sx={{ textAlign: 'center' }}>
          <TagsForm onClose={closeForm} initialValues={itemToEdit} />
        </DialogContent>
      </Dialog>

      <AppConfirmationDialog
        isLoading={isDeleteLoading}
        open={showDeleteConfirmDialog}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDelete}
      />
    </>
  )
}

export default CategoriesCRUD
