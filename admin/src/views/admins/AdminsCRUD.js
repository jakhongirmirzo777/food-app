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
import Drawer from '@mui/material/Drawer'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import PencilIcon from 'mdi-material-ui/Pencil'
import DeleteIcon from 'mdi-material-ui/Delete'

// ** Components Imports
import AppConfirmationDialog from 'src/@core/components/AppConfirmationDialog'
import StripedTableRow from 'src/@core/components/styled/StripedTableRow'
import WithEmptyState from 'src/@core/components/app-empty-state/with-empty-state'
import AdminsForm from './AdminsForm'

// ** Hooks Imports
import { useSnackbar } from 'src/@core/context/snackbarContext'
import { useGetAdmins, useDeleteAdmin } from 'src/api/hooks/admins'
import { ROLES } from '../../utils/constants/roles'
import useMediaQuery from '@mui/material/useMediaQuery'

const AdminsCRUD = () => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const { data: admins = [], isFetching } = useGetAdmins()

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
  const { mutate, isLoading: isDeleteLoading } = useDeleteAdmin()

  const { setSnackbar } = useSnackbar()

  const handleDelete = () => {
    mutate(itemToDeleteId, {
      onSuccess() {
        setSnackbar({ children: "Admin o'chirildi", severity: 'success' })
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
          <CardHeader title='Adminlar' />
          <Button fullWidth={isMobile} variant='contained' onClick={openForm} sx={{ mx: 3, mb: isMobile ? 4 : 0 }}>
            Admin qo'shish
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
          <WithEmptyState show={isFetching || admins.length !== 0}>
            <Table aria-label='simple table' sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Ismi</TableCell>
                  <TableCell>Login</TableCell>
                  <TableCell width='15%'>Boshqarish</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admins.map(admin => (
                  <StripedTableRow key={admin.id}>
                    <TableCell sx={{ position: 'relative' }}>
                      <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                        {admin.name}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ position: 'relative' }}>
                      <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                        {admin.login}
                      </Typography>
                    </TableCell>
                    <TableCell width='15%'>
                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
                        <IconButton onClick={startEditing.bind(null, admin)}>
                          <PencilIcon />
                        </IconButton>
                        {admin.role !== ROLES.SUPER_ADMIN && (
                          <IconButton sx={{ ml: 1 }} onClick={openDeleteConfirmation.bind(null, admin.id)}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    </TableCell>
                  </StripedTableRow>
                ))}
              </TableBody>
            </Table>
          </WithEmptyState>
        </TableContainer>
      </Card>
      <Drawer
        anchor='right'
        open={showForm}
        PaperProps={{ style: { maxWidth: 400 } }}
        sx={{ maxWidth: 400 }}
        onClose={closeForm}
      >
        <AdminsForm onClose={closeForm} initialValues={itemToEdit} />
      </Drawer>

      <AppConfirmationDialog
        isLoading={isDeleteLoading}
        open={showDeleteConfirmDialog}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDelete}
      />
    </>
  )
}

export default AdminsCRUD
