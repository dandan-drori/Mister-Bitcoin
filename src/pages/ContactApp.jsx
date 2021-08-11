import { useEffect } from 'react'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import { Link } from 'react-router-dom'
import plusIcon from '../assets/icons/plus.png'
import { loadContacts } from '../store/actions/contactActions.js'
import { useSelector, useDispatch } from 'react-redux'

export const ContactApp = () => {
	const { contacts } = useSelector(state => state.contactModule)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadContacts())
		// eslint-disable-next-line
	}, [])

	return (
		<section className='contact-app main-layout'>
			<ContactFilter />
			<Link to='/contact/edit'>
				<img src={plusIcon} alt='plus' />
			</Link>
			<ContactList contacts={contacts} />
		</section>
	)
}
