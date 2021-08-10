import React from 'react'
import { Link } from 'react-router-dom'

export function ContactPreview({ contact }) {
	return (
		<Link className='contact-preview simple-card-preview' to={`/contact/${contact._id}`}>
			<img src={`https://robohash.org/${contact._id}`} alt='contact' />
			<h2>{contact.name}</h2>
		</Link>
	)
}
