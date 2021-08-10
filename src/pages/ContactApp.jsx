import React, { Component } from 'react'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import { Link } from 'react-router-dom'
import plusIcon from '../assets/icons/plus.png'
import { connect } from 'react-redux'
import { loadContacts, setFilterBy } from '../store/actions/contactActions.js'

class _ContactApp extends Component {
	componentDidMount() {
		this.props.loadContacts()
	}

	render() {
		const { contacts } = this.props
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
}

const mapStateToProps = state => {
	return {
		contacts: state.contactModule.contacts,
		filterBy: state.contactModule.filterBy,
	}
}

const mapDispatchToProps = {
	loadContacts,
	setFilterBy,
}

export const ContactApp = connect(mapStateToProps, mapDispatchToProps)(_ContactApp)
