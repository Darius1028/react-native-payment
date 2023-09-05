/* eslint-disable no-nested-ternary */

import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Text from 'src/components/UIDisplay/Text';

const propTypes = {
	children: PropTypes.any,
	innerRef: PropTypes.any,
	style: PropTypes.any,
};

const defaultProps = {
	children: null,
	style: {},
};

const ViewComponent = (props) => {
	const { children, style, innerRef, ...restProps } = props;

	if (!children) {
		return <View {...props} />;
	}

	if (React.isValidElement(children)) {
		return (
			<View
				{...restProps}
				style={{
					...style,
				}}
				ref={innerRef}
			>
				{children}
			</View>
		);
	}

	if (['number', 'string'].includes(typeof children)) {
		return <Text {...restProps} ref={innerRef} style={style}>{children}</Text>;
	}

	if (Array.isArray(children)) {
		if (children.some(React.isValidElement)) {
			return (
				<View
					{...restProps}
					style={{
						...style,
					}}
					ref={innerRef}
				>
					{children}
				</View>
			);
		}
		return (
			<Text
				{...restProps}
				style={style}
				ref={innerRef}
			>
				{children.length > 0 ? children?.reduce((a, b) => (a || '') + '' + (b || '')) : null}
			</Text>
		);
	}

	return null;
};

ViewComponent.propTypes = propTypes;

ViewComponent.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => {
	return <ViewComponent {...props} innerRef={ref} />;
});
