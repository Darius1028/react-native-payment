import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	buttonContainer: {
		flexDirection: 'row',
	},
	button: {
		width: 50,
		maxHeight: 50,
		marginLeft: 5,
	},
	column: {
		fontSize: 11,
	},
	textContainer: {
		width: '30%',
		overflow: 'hidden',
	},
	truncatedText: {
		overflow: 'hidden',
	},
});

const Item = ({ payment }) => {
	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text>Description:</Text>
				<Text numberOfLines={1} style={styles.truncatedText}>{payment.description}</Text>
			</View>
			<View style={styles.column}>
				<Text>Amount:</Text>
				<Text>{payment.amount}</Text>
			</View>
			<View style={styles.column}>
				<Text>Status:</Text>
				<Text>{payment.status}</Text>
			</View>
			<View style={styles.column}>
				<Text>Created:</Text>
				<Text>{payment.created_at.split(' ')[0]}</Text>
			</View>
		</View>
	);
};

export default Item;
