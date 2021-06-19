import { createContext, ReactElement, useState } from 'react'
import { clearAccessToken, getAccessToken, saveAccessToken } from '../token'

interface AuthContextType {
  loggedIn: boolean
  login: (newAccessToken: string) => void
  logout: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export default function AuthProvider({ children }: { children: ReactElement }) {
  const [loggedIn, setLoggedIn] = useState(!!getAccessToken())

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        login: (newAccessToken) => {
          // todo: clear Apollo cache
          saveAccessToken(newAccessToken)
          setLoggedIn(true)
        },
        logout: () => {
          // todo: clear Apollo cache
          clearAccessToken()
          setLoggedIn(false)
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
