/* eslint-disable import/no-extraneous-dependencies */

import AsyncStorage from '@react-native-async-storage/async-storage';

import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer, { initialState } from 'src/redux/reducers';
import apiMiddleware from 'src/redux/thunk/middleware';

import Constants from 'expo-constants';

// eslint-disable-next-line no-unused-vars
const logger = createLogger({
	collapsed: (getState, action, logEntry) => !logEntry.error,
});

const persistConfig = {
	blacklist: ['loader'],
	key: Constants.manifest?.slug ?? 'root',
	storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const composeMiddleware = !__DEV__ ?
	compose(
		applyMiddleware(apiMiddleware),
		applyMiddleware(thunk),
	) :
	composeWithDevTools({
	})(compose(
		applyMiddleware(apiMiddleware),
		applyMiddleware(thunk),
	));

export default () => {
	const store = createStore(
		persistedReducer,
		initialState,
		composeMiddleware,
	);
	const persistor = persistStore(store);

	return { store, persistor };
};
