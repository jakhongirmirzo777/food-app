// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import LoadingButton from '@mui/lab/LoadingButton'
import CalendarMonthIcon from 'mdi-material-ui/CalendarMonth'

// ** Components Imports
import DateRangePickerCard from './date-range-picker-card'

// ** Utils Imports
import { format, compareAsc, endOfDay, differenceInCalendarDays } from 'date-fns'
import PropTypes from 'prop-types'

const RANGE_KEY = 'selection'

const AppDateRangePicker = ({ value, onChange, onClose, buttonSize = 'medium' }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const [ranges, setRanges] = useState([
    {
      startDate: value.startDate || new Date(),
      endDate: value.endDate || new Date(),
      key: RANGE_KEY
    }
  ])

  useEffect(() => {
    if (anchorEl) {
      setRanges([
        {
          startDate: value.startDate || new Date(),
          endDate: value.endDate || new Date(),
          key: RANGE_KEY
        }
      ])
    }
  }, [anchorEl, value])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    onClose && onClose()
    setAnchorEl(null)
  }

  const handleRangeChange = ranges => {
    setRanges([ranges[RANGE_KEY]])
  }

  const handleSubmit = () => {
    const areDatesEqual = compareAsc(ranges[0].startDate, ranges[0].endDate) === 0

    onChange({
      startDate: ranges[0].startDate,
      endDate: areDatesEqual ? endOfDay(ranges[0].endDate) : ranges[0].endDate
    })

    handleClose()
  }

  const open = Boolean(anchorEl)

  const renderDatesPreview = () => {
    if (!value.startDate || !value.endDate) {
      return 'Select Date Range'
    }

    const areDatesEqual = Math.abs(differenceInCalendarDays(value.startDate, value.endDate)) < 1

    return areDatesEqual ? (
      format(value.startDate, 'dd/MM/uuuu')
    ) : (
      <>
        {format(value.startDate, 'dd/MM/uuuu')} - {format(value.endDate, 'dd/MM/uuuu')}
      </>
    )
  }

  return (
    <div>
      <Button
        color='secondary'
        endIcon={<CalendarMonthIcon />}
        size={buttonSize}
        sx={{ color: 'text.primary' }}
        variant='outlined'
        fullWidth
        onClick={handleClick}
      >
        {renderDatesPreview()}
      </Button>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={handleClose}
      >
        <Card variant='outlined'>
          <DateRangePickerCard value={ranges} onChange={handleRangeChange} />
          <Divider sx={{ my: 0 }} />
          <Box sx={{ p: 3, textAlign: 'right' }}>
            <Button color='secondary' size='small' sx={{ mr: 3 }} variant='outlined' onClick={handleClose}>
              Bekor qilish
            </Button>
            <Button color='primary' size='small' variant='contained' onClick={handleSubmit}>
              Tanlash
            </Button>
          </Box>
        </Card>
      </Popover>
    </div>
  )
}

AppDateRangePicker.propTypes = {
  buttonSize: PropTypes.string,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func
}

export default AppDateRangePicker

export const AppDateRangePickerLoading = () => {
  return (
    <LoadingButton color='secondary' endIcon={<CalendarMonthIcon />} loading={true} size='small' variant='outlined'>
      Loading...
    </LoadingButton>
  )
}
