import React, { Component } from 'react'
import { contactService } from '../services/contact-service.js'
import { Link } from 'react-router-dom'
import backIcon from '../assets/icons/back.png'
import trashIcon from '../assets/icons/delete.png'

export class ContactEdit extends Component {
	state = {
		contact: null,
	}

	async componentDidMount() {
		const contactId = this.props.match.params.id
		const contact = contactId
			? await contactService.getContactById(contactId)
			: contactService.getEmptyContact()
		this.setState({ contact })
	}

	handleSubmit = async ev => {
		ev.preventDefault()
		await contactService.saveContact(this.state.contact)
		this.props.history.push('/contact')
	}

	handleChange = ({ target }) => {
		var field = target.id
		var value = target.type === 'number' ? +target.value : target.value
		this.setState(prevState => ({ contact: { ...prevState.contact, [field]: value } }))
	}

	render() {
		if (!this.state.contact) return <div>Loading...</div>
		const { _id, name, phone, email } = this.state.contact
		return (
			<section className='contact-edit'>
				<section className='actions'>
					<Link to={`/contact/${_id}`}>
						<img src={backIcon} alt='back' />
					</Link>
					<Link to='/contact'>
						{/* change delete to button and connect method for deleting */}
						<img src={trashIcon} alt='trash' />
					</Link>
				</section>

				<section className='flex-container'>
					<img src={`https://robohash.org/${_id}`} alt='contact' />
				</section>
				<form onSubmit={this.handleSubmit} className='main-layout'>
					<label>
						Name:
						<input type='text' id='name' value={name} onChange={this.handleChange} />
					</label>
					<label htmlFor='phone'>
						Phone:
						<input type='text' id='phone' value={phone} onChange={this.handleChange} />
					</label>
					<label htmlFor='email'>
						Email:
						<input type='text' id='email' value={email} onChange={this.handleChange} />
					</label>
					<section className='flex-container'>
						<button>Save</button>
					</section>
				</form>
			</section>
		)
	}
}
