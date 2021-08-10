import React, { Component } from 'react'
import { contactService } from '../services/contact-service.js'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import { Link } from 'react-router-dom'
import plusIcon from '../assets/icons/plus.png'

export class ContactApp extends Component {
	state = {
		contacts: [],
		filterBy: {
			term: '',
		},
	}

	componentDidMount() {
		this.loadContacts()
	}

	loadContacts = async () => {
		try {
			const contacts = await contactService.getContacts(this.state.filterBy)
			this.setState({ contacts })
		} catch (err) {
			console.log(err)
		}
	}

	onSetFilter = filterBy => {
		this.setState({ filterBy }, this.loadContacts)
	}

	onRemoveContact = async id => {
		await contactService.deleteContact(id)
		this.loadContacts()
	}

	render() {
		const { contacts, filterBy } = this.state
		return (
			<section className='contact-app main-layout'>
				<ContactFilter filterBy={filterBy} onSetFilter={this.onSetFilter} />
				<Link to='/contact/edit'>
					<img src={plusIcon} alt='plus' />
				</Link>
				<ContactList contacts={contacts} onRemoveContact={this.onRemoveContact} />
			</section>
		)
	}
}
