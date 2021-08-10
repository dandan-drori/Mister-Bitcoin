import { Component } from 'react'
import { userService } from '../services/user-service.js'
import { bitcoinService } from '../services/bitcoin-service.js'
import coinsIcon from '../assets/icons/coins.png'
import contactIcon from '../assets/icons/contact.png'
import bitcoinIcon from '../assets/icons/bitcoin.png'

export class Home extends Component {
	state = {
		user: {},
		bitcoinRate: null,
	}

	componentDidMount() {
		const user = userService.getUser()
		this.setState({ user }, async () => {
			try {
				const bitcoinRate = await bitcoinService.getRate(this.state.user.coins)
				this.setState({ bitcoinRate })
			} catch (err) {
				console.log(err)
			}
		})
	}

	render() {
		const { name, coins } = this.state.user
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
						Bitcoin Rate: 1 Cent is {bitcoinRate} Bitcoin
					</p>
				</section>
			</section>
		)
	}
}
