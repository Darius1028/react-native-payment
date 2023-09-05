import axios from 'axios';
import { API_URL } from 'src/config/constants';

function login(user) {
	return new Promise((resolve, reject) => {
		axios.post(`${API_URL}/login`, {
			email: user.email,
			password: user.password,
		}, { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } }).then(async (response) => {
			try {
				resolve(response.data);
			} catch (e) { reject(e); }
		}).catch((err) => { reject(err); },
		);
	});
}

async function logout(getState) {
	return new Promise((resolve, reject) => {
		const currentState = getState();
		const { token } = currentState.auth;
		axios.get(`${API_URL}/logout`, {
			headers: {
				authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).then(async (response) => {
			resolve(response);
		}).catch((err) => reject(err));
	});
}

export const authService = {
	login,
	logout,
};
