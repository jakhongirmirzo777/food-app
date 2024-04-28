import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Backdrop from '@mui/material/Backdrop'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Qrcode from 'mdi-material-ui/Qrcode'
import StripedTableRow from '../@core/components/styled/StripedTableRow'

import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from 'react'
import { useGetStatistics } from '../api/hooks/dashboard'
import { formatNumber } from '../utils/formatNumber'
import WithEmptyState from '../@core/components/app-empty-state/with-empty-state'
import QrCodeDialog from '../views/main/QrCodeDialog'
import CircularProgress from '@mui/material/CircularProgress'
import useMediaQuery from '@mui/material/useMediaQuery'

import { ROLES } from 'src/utils/constants/roles'
import AppDateRangePicker from '../@core/components/react-date-range/app-date-range-picker'
import { useTheme } from '@mui/material/styles'

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
const today = new Date().toISOString()
const date = new Date()
date.setDate(date.getDate() - 7)
const sevenDaysBefore = date.toISOString()

const MainPage = () => {
  const theme = useTheme()
  const isMedium = useMediaQuery(theme => theme.breakpoints.down('md'))

  const [qrCodeOpen, setQrCodeOpen] = useState(false)
  const [startDate, setStartDate] = useState(sevenDaysBefore)
  const [endDate, setEndDate] = useState(today)

  const dateRange = useMemo(() => {
    return {
      startDate,
      endDate
    }
  }, [startDate, endDate])

  const { data: statisticsToday = {}, isLoading } = useGetStatistics({
    startDate: today,
    endDate: today
  })

  const { data: statisticsData = {}, isLoading: isLoadingData } = useGetStatistics({
    startDate,
    endDate
  })

  const handleRangeChange = useCallback(({ startDate, endDate }) => {
    setStartDate(startDate.toISOString())
    setEndDate(endDate.toISOString())
  }, [])

  const totalPrice = useMemo(() => {
    return Object.entries(statisticsData).reduce((acc, [_, val]) => {
      return acc + val?.totalCompletedOrdersPrice || 0
    }, 0)
  }, [statisticsData])

  const lineChartStatistics = useMemo(() => {
    const labels = Object.entries(statisticsData).reduce((acc, [key]) => {
      return [...acc, key.split('-').reverse().join('-')]
    }, [])

    const values = Object.entries(statisticsData).reduce((acc, [_, val]) => {
      return [...acc, val?.totalCompletedOrdersPrice || 0]
    }, [])

    return {
      options: {
        chart: {
          id: 'line-chart-statistics'
        },
        xaxis: {
          categories: labels,
          labels: {
            rotateAlways: true
          }
        },
        yaxis: {
          labels: {
            formatter: val => {
              return val / 1000 + 'K'
            }
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return formatNumber(val) + " so'm"
            }
          }
        }
      },
      series: [
        {
          name: 'Jami',
          data: values
        }
      ]
    }
  }, [statisticsData])

  const pieChartStatistics = useMemo(() => {
    const totalNewOrdersPrices = Object.entries(statisticsToday).reduce(
      (acc, [_, { totalNewOrdersPrice }]) => acc + totalNewOrdersPrice,
      0
    )

    const totalPendingOrdersPrices = Object.entries(statisticsToday).reduce(
      (acc, [_, { totalPendingOrdersPrice }]) => acc + totalPendingOrdersPrice,
      0
    )

    const totalCompletedOrdersPrices = Object.entries(statisticsToday).reduce(
      (acc, [_, { totalCompletedOrdersPrice }]) => acc + totalCompletedOrdersPrice,
      0
    )

    const totalRejectedOrdersPrices = Object.entries(statisticsToday).reduce(
      (acc, [_, { totalRejectedOrdersPrice }]) => acc + totalRejectedOrdersPrice,
      0
    )

    const totalDeletedOrdersPrices = Object.entries(statisticsToday).reduce(
      (acc, [_, { totalDeletedOrdersPrice }]) => acc + totalDeletedOrdersPrice,
      0
    )

    return {
      series: [
        totalNewOrdersPrices,
        totalPendingOrdersPrices,
        totalCompletedOrdersPrices,
        totalRejectedOrdersPrices,
        totalDeletedOrdersPrices
      ],
      tooltip: {
        y: {
          formatter: function (val) {
            return formatNumber(val) + " so'm"
          }
        }
      },
      labels: [
        'Yangi buyurtmalar narxi',
        "Bajaruvda bo'lgan buyurtmalar narxi",
        "Tayyor bo'lgan buyurtmalar narxi",
        'Rad etilgan buyurtmalar narxi',
        "O'chirib yuborilgan buyurtmalar narxi"
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }
  }, [statisticsToday])

  const allStatistics = useMemo(() => {
    const totalNewOrdersPrices = Object.entries(statisticsToday).reduce(
      (acc, [_, { totalNewOrdersPrice }]) => acc + totalNewOrdersPrice,
      0
    )

    const totalPendingOrdersPrices = Object.entries(statisticsToday).reduce(
      (acc, [_, { totalPendingOrdersPrice }]) => acc + totalPendingOrdersPrice,
      0
    )

    const totalCompletedOrdersPrices = Object.entries(statisticsToday).reduce(
      (acc, [_, { totalCompletedOrdersPrice }]) => acc + totalCompletedOrdersPrice,
      0
    )

    const totalRejectedOrdersPrices = Object.entries(statisticsToday).reduce(
      (acc, [_, { totalRejectedOrdersPrice }]) => acc + totalRejectedOrdersPrice,
      0
    )

    const totalDeletedOrdersPrices = Object.entries(statisticsToday).reduce(
      (acc, [_, { totalDeletedOrdersPrice }]) => acc + totalDeletedOrdersPrice,
      0
    )

    const totalNewOrders = Object.entries(statisticsToday).reduce(
      (acc, [_, { totalNewOrders }]) => acc + totalNewOrders,
      0
    )

    const totalPendingOrders = Object.entries(statisticsToday).reduce(
      (acc, [_, { totalPendingOrders }]) => acc + totalPendingOrders,
      0
    )

    const totalCompletedOrders = Object.entries(statisticsToday).reduce(
      (acc, [_, { totalCompletedOrders }]) => acc + totalCompletedOrders,
      0
    )

    const totalRejectedOrders = Object.entries(statisticsToday).reduce(
      (acc, [_, { totalRejectedOrders }]) => acc + totalRejectedOrders,
      0
    )

    const totalDeletedOrders = Object.entries(statisticsToday).reduce(
      (acc, [_, { totalDeletedOrders }]) => acc + totalDeletedOrders,
      0
    )

    return {
      totalNewOrders,
      totalNewOrdersPrices,
      totalPendingOrders,
      totalPendingOrdersPrices,
      totalCompletedOrders,
      totalCompletedOrdersPrices,
      totalRejectedOrders,
      totalRejectedOrdersPrices,
      totalDeletedOrders,
      totalDeletedOrdersPrices
    }
  }, [statisticsToday])

  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: isMedium ? 'center' : 'space-between', flexWrap: 'wrap', mb: 4, gap: 4 }}
      >
        <Box sx={{ backgroundColor: 'common.white', height: '40px', width: isMedium ? '100%' : 'unset' }}>
          <AppDateRangePicker value={dateRange} onChange={handleRangeChange} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            flexWrap: 'wrap',
            width: isMedium ? '100%' : 'unset'
          }}
        >
          <div
            style={{
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid rgba(138, 141, 147, 0.5)',
              width: isMedium ? '100%' : 'unset',
              height: '40px',
              backgroundColor: theme.palette.common.white
            }}
          >
            <div
              style={{
                padding: '9px',
                borderRadius: '12px 0 0 12px',
                flex: 1,
                borderRight: '1px solid rgba(138, 141, 147, 0.5)',
                color: theme.palette.common.black,
                fontWeight: 600
              }}
            >
              Jami:
            </div>
            <div style={{ padding: '9px', borderRadius: '0 12px 12px 0', color: theme.palette.primary.contrastText }}>
              {formatNumber(totalPrice)}
            </div>
          </div>
          <Button
            sx={{ height: '40px' }}
            fullWidth={isMedium}
            size='small'
            color='primary'
            variant='contained'
            onClick={() => setQrCodeOpen(true)}
          >
            <Typography component='span' color='white' variant='subtitle2' sx={{ mr: 1 }}>
              QR code
            </Typography>
            <Qrcode fontSize='small' color='white' />
          </Button>
        </Box>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card sx={{ p: 4 }}>
            <CardHeader title="Jami to'langan buyurtmalar narxi" />
            {!isLoadingData && (
              <ApexChart
                options={lineChartStatistics.options}
                series={lineChartStatistics.series}
                type='line'
                height='400px'
                width='100%'
              />
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, height: '100%' }}>
            <CardHeader title="Jami buyurtmalar narxi kategoriya bo'yicha (bugungi)" />
            {!isLoading && (
              <ApexChart
                options={pieChartStatistics}
                series={pieChartStatistics.series}
                type='pie'
                height='400px'
                width='100%'
              />
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, height: '100%' }}>
            <CardHeader title='Jami buyurtmalar (bugungi)' />
            {!isLoading && (
              <TableContainer component={Paper} sx={{ position: 'relative' }}>
                <Backdrop
                  open={isLoading}
                  sx={{
                    zIndex: 100,
                    position: 'absolute',
                    color: '#fff'
                  }}
                >
                  <CircularProgress color='inherit' />
                </Backdrop>
                <WithEmptyState show={!isLoading}>
                  <Table aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nomi</TableCell>
                        <TableCell width='15%' align='center'>
                          Soni
                        </TableCell>
                        <TableCell width='15%' align='center'>
                          Narxi
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <StripedTableRow>
                        <TableCell sx={{ position: 'relative' }}>
                          <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                            Yangi
                          </Typography>
                        </TableCell>
                        <TableCell align='center' width='15%'>
                          <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                            {formatNumber(allStatistics.totalNewOrders)}
                          </Typography>
                        </TableCell>
                        <TableCell width='15%' align='center'>
                          <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                            {formatNumber(allStatistics.totalNewOrdersPrices)}
                          </Typography>
                        </TableCell>
                      </StripedTableRow>
                      <StripedTableRow>
                        <TableCell sx={{ position: 'relative' }}>
                          <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                            Bajaruvda
                          </Typography>
                        </TableCell>
                        <TableCell width='15%' align='center'>
                          <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                            {formatNumber(allStatistics.totalPendingOrders)}
                          </Typography>
                        </TableCell>
                        <TableCell width='15%' align='center'>
                          <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                            {formatNumber(allStatistics.totalPendingOrdersPrices)}
                          </Typography>
                        </TableCell>
                      </StripedTableRow>
                      <StripedTableRow>
                        <TableCell sx={{ position: 'relative' }}>
                          <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                            Tayyor
                          </Typography>
                        </TableCell>
                        <TableCell width='15%' align='center'>
                          <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                            {formatNumber(allStatistics.totalCompletedOrders)}
                          </Typography>
                        </TableCell>
                        <TableCell width='15%' align='center'>
                          <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                            {formatNumber(allStatistics.totalCompletedOrdersPrices)}
                          </Typography>
                        </TableCell>
                      </StripedTableRow>
                      <StripedTableRow>
                        <TableCell sx={{ position: 'relative' }}>
                          <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                            Rad etilgan
                          </Typography>
                        </TableCell>
                        <TableCell width='15%' align='center'>
                          <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                            {formatNumber(allStatistics.totalRejectedOrders)}
                          </Typography>
                        </TableCell>
                        <TableCell width='15%' align='center'>
                          <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                            {formatNumber(allStatistics.totalRejectedOrdersPrices)}
                          </Typography>
                        </TableCell>
                      </StripedTableRow>
                      <StripedTableRow>
                        <TableCell sx={{ position: 'relative' }}>
                          <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                            O'chirilgan
                          </Typography>
                        </TableCell>
                        <TableCell width='15%' align='center'>
                          <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                            {formatNumber(allStatistics.totalDeletedOrders)}
                          </Typography>
                        </TableCell>
                        <TableCell width='15%' align='center'>
                          <Typography sx={{ fontWeight: 500 }} variant='subtitle1'>
                            {formatNumber(allStatistics.totalDeletedOrdersPrices)}
                          </Typography>
                        </TableCell>
                      </StripedTableRow>
                    </TableBody>
                  </Table>
                </WithEmptyState>
              </TableContainer>
            )}
          </Card>
        </Grid>
      </Grid>
      <QrCodeDialog qrCodeOpen={qrCodeOpen} setQrCodeOpen={setQrCodeOpen} />
    </>
  )
}

// Roles
MainPage.getRole = () => ROLES.SUPER_ADMIN

export default MainPage
