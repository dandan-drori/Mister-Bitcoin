import React from 'react'
import { Link } from 'react-router-dom'

export function MovesList({ moves, title }) {
	function suggestion() {
		if (title !== 'Your Moves:') {
			return (
				<p className='suggestion'>
					Try transferring money to one of your <Link to='/contact'>contacts</Link>
				</p>
			)
		} else {
			return <p className='suggestion'>Try transferring coins first.</p>
		}
	}

	if (!moves || !moves.length)
		return (
			<ul className='moves-list'>
				<li>No moves! {suggestion()}</li>
			</ul>
		)
	return (
		<ul className='moves-list'>
			<li>{title}</li>
			{moves.map(move => {
				const { toId, to, at, amount } = move
				return (
					<li key={at}>
						{title !== 'Your Moves:' && (
							<p>
								<span>To: </span>
								<Link to={`/contact/${toId}`}>{to}</Link>
							</p>
						)}
						<p>At: {new Date(at).toLocaleString()}</p>
						<p>Amount: {amount} coins</p>
					</li>
				)
			})}
		</ul>
	)
}
