import React from 'react';
import Container from 'src/components/Layout/Container';
import PaymentForm from './paymentForm';

const PaymentScreen = () => {
	return (
		<Container scrollable={false}>
			<PaymentForm />
		</Container>
	);
};

export default PaymentScreen;
