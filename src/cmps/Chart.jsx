import React from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'

export function Chart({ data, limit, color }) {
	return (
		<div className='chart'>
			<Sparklines data={data} limit={150} width={100} height={20} margin={5}>
				<SparklinesLine
					style={{
						stroke: color,
						strokeWidth: '0.2',
						fill: color,
					}}
				/>
			</Sparklines>
		</div>
	)
}
