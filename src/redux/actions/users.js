import { userService } from 'src/services/userService';

export const users = (next = f => f) => (dispatch, getState) => {
	userService.getUsers(getState).then(async (res) => {
		dispatch({ type: 'USERS', payload: res.data });
		next(null, res.data || {});
		return res.data;
	}).catch((err) => {
		dispatch({
			type: 'LOGOUT_SUCCESS',
		});
	});
};

export const updateUser = (user, next = f => f) => (dispatch, getState) => {
	userService.updateUser(getState, user).then(async (res) => {
		dispatch({ type: 'EDIT_USER_SUCCESS', payload: res.data });
		next(null, res.data || {});
		return res.data;
	}).catch((err) => {
		dispatch({
			type: 'LOGOUT_SUCCESS',
		});
	});
};

export const deleteUser = (user, next = f => f) => (dispatch, getState) => {
	userService.deleteUser(getState, user).then(async (res) => {
		dispatch({ type: 'DELETE_USER_SUCCESS', payload: res.data });
		next(null, res.data || {});
		return res.data;
	}).catch((err) => {
		dispatch({
			type: 'LOGOUT_SUCCESS',
		});
	});
};

export const createUser = (user, next = f => f) => (dispatch, getState) => {
	userService.createUser(getState, user).then(async (res) => {
		dispatch({ type: 'CREATE_USER_SUCCESS', payload: res.data });
		next(null, res.data || {});
		return res.data;
	}).catch((err) => {
		dispatch({
			type: 'LOGOUT_SUCCESS',
		});
	});
};
