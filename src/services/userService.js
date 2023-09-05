import axios from 'axios';
import { API_URL } from 'src/config/constants';

async function getUsers(getState) {
	return new Promise((resolve, reject) => {
		const currentState = getState();
		const { token } = currentState.auth;
		axios.get(`${API_URL}/users`, {
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).then(async (response) => {
			resolve(response);
		}).catch((err) => { reject(err); });
	});
}

async function updateUser(getState, user) {
	return new Promise((resolve, reject) => {
		const currentState = getState();
		const { token } = currentState.auth;
		axios.put(`${API_URL}/users/${user.id}`, user, {
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).then(async (response) => {
			resolve(response);
		}).catch((err) => {
			reject(err);
		});
	});
}

async function deleteUser(getState, user) {
	return new Promise((resolve, reject) => {
		const currentState = getState();
		const { token } = currentState.auth;
		axios.delete(`${API_URL}/users/${user.id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).then(async (response) => {
			resolve(response);
		}).catch((err) => { reject(err); });
	});
}

async function createUser(getState, user) {
	return new Promise((resolve, reject) => {
		const currentState = getState();
		const { token } = currentState.auth;
		axios.post(`${API_URL}/users/`, user, {
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).then(async (response) => {
			resolve(response);
		}).catch((err) => { reject(err); });
	});
}

export const userService = {
	getUsers,
	updateUser,
	deleteUser,
	createUser,
};
