import { Component } from 'react'
import { connect } from 'react-redux'
import bitcoinIcon from '../assets/icons/bitcoin.png'
import { signup } from '../store/actions/userActions.js'

class _Signup extends Component {
	state = {
		name: '',
	}

	handleChange = ({ target }) => {
		var field = target.id
		var value = target.type === 'number' ? +target.value : target.value
		this.setState({ [field]: value })
	}

	onSignup = async () => {
		const { name } = this.state
		if (!name) return
		await this.props.signup(name)
		this.props.history.push('/')
	}

	render() {
		const { name } = this.state
		return (
			<section className='signup'>
				<img src={bitcoinIcon} alt='bitcoin' className='icon-lg' />
				<label htmlFor='name'>Please enter your name:</label>
				<input type='text' value={name} id='name' onChange={this.handleChange} autoComplete='off' />
				<button onClick={this.onSignup}>Sign Up</button>
			</section>
		)
	}
}

const mapDispatchToProps = {
	signup,
}

export const Signup = connect(undefined, mapDispatchToProps)(_Signup)
