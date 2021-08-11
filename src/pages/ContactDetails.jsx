import { useState, useEffect } from 'react'
import { contactService } from '../services/contact-service.js'
import { Link } from 'react-router-dom'
import backIcon from '../assets/icons/back.png'
import pencilIcon from '../assets/icons/edit.png'
import { TransferFund } from '../cmps/TransferFund'
import { MovesList } from '../cmps/MovesList'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const ContactDetails = () => {
	const [contact, setContact] = useState({})
	const { loggedInUser } = useSelector(state => state.userModule)

	const { id } = useParams()
	useEffect(() => {
		;(async () => {
			try {
				const contact = await contactService.getContactById(id)
				setContact(contact)
			} catch (err) {
				console.log(err)
			}
		})()
	}, [id])

	const getMoves = () => {
		if (!loggedInUser) return []
		return loggedInUser.moves.filter(move => {
			return move.toId === contact._id
		})
	}

	const { _id, name, email, phone } = contact
	return (
		<section className='contact-details-container'>
			<section className='links'>
				<Link to='/contact'>
					<img src={backIcon} alt='back' />
				</Link>
				<Link to={`/contact/edit/${_id}`}>
					<img src={pencilIcon} alt='pencil' />
				</Link>
			</section>
			<section className='contact-details main-layout'>
				<img src={`https://robohash.org/${_id}`} alt='contact' />
				<p>Name: {name}</p>
				<p>Phone: {phone}</p>
				<p>Email: {email}</p>
			</section>
			<TransferFund contact={contact} />
			<MovesList moves={getMoves()} title='Your Moves:' />
		</section>
	)
}
