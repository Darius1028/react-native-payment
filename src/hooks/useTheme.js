import { useSelector } from 'react-redux';

import getTheme from 'src/themes';

export default function useTheme(configs = {}) {
	const settings = useSelector(state => state.settings);

	return { ...getTheme(settings.theme), ...configs };
}
