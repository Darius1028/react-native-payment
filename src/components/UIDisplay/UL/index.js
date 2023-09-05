import React from 'react';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';
// import { View } from 'react-native';

import View from 'src/components/UIDisplay/View';

import LI from './LI';

const propTypes = {
	style: PropTypes.object.isRequired,
	children: PropTypes.any.isRequired,
	type: PropTypes.oneOf(['number', 'dot', 'lodash']),
};

const defaultProps = {
	style: {},
	children: [],
	type: 'dot',
};

const UL = (props) => {
	const { style, type, children } = props;

	const left = React.useMemo(() => {
		if (type === 'lodash') {
			return '-';
		}

		return <Entypo name="dot-single" size={20} />;
	}, [type]);

	return (
		<View
			style={{
				...style,
			}}
		>
			{
				React.Children.map(children, (child, index) => {
					return React.cloneElement(
						child,
						{
							left: type === 'number' ? index + 1 + '.' : left,
						},
					);
				})
			}
		</View>
	);
};

UL.LI = LI;
UL.propTypes = propTypes;

UL.defaultProps = defaultProps;

export default UL;
