// ** React Imports
import { useState, Fragment, useMemo } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Drawer from '@mui/material/Drawer'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import SettingsHelper from 'mdi-material-ui/Cog'

// ** Hooks Imports
import { useAuthContext } from 'src/@core/context/authContext'

// ** Components Imports
import AdminsForm from 'src/views/admins/AdminsForm'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const openForm = () => {
    setAnchorEl(null)

    setShowForm(true)
  }
  const closeForm = () => setShowForm(false)

  const router = useRouter()

  const { resetUser, user } = useAuthContext()

  const userFormValues = useMemo(() => {
    return {
      id: user?.id,
      name: user?.name,
      login: user?.login,
      password: ''
    }
  }, [user])

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleLogout = () => {
    resetUser()
    handleDropdownClose('/login')
  }

  return (
    <Fragment>
      <Avatar
        alt='John Doe'
        onClick={handleDropdownOpen}
        sx={{ width: 40, height: 40, cursor: 'pointer' }}
        src='/images/avatar.png'
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar alt={user?.name} src='/images/avatar.png' sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{user?.name}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ py: 2 }} onClick={openForm}>
          <SettingsHelper sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          O'zgartirish
        </MenuItem>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>

      <Drawer
        anchor='right'
        open={showForm}
        PaperProps={{ style: { width: 400 } }}
        sx={{ width: 400 }}
        onClose={closeForm}
      >
        <AdminsForm onClose={closeForm} initialValues={userFormValues} />
      </Drawer>
    </Fragment>
  )
}

export default UserDropdown
