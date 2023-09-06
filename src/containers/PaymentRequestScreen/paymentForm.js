/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'src/components/Layout/Container';
import InputText from 'src/components/UIControls/InputText';
import { createPaymentRequest, cleanPaymentRequest } from 'src/redux/actions/payment';
import { LoadingOverlay } from '../../components/UIControls/loadingOverlay';

const initialFormData = {
	third: {
		document: '1423358454',
		document_type: '05',
		name: 'Homer J. Simpsons',
		email: 'test@gmail.com',
		phones: '0987569852',
		address: 'Av. Siempre Vivaa',
	},
	generate_invoice: '320',
	description: 'Pago de pruebas',
	amount: '1.10',
	amount_with_tax: '0.4',
	amount_without_tax: '0.6',
	tax_value: '0.10',
};

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  padding: 16,
	},
	label: { marginBottom: 10, marginTop: 10 },
	sectionLabel: {
	  marginTop: 20,
	  marginBottom: 10,
	  fontSize: 18,
	  fontWeight: 'bold',
	  borderBottomWidth: 1,
	  borderBottomColor: 'white',
	},
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	token: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		fontSize: 18,
		fontWeight: 'bold',
	},
	contentContainer: {
		paddingTop: 10,
		flexGrow: 1,
	},

});

const PaymentForm = () => {
	const dispatch = useDispatch();
	const messagePayment = useSelector(state => state.payments.messagePaymentRequest);
	const errorPayment = useSelector(state => state.payments.error);
	const paymentRequest = useSelector(state => state.payments.paymentRequest);
	const [formData, setFormData] = useState(initialFormData);
	const [isLoading, setIsLoading] = useState(false);
	const [token, setToken] = useState(false);
	const scrollViewRef = useRef(null);

	const handleInputChange = (key, value) => {
		setFormData({
			...formData,
			[key]: value,
		});
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		await dispatch(createPaymentRequest(formData));
		setTimeout(() => {
			setIsLoading(false);
		  }, 200);
	};

	useEffect(() => {
		if (messagePayment) {
			if (errorPayment) {
				setToken({ info: messagePayment, error: true });
			} else {
				setToken(paymentRequest ? { info: paymentRequest.token, error: false } : null);
			}
			dispatch(cleanPaymentRequest());
			scrollViewRef.current.scrollTo({ y: 0, animated: true });
		}
	}, [messagePayment, errorPayment, dispatch, paymentRequest]);

	useEffect(() => {
		dispatch(cleanPaymentRequest());
	}, []);

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			ref={scrollViewRef}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<LoadingOverlay isVisible={isLoading} />
				<Container
					headerShown
					headerTransparent
					loading={false}
					showIndicator={false}
				>
					{token && (
						<Text style={{ ...styles.token, color: token.error ? 'red' : 'green' }}>
							{token.error ? `Error: ${token.info}` : `Token: ${token.info}`}
						</Text>
					)}
					<View style={styles.container}>
						<Text style={styles.sectionLabel}>Entity Payment</Text>
						<Text style={styles.label}>Document</Text>
						<InputText
							value={formData.third.document}
							onChangeText={(text) => handleInputChange('third', { ...formData.third, document: text })}
						/>

						<Text style={styles.label}>Document Type</Text>
						<InputText
							value={formData.third.document_type}
							onChangeText={(text) => handleInputChange('third', { ...formData.third, document_type: text })}
						/>

						<Text style={styles.label}>Name</Text>
						<InputText
							value={formData.third.name}
							onChangeText={(text) => handleInputChange('third', { ...formData.third, name: text })}
						/>

						<Text style={styles.label}>Email</Text>
						<InputText
							value={formData.third.email}
							onChangeText={(text) => handleInputChange('third', { ...formData.third, email: text })}
						/>

						<Text style={styles.label}>Phones</Text>
						<InputText
							value={formData.third.phones}
							onChangeText={(text) => handleInputChange('third', { ...formData.third, phones: text })}
						/>

						<Text style={styles.label}>Address</Text>
						<InputText
							value={formData.third.address}
							onChangeText={(text) => handleInputChange('third', { ...formData.third, address: text })}
						/>
						<Text style={styles.sectionLabel}>General information</Text>
						<Text style={styles.label}>Generate Invoice</Text>
						<InputText
							value={formData.generate_invoice}
							onChangeText={(text) => handleInputChange('generate_invoice', text)}
						/>

						<Text style={styles.label}>Description</Text>
						<InputText
							value={formData.description}
							onChangeText={(text) => handleInputChange('description', text)}
						/>

						<Text style={styles.label}>Amount</Text>
						<InputText
							value={formData.amount}
							onChangeText={(text) => handleInputChange('amount', text)}
						/>

						<Text style={styles.label}>Amount with Tax</Text>
						<InputText
							value={formData.amount_with_tax}
							onChangeText={(text) => handleInputChange('amount_with_tax', text)}
						/>

						<Text style={styles.label}>Amount without Tax</Text>
						<InputText
							value={formData.amount_without_tax}
							onChangeText={(text) => handleInputChange('amount_without_tax', text)}
						/>

						<Text style={styles.label}>Tax Value</Text>
						<InputText
							value={formData.tax_value}
							onChangeText={(text) => handleInputChange('tax_value', text)}
						/>

						<SafeAreaView
							style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
						>
							<TouchableOpacity
								onPress={handleSubmit}
								style={{ backgroundColor: '#00953B', padding: 15, borderRadius: 4, width: '100%' }}
							>
								<Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
									Submit
								</Text>
							</TouchableOpacity>
						</SafeAreaView>
					</View>
				</Container>
			</KeyboardAvoidingView>
		</ScrollView>

	);
};

export default PaymentForm;
