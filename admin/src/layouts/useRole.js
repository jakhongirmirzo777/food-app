import { useAuthContext } from 'src/@core/context/authContext'

export const useRole = () => {
  const { user } = useAuthContext()

  return requiredRole => {
    if (!requiredRole) return true

    return requiredRole === user?.role
  }
}
