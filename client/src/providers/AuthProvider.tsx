import { useApolloClient } from '@apollo/client'
import { createContext, ReactElement, useState } from 'react'
import {
  clearAccessToken,
  getAccessToken,
  saveAccessToken,
} from '../utils/token'

interface AuthContextType {
  loggedIn: boolean
  login: (newAccessToken: string) => void
  logout: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export default function AuthProvider({ children }: { children: ReactElement }) {
  const apolloClient = useApolloClient()
  const [loggedIn, setLoggedIn] = useState(!!getAccessToken())

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        login: (newAccessToken) => {
          apolloClient.clearStore()
          saveAccessToken(newAccessToken)
          setLoggedIn(true)
        },
        logout: () => {
          apolloClient.clearStore()
          clearAccessToken()
          setLoggedIn(false)
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
