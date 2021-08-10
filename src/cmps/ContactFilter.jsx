import { Component } from 'react'

export class ContactFilter extends Component {
	state = {
		term: '',
	}

	handleChange = ({ target }) => {
		var field = target.id
		var value = target.type === 'number' ? +target.value : target.value
		this.setState({ [field]: value }, () => {
			this.props.onSetFilter(this.state)
		})
	}

	render() {
		const { filterBy } = this.props
		return (
			<section className='contact-filter'>
				<input
					type='text'
					id='term'
					value={filterBy.term}
					onChange={this.handleChange}
					placeholder='Search'
				/>
			</section>
		)
	}
}
