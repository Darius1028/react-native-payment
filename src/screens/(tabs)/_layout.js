import React from 'react';
import { Platform, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import useTheme from 'src/hooks/useTheme';
import withRequiredAuthentication from 'src/HOCs/withRequiredAuthentication';
import Logo from 'src/components/Layout/Logo';
import View from 'src/components/UIDisplay/View';
import { useDispatch } from 'react-redux';
import { logout } from 'src/redux/actions/auth';

const propTypes = {};

const defaultProps = {};

const TabLayout = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const theme = useTheme();

	const handleLogout = React.useCallback(async () => {
		Alert.alert(
			'Logout ?',
			'',
			[
				{ text: 'Cancel', onPress: () => { } },
				{
					text: 'Ok',
					onPress: async () => {
						try {
							await dispatch(await logout());

							router.replace('/login');
						// eslint-disable-next-line no-empty
						} catch (error) { }
					},
				},
			],
		);
	}, [dispatch, router]);

	return (
		<Tabs
			screenOptions={{
				headerShown: true,
				lazy: true,
				unmountOnBlur: true,
				headerLeft: () => {
					return (
						<Logo
							style={{
								width: 24,
								height: 24,
								marginBottom: 5,
								marginLeft: 15,
							}}
							fullText={false}
						/>
					);
				},
				headerRight: () => {
					return (
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginRight: 15,
							}}
						>
							<TouchableOpacity
								onPress={() => {
									handleLogout();
								}}
								style={{ marginLeft: 10 }}
							>
								<Ionicons
									name="log-out"
									size={24}
									color={theme.color_text_base}
								/>
							</TouchableOpacity>
						</View>
					);
				},
				tabBarActiveTintColor: theme.brand_primary,
				tabBarStyle: {
					backgroundColor: theme.fill_base,
					borderTopColor: theme.name === 'dark' ? '#3e4667' : theme.border_color_base,
					...Platform.select({
						android: {
							elevation: 6,
						},
						default: {
							shadowColor: theme.name === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(111, 207, 151, 0.3)',
							shadowOffset: { height: -4, width: -4 },
							shadowOpacity: 0.6,
							shadowRadius: 4,
						},
					}),
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Users',
					tabBarIcon: ({ color }) => <Ionicons name="people-circle-outline" size={24} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="paymentRequest"
				options={{
					title: 'Payment Request',
					tabBarIcon: ({ color }) => <Ionicons name="code" size={24} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="paymentLink"
				options={{
					title: 'Payment Link',
					tabBarIcon: ({ color }) => <Ionicons name="link" size={24} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="payments"
				options={{
					title: 'Payments',
					tabBarIcon: ({ color }) => <Ionicons name="wallet-outline" size={24} color={color} />,
				}}
			/>
		</Tabs>
	);
};

TabLayout.propTypes = propTypes;

TabLayout.defaultProps = defaultProps;

export default withRequiredAuthentication(TabLayout, { loginIsRequired: true });
