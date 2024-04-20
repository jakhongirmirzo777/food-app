import dynamic from 'next/dynamic'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import MagnifyIcon from 'mdi-material-ui/Magnify'

// ** Components Imports
const AppDateRangePicker = dynamic(() => import('src/@core/components/react-date-range/app-date-range-picker'), {
  ssr: false
})

const OrderFilters = ({ range, handleRangeChange }) => {
  const [search, setSearch] = useState('')
  const isMobile = useMediaQuery(theme => theme.breakpoints.up('sm'))

  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={5} lg={4} pr={isMobile ? 2 : 0}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ backgroundColor: 'common.white' }}>
            <AppDateRangePicker value={range} onChange={handleRangeChange} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={5} lg={4} pl={isMobile ? 2 : 0}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ backgroundColor: 'common.white' }}>
            <TextField
              size='small'
              sx={{ width: '100%' }}
              name='search'
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder='Qidirish'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <MagnifyIcon fontSize='small' />
                  </InputAdornment>
                )
              }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default OrderFilters
