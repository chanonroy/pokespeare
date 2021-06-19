import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { RoutePath } from './@types'
import PrivateRoute from './components/private-route'
import Home from './screens/home'
import Login from './screens/login'
import Saved from './screens/saved'
import SignUp from './screens/sign-up'

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={RoutePath.Home}>
          <Home />
        </Route>
        <Route path={RoutePath.Login}>
          <Login />
        </Route>
        <Route path={RoutePath.SignUp}>
          <SignUp />
        </Route>
        <PrivateRoute path={RoutePath.Saved}>
          <Saved />
        </PrivateRoute>
        <Route path='*'>
          <div>404</div>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
