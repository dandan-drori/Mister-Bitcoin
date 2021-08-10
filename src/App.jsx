import { Home } from './pages/Home'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { ContactDetails } from './pages/ContactDetails'
import { Statistic } from './pages/Statistic'
import { ContactApp } from './pages/ContactApp'
import { Header } from './cmps/Header'
import { ContactEdit } from './pages/ContactEdit'

export function App() {
	return (
		<Router>
			<main className='App'>
				<Header />
				<Switch>
					<Route path='/contact/edit/:id?' component={ContactEdit} />
					<Route path='/contact/:id' component={ContactDetails} />
					<Route path='/contact' component={ContactApp} />
					<Route path='/statistic' component={Statistic} />
					<Route exact path='/' component={Home} />
				</Switch>
			</main>
		</Router>
	)
}
