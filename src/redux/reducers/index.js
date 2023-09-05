/* eslint-disable no-param-reassign */

import { combineReducers } from 'redux';

import auth, { initialState as authInitial } from './auth';
import loader, { initialState as initialLoader } from './loader';
import settings, { initialState as initialSettings } from './settings';
import users, { initialState as initialUsers } from './users';
import payments, { initialState as initialPayments } from './payments';

const extractWhiteList = (initialState, state, wl) => {
	const newData = Object.entries(initialState).reduce((preVal, [key, val]) => {
		if (wl.includes(key)) {
			preVal[key] = state[key];
		} else {
			preVal[key] = val;
		}
		return preVal;
	}, {});

	return newData;
};

export const whitelist = ['settings'];

export const initialState = {
	auth: authInitial,
	loader: initialLoader,
	settings: initialSettings,
	users: initialUsers,
	payments: initialPayments,
};

const appReducer = combineReducers({
	auth,
	loader,
	settings,
	users,
	payments,
});

const reducers = (state, action) => {
	return appReducer(action.type === 'LOGOUT_SUCCESS' ? extractWhiteList(initialState, state, whitelist) : state, action);
};

export default reducers;
