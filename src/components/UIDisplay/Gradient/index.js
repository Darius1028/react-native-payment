import React from 'react';
import PropTypes from 'prop-types';

import useTheme from 'src/hooks/useTheme';

import { LinearGradient } from 'expo-linear-gradient';

const propTypes = {
	children: PropTypes.any,
};

const defaultProps = {
	children: null,
};

const Gradient = (props) => {
	const { children, ...restProps } = props;

	const theme = useTheme();

	return (
		<LinearGradient
			colors={theme.gradient_bg || []}
			{...restProps}
		>
			{children}
		</LinearGradient>
	);
};

Gradient.propTypes = propTypes;

Gradient.defaultProps = defaultProps;

export default Gradient;
