// ** MUI Imports
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'

const StripedTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}))

export default StripedTableRow
