import React from 'react';
// import PropTypes from 'prop-types';

import { Stack } from 'expo-router';

import useNavConfigs from 'src/hooks/useNavConfigs';

import NotFound from 'src/containers/NotFoundScreen';

const propTypes = {
	// classes: PropTypes.object.isRequired,
};

const defaultProps = {
	// classes: {},
};

const NotFoundScreen = (props) => {
	// const {  } = props;

	const configs = useNavConfigs({ headerShown: false });

	return (
		<>
			<Stack.Screen options={configs} />
			<NotFound />
		</>
	);
};

NotFoundScreen.propTypes = propTypes;

NotFoundScreen.defaultProps = defaultProps;

export default NotFoundScreen;
