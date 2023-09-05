import { createIconSetFromIcoMoon } from '@expo/vector-icons';

const Icon = createIconSetFromIcoMoon(
	require('src/assets/fonts/icomoon/selection.json'),
	'IcoMoon',
	'icomoon.ttf',
);

export default Icon;
