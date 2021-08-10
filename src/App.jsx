import { Home } from './pages/Home'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { ContactDetails } from './pages/ContactDetails'
import { Statistic } from './pages/Statistic'
import { ContactApp } from './pages/ContactApp'
import { Header } from './cmps/Header'
import { ContactEdit } from './pages/ContactEdit'
import { Signup } from './pages/Signup'
import { connect } from 'react-redux'

export function _App({ loggedInUser }) {
	const PrivateRoute = props => {
		return loggedInUser ? (
			<Route path={props.path} component={props.component} />
		) : (
			<Redirect to='/signup' />
		)
	}

	return (
		<Router>
			<main className='App'>
				<Header />
				<Switch>
					<PrivateRoute path='/contact/edit/:id?' component={ContactEdit} />
					<PrivateRoute path='/contact/:id' component={ContactDetails} />
					<PrivateRoute path='/contact' component={ContactApp} />
					<PrivateRoute path='/statistic' component={Statistic} />
					<Route path='/signup' component={Signup} />
					<PrivateRoute exact path='/' component={Home} />
				</Switch>
			</main>
		</Router>
	)
}

const mapStateToProps = state => {
	return {
		loggedInUser: state.userModule.loggedInUser,
	}
}

export const App = connect(mapStateToProps)(_App)
