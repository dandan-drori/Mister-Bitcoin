import React, { Component } from 'react'
import { Chart } from '../cmps/Chart'
import { bitcoinService } from '../services/bitcoin-service.js'

export class Statistic extends Component {
	state = {
		marketPrice: null,
		transactions: null,
	}

	async componentDidMount() {
		try {
			const marketPrice = await bitcoinService.getMarketPrice()
			const transactions = await bitcoinService.getConfirmedTransactions()
			this.setState({ marketPrice, transactions })
		} catch (err) {
			console.log(err)
		}
	}

	isChartsLoading() {
		const { marketPrice, transactions } = this.state
		return !(marketPrice && marketPrice.values && transactions && transactions.values)
	}

	pricePerDay() {
		return this.state.marketPrice.values.map(coord => coord.y)
	}

	confirmedTransactions() {
		return this.state.transactions.values.map(coord => coord.y)
	}

	render() {
		return this.isChartsLoading() ? (
			<section>Loading...</section>
		) : (
			<section className='statistic'>
				<h1>Bitcoin Data</h1>
				<h3>Price Per Day</h3>
				<Chart data={this.pricePerDay()} color='#d1192e' />
				<h3>Confirmed Transactions Per Day</h3>
				<Chart data={this.confirmedTransactions()} color='#80d119' />
			</section>
		)
	}
}
