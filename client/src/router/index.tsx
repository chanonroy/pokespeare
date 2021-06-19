import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { RoutePath } from '../@types'
import PrivateRoute from '../components/private-route'
import Home from '../screens/home'
import Login from '../screens/login'
import SignUp from '../screens/sign-up'

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path={RoutePath.Home}>
          <Home />
        </PrivateRoute>
        <Route path={RoutePath.Login}>
          <Login />
        </Route>
        <Route path={RoutePath.SignUp}>
          <SignUp />
        </Route>
        <Route path='*'>
          <div>404</div>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
