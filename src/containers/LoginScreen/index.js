import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingOverlay } from 'src/components/UIControls/loadingOverlay';

import { KeyboardAvoidingView, View, Platform, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { login } from 'src/redux/actions/auth';

import Text from 'src/components/UIDisplay/Text';
import Container from 'src/components/Layout/Container';
import Logo from 'src/components/Layout/Logo';
import { Link } from 'expo-router';

const propTypes = {};
const defaultProps = {};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	input: {
		width: '100%',
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 20,
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

const SignInScreen = (props) => {
	const [editedUser, setEditedUser] = useState({ email: '', password: '' });
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const handleSubmitFrom = () => {
		const validationErrors = {};

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
		setIsLoading(true);
		setTimeout(() => {
			try {
				dispatch(login(editedUser));
			} catch (error) {
				// Manejar errores aquí si es necesario
			} finally {
				setIsLoading(false);
			}
		}, 1000);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{
				flex: 1,
			}}
		>
			<LoadingOverlay isVisible={isLoading} />
			<Container
				headerShown
				headerTransparent
				showIndicator={false}
			>
				<View style={styles.modalContainer}>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							marginTop: 20,
						}}
					>
						<Logo size={100} />
					</View>
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
						secureTextEntry
						onChangeText={(text) => setEditedUser({ ...editedUser, password: text })}
					/>
					{errors.password && (
						<Text style={styles.errorText}>{errors.password}</Text>
					)}
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginBottom: 20,
							marginTop: 10,
						}}
					>

						<Link href="/" asChild>
							<Text
								style={{

								}}
								type="link"
							>
								Forgot password?
							</Text>
						</Link>
						<Link href="/" asChild>
							<Text
								style={{
									textAlign: 'right',
								}}
								type="link"
							>
								Sign up
							</Text>
						</Link>
					</View>
					<View style={styles.buttonContainer}>
						<SafeAreaView
							style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
						>
							<TouchableOpacity
								onPress={handleSubmitFrom}
								style={{ backgroundColor: '#00953B', padding: 15, borderRadius: 6, width: '100%' }}
							>
								<Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
									Login
								</Text>
							</TouchableOpacity>
						</SafeAreaView>
					</View>
				</View>
				<View
					style={{
						flex: 1,
						justifyContent: 'flex-end',
					}}
				>
					<Text
						style={{
							marginTop: 30,
							marginBottom: 0,
							textAlign: 'center',
						}}
						type="note"
					>
						2023
					</Text>
				</View>
			</Container>
		</KeyboardAvoidingView>
	);
};

SignInScreen.propTypes = propTypes;

SignInScreen.defaultProps = defaultProps;

export default SignInScreen;
