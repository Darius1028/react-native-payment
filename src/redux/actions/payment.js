import { paymentService } from 'src/services/paymentService';

export const payments = (next = f => f) => (dispatch, getState) => {
	paymentService.getPayments(getState).then(async (res) => {
		dispatch({ type: 'PAYMENTS', payload: res.data });
		next(null, res.data || {});
		return res.data;
	}).catch((err) => {
		dispatch({
			type: 'ERROR_PAYMENT',
		});
	});
};

export const createPaymentRequest = (data, next = f => f) => (dispatch) => {
	paymentService.createPaymentRequest(data).then(async (res) => {
		dispatch({ type: 'CREATE_PAYMENT_REQUEST_SUCCESS', payload: res.data });
		next(null, res.data || {});
		return res.data;
	}).catch((err) => {
		if (err.response && err.response.status === 422) {
			const errorMessage = err.response.data.data[0].message;
			dispatch({
				type: 'ERROR_PAYMENT_REQUEST',
				payload: errorMessage,
			});
		}
	});
};

export const createPaymentLink = (data, next = f => f) => (dispatch) => {
	paymentService.createPaymentLink(data).then(async (res) => {
		dispatch({ type: 'CREATE_PAYMENT_LINK_SUCCESS', payload: res.data });
		next(null, res.data || {});
		return res.data;
	}).catch((err) => {
		if (err.response && err.response.status === 422) {
			const errorMessage = err.response.data.data[0].message;
			dispatch({
				type: 'ERROR_PAYMENT_LINK',
				payload: errorMessage,
			});
		}
	});
};

export const cleanPaymentRequest = (user, next = f => f) => (dispatch) => {
	dispatch({ type: 'CLEAN_PAYMENT_REQUEST' });
};

export const cleanPaymentLink = (user, next = f => f) => (dispatch) => {
	dispatch({ type: 'CLEAN_PAYMENT_LINK' });
};
