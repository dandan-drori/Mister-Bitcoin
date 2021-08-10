const INITIAL_STATE = {
	loggedInUser: null,
}
export function userReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'SIGNUP':
			return {
				...state,
				loggedInUser: action.user,
			}
		case 'TRANSFER_MONEY':
			return {
				...state,
				loggedInUser: {
					...state.loggedInUser,
					coins: state.loggedInUser.coins - action.amount,
					moves: [...state.loggedInUser.moves, action.move],
				},
			}
		default:
			return state
	}
}
