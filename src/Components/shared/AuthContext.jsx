/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'

const AUTH_STORAGE_KEY = 'xentova-authenticated'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
  })

  const value = useMemo(() => ({
    isAuthenticated,
    login() {
      window.localStorage.setItem(AUTH_STORAGE_KEY, 'true')
      setIsAuthenticated(true)
    },
    logout() {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
      setIsAuthenticated(false)
    },
  }), [isAuthenticated])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
