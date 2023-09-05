/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
	View,
	Text,
	Modal,
	TextInput,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	input: {
		width: '100%',
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
		borderRadius: 6,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginTop: 20,
	},
	errorText: {
		color: 'red',
		fontSize: 10,
		marginBottom: 10,
	},
});

const isValidEmail = (email) => {
	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	return emailRegex.test(email);
};

const isValidPassword = (password) => {
	return password.length >= 6;
};

const EditUserModal = ({ user, onSave, onCancel, isVisible }) => {
	const [editedUser, setEditedUser] = useState({ ...user });
	const [errors, setErrors] = useState({});

	const handleSave = () => {
		const validationErrors = {};

		if (!editedUser.name) {
			validationErrors.name = 'Nombre es requerido';
		}

		if (!editedUser.email) {
			validationErrors.email = 'Correo electrónico es requerido';
		} else if (!isValidEmail(editedUser.email)) {
			validationErrors.email = 'Formato de correo electrónico no válido';
		}

		if (!editedUser.password) {
			validationErrors.password = 'Contraseña es requerida';
		} else if (!isValidPassword(editedUser.password)) {
			validationErrors.password = 'La contraseña debe tener al menos 6 caracteres';
		}

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		onSave(editedUser);
	};

	const handleCancel = () => {
		onCancel();
	};

	return (
		<Modal visible={isVisible} animationType="slide">
			<View style={styles.modalContainer}>
				<Text style={styles.modalTitle}>User</Text>
				<TextInput
					style={styles.input}
					placeholder="Nombre"
					value={editedUser.name}
					onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
				/>
				{errors.name && (
					<Text style={styles.errorText}>{errors.name}</Text>
				)}
				<TextInput
					style={styles.input}
					placeholder="Correo electrónico"
					value={editedUser.email}
					onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
				/>
				{errors.email && (
					<Text style={styles.errorText}>{errors.email}</Text>
				)}
				<TextInput
					style={styles.input}
					placeholder="Contraseña"
					value={editedUser.password}
					onChangeText={(text) => setEditedUser({ ...editedUser, password: text })}
				/>
				{errors.password && (
					<Text style={styles.errorText}>{errors.password}</Text>
				)}
				<View style={styles.buttonContainer}>
					<SafeAreaView
						style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
					>
						<TouchableOpacity
							onPress={handleSave}
							style={{ backgroundColor: '#00953B', padding: 15, borderRadius: 6, width: '50%' }}
						>
							<Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
								Save
							</Text>
						</TouchableOpacity>
					</SafeAreaView>
					<SafeAreaView
						style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
					>
						<TouchableOpacity
							onPress={handleCancel}
							style={{ backgroundColor: '#00953B', padding: 15, borderRadius: 6, width: '50%' }}
						>
							<Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
								Cancel
							</Text>
						</TouchableOpacity>
					</SafeAreaView>
				</View>
			</View>
		</Modal>
	);
};

export default EditUserModal;
