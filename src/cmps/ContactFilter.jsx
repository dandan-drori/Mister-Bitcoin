import { Component } from 'react'
import { connect } from 'react-redux'
import { setFilterBy, loadContacts } from '../store/actions/contactActions.js'

class _ContactFilter extends Component {
	state = {
		term: '',
	}

	handleChange = ({ target }) => {
		var field = target.id
		var value = target.type === 'number' ? +target.value : target.value
		this.setState({ [field]: value }, () => {
			this.props.setFilterBy(this.state)
			this.props.loadContacts()
		})
	}

	render() {
		const { term } = this.state
		return (
			<section className='contact-filter'>
				<input
					type='text'
					id='term'
					value={term}
					onChange={this.handleChange}
					placeholder='Search'
				/>
			</section>
		)
	}
}

const mapDispatchToProps = {
	setFilterBy,
	loadContacts,
}

export const ContactFilter = connect(undefined, mapDispatchToProps)(_ContactFilter)
