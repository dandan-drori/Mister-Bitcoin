import React, { Component } from 'react'
import { contactService } from '../services/contact-service.js'
import { Link } from 'react-router-dom'
import backIcon from '../assets/icons/back.png'
import trashIcon from '../assets/icons/delete.png'
import { connect } from 'react-redux'
import { getContactById, saveContact, removeContact } from '../store/actions/contactActions.js'

class _ContactEdit extends Component {
	state = {
		contact: null,
	}

	async componentDidMount() {
		const contact = await this.loadContact()
		this.setState({ contact })
	}

	loadContact = async () => {
		const { id } = this.props.match.params
		if (id) {
			await this.props.getContactById(id)
			return this.props.contact
		}
		return contactService.getEmptyContact()
	}

	handleSubmit = async ev => {
		ev.preventDefault()
		const { contact } = this.state
		await this.props.saveContact(contact)
		this.props.history.push('/contact')
	}

	handleChange = ({ target }) => {
		var field = target.id
		var value = target.type === 'number' ? +target.value : target.value
		this.setState(prevState => ({ contact: { ...prevState.contact, [field]: value } }))
	}

	onRemoveContact = async () => {
		await this.props.removeContact(this.state.contact._id)
		this.props.history.push('/contact')
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
					<button onClick={this.onRemoveContact}>
						<img src={trashIcon} alt='trash' />
					</button>
				</section>

				<section className='flex-container'>
					<img src={`https://robohash.org/${_id}`} alt='contact' />
				</section>
				<form className='main-layout'>
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
						<button onClick={this.handleSubmit}>Save</button>
					</section>
				</form>
			</section>
		)
	}
}

const mapStateToProps = state => {
	return {
		contact: state.contactModule.currContact,
	}
}

const mapDispatchToProps = { saveContact, getContactById, removeContact }

export const ContactEdit = connect(mapStateToProps, mapDispatchToProps)(_ContactEdit)
