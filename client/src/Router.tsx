import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './screens/home'
import Login from './screens/login'
import Saved from './screens/saved'
import SignUp from './screens/sign-up'

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/sign-up'>
          <SignUp />
        </Route>
        <Route path='/saved'>
          <Saved />
        </Route>
        <Route path='*'>
          <div>404</div>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
