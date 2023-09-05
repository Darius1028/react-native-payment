import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { payments } from 'src/redux/actions/payment';
import { ScrollView, StyleSheet } from 'react-native';

import Text from 'src/components/UIDisplay/Text';
import View from 'src/components/UIDisplay/View';
import Container from 'src/components/Layout/Container';
import Item from './item';
import { LoadingOverlay } from '../../components/UIControls/loadingOverlay';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		textAlign: 'center',
		flex: 1,
		width: '80%',
		fontWeight: 'bold',
	},
	contentContainer: {
		paddingTop: 30,
		flexGrow: 1,
	},
	welcomeContainer: {
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 20,
	},
	cell: {
		textAlign: 'center',
		flex: 1,
		width: '100%',
		marginTop: 10,
		marginBottom: 10,
	},
	button: {
		marginVertical: 10,
		alignSelf: 'center',
		alignItems: 'flex-end',
	},
});

const HomeScreen = () => {
	const dispatch = useDispatch();
	const data = useSelector(state => state.payments.payments);

	useEffect(() => {
		dispatch(payments());
	}, []);

	if (data === undefined) {
		return (<LoadingOverlay isVisible />);
	}

	return (
		<Container scrollable={false}>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
			>
				<View style={styles.welcomeContainer}>
					<Text style={styles.title}>Payments</Text>
				</View>
				<View style={styles.cell}>
					{data.length === 0 ? (
						<Text>Empty payments.</Text>
					) : (
						<View>
							<ScrollView>
								{data.map((payment, index) => (
									<Item
										key={index}
										payment={payment}
									/>
								))}
							</ScrollView>
						</View>
					)}
				</View>
			</ScrollView>
		</Container>
	);
};

export default HomeScreen;
