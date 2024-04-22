import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import { useGetCurrentAdmin } from 'src/api/hooks/admins'
import { useAuthContext } from 'src/@core/context/authContext'

import { setupAxiosInterceptors } from 'src/api/axios'

export const useAuth = () => {
  const router = useRouter()

  const { role, user, isLogged, setUserInfo, resetUser, isLoading, isRolesChecking, setRolesChecking } =
    useAuthContext()

  const handleRefetchTokenFail = () => {
    resetUser()
    router.push('/login')
  }

  const initialSetup = useRef(true)
  if (initialSetup.current) {
    setupAxiosInterceptors(handleRefetchTokenFail)
    initialSetup.current = false
  }

  const { refetch: fetchAdmin } = useGetCurrentAdmin({
    onSuccess(data) {
      setUserInfo(data)
    }
  })

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')

    if (!accessToken) {
      router.push('/login')
    } else {
      fetchAdmin()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isLogged) {
      if (role && role !== user.role) {
        router.push('/orders')
        setTimeout(() => {
          setRolesChecking(false)
        }, 200)
      } else {
        setRolesChecking(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, isLogged, role])

  return { isLoading: isLoading || isRolesChecking }
}
