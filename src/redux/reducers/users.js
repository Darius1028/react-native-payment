export const initialState = [
	{
		id: '',
		name: '',
		email: '',
		password: '',
	},
];

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'USERS': {
			return [...action.payload.data];
		}
		case 'CREATE_USER_SUCCESS': {
			return [
				{
					...action.payload[0],
				},
				...state,
			];
		}
		case 'EDIT_USER_SUCCESS': {
			return state.map(item => {
				if (item.id === action.payload[0]?.id) {
					return {
						...item,
						...action.payload[0],
					};
				}
				return {
					...item,
				};
			});
		}
		case 'DELETE_USER_SUCCESS': {
			return state.filter(el => {
				return el.id !== action.payload[0]?.id;
			});
		}
		default:
			return state;
	}
};

export default reducer;
