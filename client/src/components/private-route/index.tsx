import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { RoutePath } from '../../@types'
import { AuthContext } from '../../providers/AuthProvider'

function PrivateRoute({ component: Component, ...props }: any) {
  const { loggedIn } = useContext(AuthContext)

  if (!loggedIn) return <Redirect to={RoutePath.Login} />

  return <Route {...props} render={(props) => <Component {...props} />} />
}

export default PrivateRoute
