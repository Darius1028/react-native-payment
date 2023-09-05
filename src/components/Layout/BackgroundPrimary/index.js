import React from 'react';
import PropTypes from 'prop-types';

import useTheme from 'src/hooks/useTheme';

import { ImageBackground } from 'react-native';

const propTypes = {
	children: PropTypes.any.isRequired,
};

const defaultProps = {};

const BackgroundPrimary = (props) => {
	const { children } = props;

	const theme = useTheme();

	const bgImg = React.useMemo(() => {
		return theme.name === 'light' ? require('./images/bg.jpg') : require('./images/bg-dark.jpg');
	}, [theme.name]);

	return (
		<ImageBackground
			style={{
				flex: 1,
			}}
			source={bgImg}
			resizeMode="cover"
		>
			{children}
		</ImageBackground>
	);
};

BackgroundPrimary.propTypes = propTypes;

BackgroundPrimary.defaultProps = defaultProps;

export default BackgroundPrimary;
