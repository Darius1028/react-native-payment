import React from 'react';
import PropTypes from 'prop-types';

import View from 'src/components/UIDisplay/View';

import Item from './Item';

const propTypes = {
	style: PropTypes.object,
	children: PropTypes.any,
};

const defaultProps = {
	style: {},
	children: null,
};

const List = (props) => {
	const { children, style } = props;

	return (
		<View
			style={{
				...style,
			}}
		>
			{children}
		</View>
	);
};

List.Item = Item;

List.propTypes = propTypes;

List.defaultProps = defaultProps;

export default List;
