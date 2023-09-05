import {
	AUTH_ERR_LOG_IN,
	AUTH_ERR_LOG_OUT,
	AUTH_LOGGED_IN,
	AUTH_LOGGING_IN,
	AUTH_LOGGING_OUT,
	AUTH_LOGOUT,
} from 'src/constants/auth';

import { authService } from 'src/services/authService';
import AuthStorage from 'src/utils/auth-storage';

export const loggingIn = (data) => ({
	type: AUTH_LOGGING_IN,
	payload: data,
});

export const loggedIn = (data) => ({
	type: AUTH_LOGGED_IN,
	payload: data,
});

export const errorLogIn = (errorMessage) => ({
	type: AUTH_ERR_LOG_IN,
	payload: errorMessage,
});

export const login = (user, next = f => f) => (dispatch) => {
	authService.login(user).then(async (res) => {
		await dispatch(loggedIn(res.data.user));

		await AuthStorage.setValue({
			accessToken: +new Date(),
			refreshToken: +new Date(),
			userId: res.data.user.email,
		});

		dispatch({
			type: 'LOGIN_SUCCESS',
			payload: { ...res.data, id: res.data.user.email },
		});

		next(null, res.data.user || {});
		return res.data.user;
	}).catch((err) => {
		dispatch(errorLogIn('Wrong username or password'));
	}).finally(() => {
		dispatch(loggingIn(false));
	});
};

export const loggedOut = () => ({
	type: AUTH_LOGOUT,
});

export const loggingOut = (lOut) => ({
	type: AUTH_LOGGING_OUT,
	payload: lOut,
});

export const errorLogOut = (errorMessage) => ({
	type: AUTH_ERR_LOG_OUT,
	payload: errorMessage,
});

export const logout = (next = f => f) => async (dispatch, getState) => {
	dispatch(loggingOut(true));

	await authService.logout(getState).then(async (res) => {
		await AuthStorage.destroy();
		global.currentUser = {};
		dispatch(loggedOut());

		dispatch({
			type: 'LOGOUT_SUCCESS',
		});

		next();

		return null;
	}).catch((err) => {
		dispatch(errorLogOut('Error logging out.'));
	}).finally(() => {
		dispatch(loggingOut(false));
	});
};
