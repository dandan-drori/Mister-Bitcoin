import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import bitcoinIcon from '../assets/icons/bitcoin.png'
import { signup } from '../store/actions/userActions.js'
import { useHistory } from 'react-router-dom'

export const Signup = () => {
	const [fields, setFields] = useState({ name: '' })
	const dispatch = useDispatch()
	const inputRef = useRef(null)
	const history = useHistory()

	useEffect(() => {
		inputRef.current.focus()
	}, [inputRef])

	const handleChange = ({ target }) => {
		var field = target.id
		var value = target.type === 'number' ? +target.value : target.value
		setFields({ [field]: value })
	}

	const onSignup = async () => {
		const { name } = fields
		if (!name) return
		await dispatch(signup(name))
		history.push('/')
	}

	return (
		<section className='signup'>
			<img src={bitcoinIcon} alt='bitcoin' className='icon-lg' />
			<label htmlFor='name'>Please enter your name:</label>
			<input
				type='text'
				value={fields.name}
				id='name'
				onChange={handleChange}
				autoComplete='off'
				ref={inputRef}
			/>
			<button onClick={onSignup}>Sign Up</button>
		</section>
	)
}
