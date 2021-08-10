import React from 'react'
import { NavLink } from 'react-router-dom'
import homeIcon from '../assets/icons/home.png'
import increaseIcon from '../assets/icons/increase.png'
import usersIcon from '../assets/icons/users.png'

export function Header() {
	return (
		<section className='header'>
			<NavLink exact to='/'>
				<img src={homeIcon} alt='' className='icon icon-header' />
			</NavLink>
			<NavLink to='/contact'>
				<img src={usersIcon} alt='' className='icon icon-header' />
			</NavLink>
			<NavLink to='/statistic'>
				<img src={increaseIcon} alt='' className='icon icon-header' />
			</NavLink>
		</section>
	)
}
