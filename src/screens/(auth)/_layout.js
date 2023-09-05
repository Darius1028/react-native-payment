import React from 'react';
import { Slot, Redirect, SplashScreen } from 'expo-router';
import useCheckLogin from 'src/hooks/useCheckLogin';

const propTypes = {};

const defaultProps = {};

const AuthLayout = () => {
	const { loading, loggedIn } = useCheckLogin();

	if (loading) {
		return <SplashScreen />;
	}

	if (loggedIn && !loading) {
		return <Redirect href="/" />;
	}

	return (
		<Slot />
	);
};

AuthLayout.propTypes = propTypes;

AuthLayout.defaultProps = defaultProps;

export default AuthLayout;
