import { storageService } from './async-storage-service.js'
import { utilService } from './util-service.js'

export const userService = {
	getUsers,
	signup,
	addMove,
}

const USER_KEY = 'users'

let gUsers = []

async function getUsers() {
	const users = await storageService.query(USER_KEY)
	if (!users || !users.length) {
		await storageService.postMany(USER_KEY, gUsers)
		return Promise.resolve(gUsers)
	}
	return users
}

async function signup(name) {
	const user = {
		_id: utilService.makeId(),
		name,
		coins: 100,
		moves: [],
	}
	localStorage.clear()
	return await storageService.post(USER_KEY, user)
}

async function addMove(contact, amount) {
	const move = {
		toId: contact._id,
		to: contact.name,
		at: Date.now(),
		amount,
	}
	const users = await getUsers()
	const user = users[0]
	user.moves.unshift(move)
	console.log('user', user)
	localStorage.clear()
	await storageService.post(USER_KEY, user)
	return Promise.resolve(move)
}
