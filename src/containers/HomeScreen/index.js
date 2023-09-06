import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { users, createUser, updateUser, deleteUser } from 'src/redux/actions/users';
import { ScrollView, StyleSheet, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import Text from 'src/components/UIDisplay/Text';
import View from 'src/components/UIDisplay/View';
import Container from 'src/components/Layout/Container';
import UserItem from './userItem';
import EditUserModal from './editUserModal';
import { LoadingOverlay } from 'src/components/UIControls/loadingOverlay';

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
	const usersData = useSelector(state => state.users);
	const [editingUser, setEditingUser] = useState(null);
	const [isEditingModalVisible, setIsEditingModalVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const handleEditUser = (user) => {
		setEditingUser(user);
		setIsEditingModalVisible(true);
	};

	const handleSaveUser = async (userData) => {
		if (userData.id === undefined) {
			dispatch(createUser(userData));
		} else {
			const editUser = { id: userData.id, name: userData.name, email: userData.email, password: userData.password };
			dispatch(updateUser(editUser));
		}
		setEditingUser({ name: '', email: '', password: '' });
		setIsEditingModalVisible(false);
	};

	const handleCancelEdit = () => {
		setIsEditingModalVisible(false);
		setEditingUser({ name: '', email: '', password: '' });
	};

	useEffect(() => {
		const fetchData = async () => {
			setTimeout(async () => {
				await dispatch(users());
				setIsLoading(false);
			}, 500);
		};
		fetchData();
	}, []);

	const handleDeleteUser = (user) => {
		Alert.alert(
			'Delete',
			`User: ${user.name} \nEmail: ${user.email}`,
			[
				{ text: 'Cancel', onPress: () => { } },
				{
					text: 'Ok',
					onPress: async () => {
						try {
							await dispatch(await deleteUser(user));
						// eslint-disable-next-line no-empty
						} catch (error) {
						}
					},
				},
			],
		);
	};

	return (
		<Container scrollable={false}>
			<LoadingOverlay isVisible={isLoading} />
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
			>
				<View style={styles.welcomeContainer}>
					<Text style={styles.title}>Users</Text>
				</View>
				<View style={styles.cell}>
					{usersData.length === 0 ? (
						<Text>Empty users.</Text>
					) : (
						<View>
							<ScrollView>
								{usersData.map((user) => (
									<UserItem
										key={user.email}
										user={user}
										onEdit={() => {
											handleEditUser(user);
										}}
										onDelete={() => {
											handleDeleteUser(user);
										}}
									/>
								))}
							</ScrollView>
						</View>
					)}

					<SafeAreaView
						style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
					>
						<TouchableOpacity
							onPress={() => setIsEditingModalVisible(true)}
							style={{ backgroundColor: '#00953B', padding: 15, borderRadius: 4, width: '90%' }}
						>
							<Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
								Create User
							</Text>
						</TouchableOpacity>
					</SafeAreaView>
					{isEditingModalVisible && (
						<EditUserModal
							user={editingUser}
							onSave={handleSaveUser}
							onCancel={handleCancelEdit}
						/>
					)}
				</View>
			</ScrollView>
		</Container>
	);
};

export default HomeScreen;
