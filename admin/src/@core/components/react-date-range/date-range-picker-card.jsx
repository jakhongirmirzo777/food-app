// ** MUI Imports
import { useTheme } from '@emotion/react'

// ** Components Imports
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import {
  DateRangePicker,
  // eslint-disable-next-line no-unused-vars
  defaultStaticRanges,
  // eslint-disable-next-line no-unused-vars
  createStaticRanges
} from 'react-date-range'
import ReactDateRangeWrapperStyled from 'src/@core/styles/libs/react-date-range-wrapper-styled'

// ** Utils Imports
import PropTypes from 'prop-types'
import { subYears } from 'date-fns'

const DateRangePickerCard = ({ value, onChange }) => {
  const theme = useTheme()

  const today = new Date()
  const lastYear = subYears(today, 1)

  const staticRanges = createStaticRanges([
    ...defaultStaticRanges,
    {
      label: 'Last Year',
      range: () => ({
        startDate: lastYear,
        endDate: today
      })
    }
  ])

  return (
    <ReactDateRangeWrapperStyled>
      <DateRangePicker
        endDatePlaceholder='End Date'
        inputRanges={[]}
        rangeColors={[theme.palette.primary.main]}
        ranges={value}
        startDatePlaceholder='Start Date'
        staticRanges={[]}
        onChange={onChange}
      />
    </ReactDateRangeWrapperStyled>
  )
}

DateRangePickerCard.propTypes = {
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default DateRangePickerCard
