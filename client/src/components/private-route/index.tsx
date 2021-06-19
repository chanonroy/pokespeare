import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { RoutePath } from '../../@types'
import { getAccessToken } from '../../token'

function PrivateRoute({ component: Component, ...props }: any) {
  const isAuthenticated = !!getAccessToken()

  if (!isAuthenticated) return <Redirect to={RoutePath.Login} />

  return <Route {...props} render={(props) => <Component {...props} />} />
}

export default PrivateRoute
