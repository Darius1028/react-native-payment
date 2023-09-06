import * as Font from 'expo-font';

// eslint-disable-next-line no-return-await
const useCachedResources = async () => await Font.loadAsync({
	'SpaceMono': require('src/assets/fonts/SpaceMono-Regular.ttf'),
	'Roboto': require('src/assets/fonts/Roboto/Roboto-Regular.ttf'),
	'RobotoItalic': require('src/assets/fonts/Roboto/Roboto-Italic.ttf'),
	'Roboto-Thin': require('src/assets/fonts/Roboto/Roboto-Thin.ttf'),
	'Roboto-ThinItalic': require('src/assets/fonts/Roboto/Roboto-ThinItalic.ttf'),
	'Roboto-Light': require('src/assets/fonts/Roboto/Roboto-Light.ttf'),
	'Roboto-Medium': require('src/assets/fonts/Roboto/Roboto-Medium.ttf'),
	'Roboto-LightItalic': require('src/assets/fonts/Roboto/Roboto-LightItalic.ttf'),
	'Roboto-Bold': require('src/assets/fonts/Roboto/Roboto-Bold.ttf'),
	'Roboto-BoldItalic': require('src/assets/fonts/Roboto/Roboto-BoldItalic.ttf'),
	'Roboto-MediumItalic': require('src/assets/fonts/Roboto/Roboto-MediumItalic.ttf'),
	'Roboto-Black': require('src/assets/fonts/Roboto/Roboto-Black.ttf'),
	'Roboto-BlackItalic': require('src/assets/fonts/Roboto/Roboto-BlackItalic.ttf'),
});

export default useCachedResources;
