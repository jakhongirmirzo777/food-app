import React, { createContext, useCallback, useState, useContext } from 'react'

export const AuthContext = createContext({
  isLoading: true,
  isRolesChecking: true,
  isLogged: false,
  user: null,
  setLoading: () => {},
  setRolesChecking: () => {},
  setUserInfo: () => {},
  resetUser: () => {}
})

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({ role, children }) => {
  const [user, setUser] = useState(null)
  const [isLogged, setLogged] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isRolesChecking, setRolesChecking] = useState(true)

  const setUserInfo = useCallback(user => {
    setIsLoading(false)
    setLogged(true)
    setUser(user)
  }, [])

  const resetUser = useCallback(() => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_id')
    setLogged(false)
    setIsLoading(true)
    setRolesChecking(true)
    setUser(null)
  }, [])

  const contextValue = {
    role,
    user,
    isLoading,
    isRolesChecking,
    isLogged,
    setUserInfo,
    setRolesChecking,
    resetUser
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
