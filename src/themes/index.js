import light from './default';
import dark from './dark';

const getTheme = (theme = 'light') => {
	if (theme === 'dark') {
		return dark;
	}

	return light;
};

export default getTheme;
