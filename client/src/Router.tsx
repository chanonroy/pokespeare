import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './screens/home'
import Login from './screens/login'
import Saved from './screens/saved'

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
					<div>Sign up</div>
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
