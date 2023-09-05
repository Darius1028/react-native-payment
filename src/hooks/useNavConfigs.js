import { useSelector } from 'react-redux';

import getNavConfigs from 'src/themes/getNavConfigs';
import getTheme from 'src/themes';

export default function useNavConfigs(configs = {}) {
	const settings = useSelector(state => state.settings);

	return { ...getNavConfigs(getTheme(settings.theme)), ...configs };
}
