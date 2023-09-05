import React from 'react';

import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const usePreventingGoingBack = (unsavedChanges, message = 'You have unsaved changes. Are you sure to discard them and leave the screen?', title = 'Discard changes?') => {
	const navigation = useNavigation();

	const [force, setForce] = React.useState(false);

	React.useEffect(() => navigation.addListener('beforeRemove', (e) => {
		if (!unsavedChanges || force) {
			return;
		}

		e.preventDefault();
		Alert.alert(
			title,
			message,
			[
				{ text: "Don't leave", style: 'cancel', onPress: () => { } },
				{
					text: 'Discard',
					style: 'destructive',
					onPress: () => navigation.dispatch(e.data.action),
				},
			],
		);
	}), [force, message, navigation, title, unsavedChanges]);

	React.useEffect(() => {
		if (force) {
			navigation.goBack();
		}
	}, [force, navigation]);

	const forceGoBack = React.useCallback(() => {
		setForce(true);
	}, []);

	return forceGoBack;
};

export default usePreventingGoingBack;
