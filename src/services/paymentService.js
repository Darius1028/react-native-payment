import axios from 'axios';
import { PAYMENT_URL, TOKEN_PAYMENT } from 'src/config/constants';

async function getPayments() {
	return new Promise((resolve, reject) => {
		axios.get(`${PAYMENT_URL}/payment-requests?integration=true`, {
			headers: {
				Authorization: `Bearer ${TOKEN_PAYMENT}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).then(async (response) => {
			resolve(response);
		}).catch((err) => { reject(err); });
	});
}

async function createPaymentRequest(data) {
	return new Promise((resolve, reject) => {
		axios.post(`${PAYMENT_URL}/payment-requests`, { ...data, integration: true }, {
			headers: {
				Authorization: `Bearer ${TOKEN_PAYMENT}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).then(async (response) => {
			resolve(response.data);
		}).catch((err) => {
			reject(err);
		});
	});
}

async function createPaymentLink(data) {
	return new Promise((resolve, reject) => {
		axios.post(`${PAYMENT_URL}/payment-links`, { ...data, integration: true }, {
			headers: {
				Authorization: `Bearer ${TOKEN_PAYMENT}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).then(async (response) => {
			resolve(response.data);
		}).catch((err) => {
			reject(err);
		});
	});
}

export const paymentService = {
	getPayments,
	createPaymentRequest,
	createPaymentLink,
};
