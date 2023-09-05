import React from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const useSecondTabPress = (action = f => f) => {
	const isFocused = useIsFocused();
	const navigation = useNavigation();

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('tabPress', (e, a) => {
			if (isFocused) {
				e.preventDefault();

				action();
			}
		});

		return unsubscribe;
	}, [action, isFocused, navigation]);
};

export default useSecondTabPress;
