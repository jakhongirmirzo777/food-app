import { useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
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
import MagnifyIcon from 'mdi-material-ui/Magnify'

// ** Components Imports
import AppImage from 'src/@core/components/AppImage'
import AppConfirmationDialog from 'src/@core/components/AppConfirmationDialog'
import StripedTableRow from 'src/@core/components/styled/StripedTableRow'
import WithEmptyState from 'src/@core/components/app-empty-state/with-empty-state'
import MealsForm from './MealsForm'

// ** Hooks Imports
import { useSnackbar } from 'src/@core/context/snackbarContext'
import { useGetMeals, useDeleteMeal } from 'src/api/hooks/meals'
import { usePagination } from 'src/@core/hooks/use-pagination'

import { formatNumber } from 'src/utils/formatNumber'
import { PAGINATION_VALUE } from 'src/utils/constants/pagination'

const MealsCRUD = () => {
  const [page, updatePage] = usePagination()

  const [search, setSearch] = useState('')

  const offset = page * PAGINATION_VALUE

  const { data: mealsResponse, isFetching } = useGetMeals({ offset, search })
  const meals = mealsResponse?.data ?? []
  const total = mealsResponse?.count ?? 0

  const handleSearchChange = e => {
    setSearch(e.target.value)
    updatePage(0)
  }

  const handleChangePage = async (_, page) => {
    updatePage(page)
  }

  const [showForm, setShowForm] = useState(false)

  const [itemToEdit, setItemToEdit] = useState(null)
  const openForm = () => setShowForm(true)

  const closeForm = () => {
    if (itemToEdit) setItemToEdit(null)
    setShowForm(false)
  }

  const startEditing = item => {
    setItemToEdit({
      ...item,
      category: {
        id: item.categoryId
      }
    })
    setShowForm(true)
  }

  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false)
  const [itemToDeleteId, setItemToDeleteId] = useState(null)

  const openDeleteConfirmation = id => {
    setItemToDeleteId(id)
    setShowDeleteConfirmDialog(true)
  }
  const closeDeleteConfirmation = () => setShowDeleteConfirmDialog(false)
  const { mutate, isLoading: isDeleteLoading } = useDeleteMeal()

  const { setSnackbar } = useSnackbar()

  const handleDelete = () => {
    mutate(itemToDeleteId, {
      onSuccess() {
        setSnackbar({ children: "Categoriya o'chirildi", severity: 'success' })
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
            alignItems: 'center'
          }}
        >
          <CardHeader title='Taomlar' />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              size='small'
              sx={{ width: 300 }}
              name='search'
              value={search}
              onChange={handleSearchChange}
              placeholder='Qidirish'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <MagnifyIcon fontSize='small' />
                  </InputAdornment>
                )
              }}
            />
            <CardHeader
              sx={{ p: 3, pr: 5 }}
              title={
                <Button variant='contained' onClick={openForm}>
                  Taom qo'shish
                </Button>
              }
            />
          </Box>
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
          <WithEmptyState show={isFetching || meals.length !== 0}>
            <Table aria-label='simple table' sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Taom Nomi</TableCell>
                  <TableCell align='center'>Narxi</TableCell>
                  <TableCell align='center'>Rasmi</TableCell>
                  <TableCell width='15%'>Boshqarish</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meals.map(meal => (
                  <StripedTableRow key={meal.id}>
                    <TableCell sx={{ position: 'relative' }}>
                      <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                        {meal.title}
                      </Typography>
                      <Typography variant='body2'>{meal.description}</Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography color='primary' sx={{ fontWeight: 500 }} variant='subtitle1'>
                        {formatNumber(meal.price)} so'm
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                      <AppImage
                        alt='Category image'
                        src={meal.imageUrl}
                        sx={{
                          borderRadius: '5px',
                          height: { xs: 55, xl: 75 },
                          width: { xs: 80, xl: 100 }
                        }}
                      />
                    </TableCell>
                    <TableCell width='15%'>
                      <IconButton onClick={startEditing.bind(null, meal)}>
                        <PencilIcon />
                      </IconButton>
                      <IconButton sx={{ ml: 1 }} onClick={openDeleteConfirmation.bind(null, meal.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </StripedTableRow>
                ))}
              </TableBody>
            </Table>
          </WithEmptyState>
        </TableContainer>
        {meals.length !== 0 && (
          <TablePagination
            component='div'
            count={total}
            page={page}
            rowsPerPage={PAGINATION_VALUE}
            rowsPerPageOptions={[]}
            onPageChange={handleChangePage}
          />
        )}
      </Card>
      <Dialog maxWidth='xl' open={showForm} fullWidth onClose={closeForm}>
        <DialogContent sx={{ textAlign: 'center' }}>
          <MealsForm onClose={closeForm} initialValues={itemToEdit} />
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

export default MealsCRUD
