// ** MUI imports
import { styled } from '@mui/material/styles'

const ReactSortableWrapperStyled = styled('div')(({ theme }) => ({
  height: '100%',
  position: 'relative',

  '& .sortable-item': {
    border: '2px solid transparent',
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer'
  },

  '& .sortable-item:hover': {
    borderColor: theme.palette.info.main
  },

  '& .is-dragging .sortable-item:hover': {
    borderColor: 'transparent'
  },

  '& .sortable-chosen': {
    borderColor: theme.palette.info.light
  },
  '& .sortable-ghost': {
    border: 'none',
    position: 'relative'
  },
  '& .sortable-ghost::before': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.mode === 'light' ? '#dceffe' : '#3165c3'
  }
}))

export default ReactSortableWrapperStyled
