export const initialState = [
	{
		messagePaymentRequest: '',
		paymentRequest: {},
		payments: [],
		error: false,
		messagePaymentLink: '',
		paymentLink: {},
	},
];

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'PAYMENTS': {
			return { ...state, payments: action.payload.data };
		}
		case 'CREATE_PAYMENT_REQUEST_SUCCESS': {
			return { ...state, paymentRequest: action.payload, messagePaymentRequest: 'Created payment successfully', error: false };
		}
		case 'ERROR_PAYMENT_REQUEST': {
			return { ...state, paymentRequest: {}, messagePaymentRequest: action.payload, error: true };
		}
		case 'CLEAN_PAYMENT_REQUEST': {
			return { ...state, messagePaymentRequest: '', error: false };
		}
		case 'CREATE_PAYMENT_LINK_SUCCESS': {
			return { ...state, paymentLink: action.payload, messagePaymentLink: 'Created payment successfully', error: false };
		}
		case 'ERROR_PAYMENT_LINK': {
			return { ...state, paymentLink: {}, messagePaymentLink: action.payload, error: true };
		}
		case 'CLEAN_PAYMENT_LINK': {
			return { ...state, messagePaymentLink: '', error: false };
		}
		default:
			return state;
	}
};

export default reducer;
