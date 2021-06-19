import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { RoutePath } from '../../@types'
import { getAccessToken } from '../../token'

function PrivateRoute({ component: Component, ...props }: any) {
  const isAuthenticated = !!getAccessToken()

  return (
    <Route
      {...props}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={RoutePath.Login} />
        )
      }
    />
  )
}

export default PrivateRoute
