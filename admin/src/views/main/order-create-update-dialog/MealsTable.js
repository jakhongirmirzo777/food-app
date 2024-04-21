import { useCallback, useState } from 'react'
import _debounce from 'lodash.debounce'

import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import MagnifyIcon from 'mdi-material-ui/Magnify'
import CloseIcon from 'mdi-material-ui/Close'
import PlusIcon from 'mdi-material-ui/Plus'
import Divider from '@mui/material/Divider'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TablePagination from '@mui/material/TablePagination'
import StripedTableRow from '../../../@core/components/styled/StripedTableRow'
import WithEmptyState from '../../../@core/components/app-empty-state/with-empty-state'
import AppImage from '../../../@core/components/AppImage'

import { formatNumber } from '../../../utils/formatNumber'
import { PAGINATION_VALUE } from '../../../utils/constants/pagination'
import { useGetMeals } from '../../../api/hooks/meals'
import useMediaQuery from '@mui/material/useMediaQuery'

const ROWS_PER_PAGE_OPTIONS = []

const MealsTable = () => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))

  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const offset = page * PAGINATION_VALUE

  const { data: mealsResponse, isFetching } = useGetMeals({ offset, search: searchQuery })
  const meals = mealsResponse?.data ?? []
  const total = mealsResponse?.count ?? 0

  const debounceFn = searchQueryValue => {
    setPage(0)
    setSearchQuery(searchQueryValue)
  }

  const handleSearchQueryChange = useCallback(_debounce(debounceFn, 1000), [])

  const onChangeSearch = e => {
    setSearch(e.target.value)
    handleSearchQueryChange(e.target.value)
  }

  const handleChangePage = async (_, page) => {
    setPage(+page)
  }

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center',
          mb: 4
        }}
      >
        <CardHeader title='Taomlar' />
        <TextField
          sx={{ width: isMobile ? 1 : 300 }}
          size='small'
          name='search'
          value={search}
          onChange={onChangeSearch}
          placeholder='Qidirish'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <MagnifyIcon fontSize='small' />
              </InputAdornment>
            ),
            endAdornment: search && (
              <InputAdornment
                position='end'
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  handleSearchQueryChange('')
                  setSearch('')
                }}
              >
                <CloseIcon fontSize='small' color='error' />
              </InputAdornment>
            )
          }}
        />
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
                <TableCell align='center' width='15%'>
                  Qo'shish
                </TableCell>
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
                  <TableCell width='15%' align='center'>
                    <IconButton>
                      <PlusIcon />
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
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          onPageChange={handleChangePage}
        />
      )}
    </div>
  )
}

export default MealsTable
