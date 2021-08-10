import { contactService } from '../../services/contact-service.js'

export function loadContacts() {
	return async (dispatch, getState) => {
		const { filterBy } = getState().contactModule
		try {
			const contacts = await contactService.getContacts(filterBy)
			dispatch({ type: 'SET_CONTACTS', contacts })
		} catch (err) {
			console.log(err)
		}
	}
}
export function getContactById(contactId) {
	return async dispatch => {
		const contact = await contactService.getContactById(contactId)
		dispatch({ type: 'SET_CONTACT', contact })
	}
}

export function removeContact(contactId) {
	return async dispatch => {
		await contactService.deleteContact(contactId)
		dispatch({ type: 'REMOVE_CONTACT', contactId })
	}
}

export function saveContact(contact) {
	// const type = contact._id ? 'UPDATE_CONTACT' : 'ADD_CONTACT'
	return async dispatch => {
		await contactService.saveContact(contact)
		// const contactToAdd = await contactService.saveContact(contact)
		// dispatch({ type, contact: contactToAdd })
	}
}

export function setFilterBy(filterBy) {
	return dispatch => {
		dispatch({ type: 'SET_FILTER_BY', filterBy })
	}
}
