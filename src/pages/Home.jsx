import { useState, useEffect } from 'react'
import { bitcoinService } from '../services/bitcoin-service.js'
import coinsIcon from '../assets/icons/coins.png'
import contactIcon from '../assets/icons/contact.png'
import bitcoinIcon from '../assets/icons/bitcoin.png'
// import { initUser } from '../store/actions/userActions.js'
import { MovesList } from '../cmps/MovesList'
import { useSelector } from 'react-redux'

export const Home = () => {
	const [bitcoinRate, setBitcoinRate] = useState(null)
	const { loggedInUser } = useSelector(state => state.userModule)
	// const dispatch = useDispatch()

	useEffect(() => {
		;(async () => {
			try {
				// await dispatch(initUser())
				const bitcoinRate = await bitcoinService.getRate(loggedInUser.coins)
				setBitcoinRate(bitcoinRate)
			} catch (err) {
				console.log(err)
			}
		})()
	}, [loggedInUser.coins])

	const { name, coins, moves } = loggedInUser
	if (!loggedInUser) return <div>Loading...</div>
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
