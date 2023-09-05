import React from 'react';
import PropTypes from 'prop-types';

// import { View } from 'react-native';

import View from 'src/components/UIDisplay/View';
import Text from 'src/components/UIDisplay/Text';

const propTypes = {
	style: PropTypes.object.isRequired,
	children: PropTypes.any.isRequired,
	left: PropTypes.any,
};

const defaultProps = {
	style: {},
	children: [],
	left: null,
};

const LI = (props) => {
	const { style, left, children } = props;

	return (
		<View
			style={{
				marginBottom: 10,
				...style,
				flexDirection: 'row',
			}}
		>
			{
				left ?
					<Text
						style={{
							marginRight: 10,
							lineHeight: 20,
						}}
					>
						{left}
					</Text> :
					null
			}
			<Text
				style={{
					flex: 1,
				}}
			>
				{children}
			</Text>
		</View>
	);
};

LI.propTypes = propTypes;

LI.defaultProps = defaultProps;

export default LI;
