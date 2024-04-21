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
import StripedTableRow from '../@core/components/styled/StripedTableRow'

import { useGetStatistics } from '../api/hooks/dashboard'
import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { formatNumber } from '../utils/formatNumber'
import CircularProgress from '@mui/material/CircularProgress'
import WithEmptyState from '../@core/components/app-empty-state/with-empty-state'

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const MainPage = () => {
  const [startDate, setStartDate] = useState('2024-04-14')
  const [endDate, setEndDate] = useState('2024-04-21')

  const { data: statistics = {}, isLoading, isFetching } = useGetStatistics({ startDate, endDate })

  const barChartStatistics = useMemo(() => {
    const labels = Object.entries(statistics)
      .reverse()
      .reduce((acc, [key]) => {
        return [...acc, key.split('-').reverse().join('-')]
      }, [])

    const values = Object.entries(statistics)
      .reverse()
      .reduce((acc, [_, val]) => {
        return [...acc, val?.totalPrice || 0]
      }, [])

    return {
      options: {
        chart: {
          id: 'bar-chart-statistics'
        },
        xaxis: {
          categories: labels
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
          name: 'Jami buyurtmalar narxi',
          data: values
        }
      ]
    }
  }, [statistics])

  const stackedBarChartStatistics = useMemo(() => {
    const labels = Object.entries(statistics)
      .reverse()
      .reduce((acc, [key]) => {
        return [...acc, key.split('-').reverse().join('-')]
      }, [])

    const totalNewOrdersAll = []
    const totalPendingOrdersAll = []
    const totalCompletedOrdersAll = []
    const totalRejectedOrdersAll = []
    const totalDeletedOrdersAll = []

    Object.entries(statistics)
      .reverse()
      .forEach(
        ([
          key,
          { totalNewOrders, totalPendingOrders, totalCompletedOrders, totalRejectedOrders, totalDeletedOrders }
        ]) => {
          totalNewOrdersAll.push(totalNewOrders)
          totalPendingOrdersAll.push(totalPendingOrders)
          totalCompletedOrdersAll.push(totalCompletedOrders)
          totalRejectedOrdersAll.push(totalRejectedOrders)
          totalDeletedOrdersAll.push(totalDeletedOrders)
        }
      )

    return {
      series: [
        {
          name: 'Yangi buyurtmalar',
          data: totalNewOrdersAll
        },
        {
          name: "Bajaruvda bo'lgan buyurtmalar",
          data: totalPendingOrdersAll
        },
        {
          name: "Tayyor bo'lgan buyurtmalar",
          data: totalCompletedOrdersAll
        },
        {
          name: 'Rad etilgan buyurtmalar',
          data: totalRejectedOrdersAll
        },
        {
          name: "O'chirib yuborilgan buyurtmalar",
          data: totalDeletedOrdersAll
        }
      ],
      chart: {
        type: 'bar',
        stacked: true,
        stackType: '100%'
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: '13px',
                fontWeight: 900
              }
            }
          }
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: labels
      },
      yaxis: {
        title: {
          text: undefined
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    }
  }, [statistics])

  const pieChartStatistics = useMemo(() => {
    const totalNewOrdersPrices = Object.entries(statistics).reduce(
      (acc, [_, { totalNewOrdersPrice }]) => acc + totalNewOrdersPrice,
      0
    )

    const totalPendingOrdersPrices = Object.entries(statistics).reduce(
      (acc, [_, { totalPendingOrdersPrice }]) => acc + totalPendingOrdersPrice,
      0
    )

    const totalCompletedOrdersPrices = Object.entries(statistics).reduce(
      (acc, [_, { totalCompletedOrdersPrice }]) => acc + totalCompletedOrdersPrice,
      0
    )

    const totalRejectedOrdersPrices = Object.entries(statistics).reduce(
      (acc, [_, { totalRejectedOrdersPrice }]) => acc + totalRejectedOrdersPrice,
      0
    )

    const totalDeletedOrdersPrices = Object.entries(statistics).reduce(
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
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }
  }, [statistics])

  const allStatistics = useMemo(() => {
    const totalNewOrdersPrices = Object.entries(statistics).reduce(
      (acc, [_, { totalNewOrdersPrice }]) => acc + totalNewOrdersPrice,
      0
    )

    const totalPendingOrdersPrices = Object.entries(statistics).reduce(
      (acc, [_, { totalPendingOrdersPrice }]) => acc + totalPendingOrdersPrice,
      0
    )

    const totalCompletedOrdersPrices = Object.entries(statistics).reduce(
      (acc, [_, { totalCompletedOrdersPrice }]) => acc + totalCompletedOrdersPrice,
      0
    )

    const totalRejectedOrdersPrices = Object.entries(statistics).reduce(
      (acc, [_, { totalRejectedOrdersPrice }]) => acc + totalRejectedOrdersPrice,
      0
    )

    const totalDeletedOrdersPrices = Object.entries(statistics).reduce(
      (acc, [_, { totalDeletedOrdersPrice }]) => acc + totalDeletedOrdersPrice,
      0
    )

    const totalNewOrders = Object.entries(statistics).reduce((acc, [_, { totalNewOrders }]) => acc + totalNewOrders, 0)

    const totalPendingOrders = Object.entries(statistics).reduce(
      (acc, [_, { totalPendingOrders }]) => acc + totalPendingOrders,
      0
    )

    const totalCompletedOrders = Object.entries(statistics).reduce(
      (acc, [_, { totalCompletedOrders }]) => acc + totalCompletedOrders,
      0
    )

    const totalRejectedOrders = Object.entries(statistics).reduce(
      (acc, [_, { totalRejectedOrders }]) => acc + totalRejectedOrders,
      0
    )

    const totalDeletedOrders = Object.entries(statistics).reduce(
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
  }, [statistics])

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 4 }}>
          <CardHeader title='Jami buyurtmalar narxi' />
          {!isLoading && (
            <ApexChart
              options={barChartStatistics.options}
              series={barChartStatistics.series}
              type='bar'
              height='400px'
              width='100%'
            />
          )}
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 4 }}>
          <CardHeader title='Jami buyurtmalar soni' />
          {!isLoading && (
            <ApexChart
              options={stackedBarChartStatistics}
              series={stackedBarChartStatistics.series}
              type='bar'
              height='400px'
              width='100%'
            />
          )}
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 4 }}>
          <CardHeader title="Jami buyurtmalar narxi kategoriya bo'yicha" />
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
          <CardHeader title='Jami buyurtmalar' />
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
                <Table aria-label='simple table' sx={{ minWidth: 650 }}>
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
  )
}

export default MainPage
