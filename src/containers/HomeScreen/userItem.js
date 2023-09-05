import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between', // Alinea elementos a la derecha
	},
	buttonContainer: {
		flexDirection: 'row', // Coloca botones en fila horizontal
	},
	button: {
		width: 50,
		maxHeight: 50,
		marginLeft: 5, // Agregar margen izquierdo entre botones si es necesario
	},
	column: {
		fontSize: 11,
	},
});

const UserItem = ({ user, onEdit, onDelete }) => {
	return (
		<View style={styles.container}>
			<View style={styles.column}>
				<Text>Nombre:</Text>
				<Text>{user.name}</Text>
			</View>
			<View style={styles.column}>
				<Text>Correo electrónico:</Text>
				<Text>{user.email}</Text>
			</View>
			<View style={styles.buttonContainer}>
				<SafeAreaView
					style={{ }}
				>
					<TouchableOpacity
						onPress={() => onEdit(user.id)}
						style={{
							backgroundColor: '#00953B',
							padding: 15,
							borderRadius: 4,
							width: 50,
							height: 50,
							marginLeft: 5,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<AntDesign name="edit" size={11} color="white" />
					</TouchableOpacity>
				</SafeAreaView>
				<SafeAreaView
					style={{ }}
				>
					<TouchableOpacity
						onPress={() => onDelete(user.id)}
						style={{
							backgroundColor: '#00953B',
							padding: 15,
							borderRadius: 4,
							width: 50,
							height: 50,
							marginLeft: 5,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<AntDesign name="delete" size={11} color="white" />
					</TouchableOpacity>
				</SafeAreaView>
			</View>
		</View>
	);
};

export default UserItem;
