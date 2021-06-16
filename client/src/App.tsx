import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './screens/home'

export default function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route path='/login'>
					<div>Login</div>
				</Route>
				<Route path='/sign-up'>
					<div>Sign up</div>
				</Route>
				<Route path='/saved'>
					<div>My saved pokemon</div>
				</Route>
				<Route path='*'>
					<div>404</div>
				</Route>
			</Switch>
		</Router>
	)
}
