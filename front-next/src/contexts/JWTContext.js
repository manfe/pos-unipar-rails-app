import { createContext, ReactNode, useEffect, useMemo, useReducer, useState } from 'react'
// utils
import axiosInstance from '../utils/axios'
import { useSession, signIn } from "next-auth/react"

const initialState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
}

const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const { data: session, status } = useSession()
  const [state, setState] = useState(initialState)

  useEffect(() => {
    if (session) {
      setState({
        isAuthenticated: true,
        user: session.user,
        accessToken: session.accessToken,
        status: status
      })
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${session.accessToken}`;
    }

    if (status === 'unauthenticated') signIn()
  }, [session])

  return (
    <AuthContext.Provider
      value={{
        ...state
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }