import React, { Component } from 'react'
import { contactService } from '../services/contact-service.js'
import { Link } from 'react-router-dom'
import backIcon from '../assets/icons/back.png'
import pencilIcon from '../assets/icons/edit.png'

export class ContactDetails extends Component {
	state = {
		contactId: null,
		contact: {},
	}

	componentDidMount() {
		const contactId = this.props.match.params.id
		this.setState({ contactId }, async () => {
			try {
				const contact = await contactService.getContactById(this.state.contactId)
				console.log('contact', contact)
				this.setState({ contact })
			} catch (err) {
				console.log(err)
			}
		})
	}

	render() {
		const { _id, name, email, phone } = this.state.contact
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
			</section>
		)
	}
}
