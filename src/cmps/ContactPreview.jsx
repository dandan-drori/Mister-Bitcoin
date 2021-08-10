import React from 'react'
import { Link } from 'react-router-dom'
import trashIcon from '../assets/icons/delete.png'
import pencilIcon from '../assets/icons/edit.png'

export function ContactPreview({ contact, onRemoveContact }) {
	return (
		<li className='contact-preview simple-card-preview'>
			<Link to={`/contact/${contact._id}`}>
				<img src={`https://robohash.org/${contact._id}`} alt='contact' />
				<h2>{contact.name}</h2>
			</Link>
			<section className='actions'>
				<button onClick={() => onRemoveContact(contact._id)}>
					<img src={trashIcon} alt='trash' className='icon icon-preview' />
				</button>
				<Link to={`/contact/edit/${contact._id}`}>
					<img src={pencilIcon} alt='pencil' className='icon icon-preview' />
				</Link>
			</section>
		</li>
	)
}
