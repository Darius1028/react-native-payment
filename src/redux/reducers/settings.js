export const initialState = {
	idleTime: 5,
	theme: 'light',
	hideMoney: false,
};

const reducer =	 (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_SETTINGS':
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
