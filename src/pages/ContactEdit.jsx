import { useState, useEffect } from 'react'
import { contactService } from '../services/contact-service.js'
import { Link } from 'react-router-dom'
import backIcon from '../assets/icons/back.png'
import trashIcon from '../assets/icons/delete.png'
import { useSelector, useDispatch } from 'react-redux'
import { getContactById, saveContact, removeContact } from '../store/actions/contactActions.js'
import { useParams, useHistory } from 'react-router-dom'

export const ContactEdit = () => {
	const { currContact } = useSelector(state => state.contactModule)
	const dispatch = useDispatch()
	const [contact, setContact] = useState({})
	const { id } = useParams()
	const history = useHistory()

	useEffect(() => {
		;(async () => {
			await loadContact()
		})()
		// eslint-disable-next-line
	}, [currContact])

	const loadContact = async () => {
		if (id) {
			await dispatch(getContactById(id))
			setContact(currContact)
		}
		return contactService.getEmptyContact()
	}

	const handleSubmit = async ev => {
		ev.preventDefault()
		await dispatch(saveContact(contact))
		history.push('/contact')
	}

	const handleChange = ({ target }) => {
		var field = target.id
		var value = target.type === 'number' ? +target.value : target.value
		setContact(prevContact => ({ ...prevContact, [field]: value }))
	}

	const onRemoveContact = async () => {
		await dispatch(removeContact(contact._id))
		history.push('/contact')
	}

	if (!contact) return <div>Loading...</div>
	const { _id, name, phone, email } = contact
	return (
		<section className='contact-edit'>
			<section className='actions'>
				<Link to={_id ? `/contact/${_id}` : '/contact'}>
					<img src={backIcon} alt='back' />
				</Link>
				<button onClick={onRemoveContact}>
					<img src={trashIcon} alt='trash' />
				</button>
			</section>

			<section className='flex-container'>
				<img src={`https://robohash.org/${_id}`} alt='contact' />
			</section>
			<form className='main-layout'>
				<label>
					Name:
					<input type='text' id='name' value={name} onChange={handleChange} />
				</label>
				<label htmlFor='phone'>
					Phone:
					<input type='text' id='phone' value={phone} onChange={handleChange} />
				</label>
				<label htmlFor='email'>
					Email:
					<input type='text' id='email' value={email} onChange={handleChange} />
				</label>
				<section className='flex-container'>
					<button onClick={handleSubmit}>Save</button>
				</section>
			</form>
		</section>
	)
}
