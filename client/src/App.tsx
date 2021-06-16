import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default function App() {
	console.log('hello')
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<div>Home</div>
				</Route>
				<Route path='/about'>
					<div>About</div>
				</Route>
				<Route path='/dashboard'>
					<div>Dashboard</div>
				</Route>
			</Switch>
		</Router>
	)
}
