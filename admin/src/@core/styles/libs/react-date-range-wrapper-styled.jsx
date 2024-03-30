// ** MUI imports
import { styled } from '@mui/material/styles'

const ReactDateRangeWrapperStyled = styled('div')(({ theme }) => ({
  '& .rdrDateRangePickerWrapper': {
    '&, & button, & select, & input': {
      fontFamily: `${theme.typography.fontFamily} !important`
    },

    '& .rdrStaticRange': {
      fontSize: theme.typography.caption.fontSize,
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.divider,

      '&:hover': {
        backgroundColor: theme.palette.action.hover,

        '& span': {
          backgroundColor: 'inherit'
        }
      }
    },

    '& .rdrDefinedRangesWrapper': {
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.divider,
      width: 0
    },

    '& .rdrCalendarWrapper': {
      backgroundColor: theme.palette.background.paper
    },

    '& .rdrDateDisplayWrapper': {
      backgroundColor: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.divider}`
    },

    '& .rdrDateDisplayItem': {
      backgroundColor: 'transparent',
      border: `1px solid ${theme.palette.divider}`,
      color: theme.palette.text.primary,
      boxShadow: theme.shadows[2],

      '& input': {
        color: 'inherit'
      },

      '&.rdrDateDisplayItemActive': {
        borderColor: theme.palette.primary.main
      }
    },

    '& .rdrWeekDay': {
      color: `${theme.palette.text.secondary} !important`
    },

    '& .rdrDays button': {
      color: `${theme.palette.text.primary} !important`,

      '&.rdrDayPassive': {
        color: `${theme.palette.text.disabled} !important`
      },

      '& span': {
        fontWeight: 400,
        color: 'inherit'
      }
    },

    '& .rdrMonthAndYearPickers select': {
      color: `${theme.palette.text.primary} !important`,
      background: `url(
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${theme.palette.text.primary}'><path d='M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z'></path></svg>"
      )`,
      backgroundSize: '16px',
      backgroundPosition: 'calc(100% - 5px) 10px',
      backgroundRepeat: 'no-repeat',
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      appearance: 'none',
      paddingRight: '25px',

      '& option': {
        backgroundColor: theme.palette.background.paper
      }
    },

    '& .rdrYearPicker select': {
      paddingRight: '30px'
    },

    '& .rdrNextPrevButton': {
      backgroundColor: theme.palette.action.selected,

      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
    },

    '& .rdrNextButton i': {
      borderColor: `transparent transparent transparent ${theme.palette.text.primary}`
    },
    '& .rdrPprevButton i': {
      borderColor: `transparent ${theme.palette.text.primary} transparent transparent`
    }
  }
}))

export default ReactDateRangeWrapperStyled
