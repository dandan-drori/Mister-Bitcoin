import React from 'react'
import { ContactPreview } from './ContactPreview'

export function ContactList({ contacts, onRemoveContact }) {
	return (
		<ul className='contact-list'>
			{contacts.map(contact => (
				<ContactPreview contact={contact} key={contact._id} onRemoveContact={onRemoveContact} />
			))}
		</ul>
	)
}
