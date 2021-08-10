export const userService = {
	getUser,
}

function getUser() {
	return {
		name: 'Douchbag',
		coins: 100,
		moves: [],
	}
}
