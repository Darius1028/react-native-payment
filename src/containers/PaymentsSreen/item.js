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
});

const Item = ({ payment }) => {
	return (
		<View style={styles.container}>
			<View style={styles.column}>
				<Text>Description:</Text>
				<Text>{payment.description}</Text>
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
				<Text>{payment.created_at}</Text>
			</View>
		</View>
	);
};

export default Item;
