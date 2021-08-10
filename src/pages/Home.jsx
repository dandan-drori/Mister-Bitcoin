import { Component } from 'react'
import { bitcoinService } from '../services/bitcoin-service.js'
import coinsIcon from '../assets/icons/coins.png'
import contactIcon from '../assets/icons/contact.png'
import bitcoinIcon from '../assets/icons/bitcoin.png'
import { connect } from 'react-redux'
import { initUser } from '../store/actions/userActions.js'
import { MovesList } from '../cmps/MovesList'

class _Home extends Component {
	state = {
		bitcoinRate: null,
	}

	async componentDidMount() {
		try {
			// await this.props.initUser()
			const bitcoinRate = await bitcoinService.getRate(this.props.loggedInUser.coins)
			this.setState({ bitcoinRate })
		} catch (err) {
			console.log(err)
		}
	}

	render() {
		if (!this.props.loggedInUser) return <div>Loading...</div>
		const { name, coins, moves } = this.props.loggedInUser
		const { bitcoinRate } = this.state
		return (
			<section className='home'>
				<section className='card'>
					<img src={contactIcon} alt='user' className='icon icon-lg' />
					<p>Hello, {name}</p>
					<p>
						<img src={coinsIcon} alt='coins' className='icon icon-home' />
						Coins: {coins}
					</p>

					<p>
						<img src={bitcoinIcon} alt='coins' className='icon icon-home' />
						BTC: {bitcoinRate}
					</p>
				</section>
				<MovesList moves={moves.slice(0, 3)} title='Your Last 3 Moves:' />
			</section>
		)
	}
}

const mapStateToProps = state => {
	return {
		loggedInUser: state.userModule.loggedInUser,
	}
}

const mapDispatchToProps = {
	initUser,
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)
