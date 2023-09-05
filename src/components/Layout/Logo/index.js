import React from 'react';
import PropTypes from 'prop-types';

import { Image } from 'react-native';

const propTypes = {
	style: PropTypes.object,
	size: PropTypes.number,
};

const defaultProps = {
	style: {},
	size: 50,
};

const Logo = (props) => {
	const { style, size } = props;

	const src = require('./images/logo.png');

	return (
		<Image
			style={[
				{
					width: 'auto',
					height: size,
				},
				style,
			]}
			resizeMode="contain"
			source={src}
		/>
	);
};

Logo.propTypes = propTypes;

Logo.defaultProps = defaultProps;

export default Logo;
