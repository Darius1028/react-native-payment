/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'src/components/Layout/Container';
import InputText from 'src/components/UIControls/InputText';
import { createPaymentLink, cleanPaymentLink } from 'src/redux/actions/payment';
import { LoadingOverlay } from '../../components/UIControls/loadingOverlay';

const initialFormData = {
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
	const messagePayment = useSelector(state => state.payments.messagePaymentLink);
	const errorPayment = useSelector(state => state.payments.error);
	const paymentLink = useSelector(state => state.payments.paymentLink);
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
		await dispatch(createPaymentLink(formData));
		setTimeout(() => {
			setIsLoading(false);
		  }, 200);
	};

	useEffect(() => {
		if (messagePayment) {
			if (errorPayment) {
				setToken(null);
			} else {
				setToken(paymentLink ? paymentLink.token : null);
				scrollViewRef.current.scrollTo({ y: 0, animated: true });
			}
			dispatch(cleanPaymentLink());
		}
	}, [messagePayment, errorPayment, dispatch, paymentLink]);

	useEffect(() => {
		dispatch(cleanPaymentLink());
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
						<Text style={styles.token}> Token: {token}</Text>
					)}
					<View style={styles.container}>
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
