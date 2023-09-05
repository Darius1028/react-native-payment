import React, { } from 'react';
import { View, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
});

// eslint-disable-next-line react/prop-types
export const LoadingOverlay = ({ isVisible }) => {
	return (
		<Modal
			animationType="fade"
			transparent
			visible={isVisible}
		>
			<View style={styles.overlay}>
				<ActivityIndicator size="large" color="white" />
				<Text>Loading...</Text>
			</View>
		</Modal>
	);
};
