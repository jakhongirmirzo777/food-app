import dynamic from 'next/dynamic'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Components Imports
const AppDateRangePicker = dynamic(() => import('src/@core/components/react-date-range/app-date-range-picker'), {
  ssr: false
})

const OrderFilters = ({ range, handleRangeChange }) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={5} lg={4}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ backgroundColor: 'common.white' }}>
            <AppDateRangePicker value={range} onChange={handleRangeChange} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default OrderFilters
