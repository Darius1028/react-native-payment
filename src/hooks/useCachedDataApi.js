import useAsync from 'react-use/lib/useAsync';
import AuthStorage from 'src/utils/auth-storage';

export default function useCachedDataApi() {
	const state = useAsync(async () => {
		// eslint-disable-next-line no-useless-catch
		try {
			const loggedIn = await AuthStorage.loggedIn;

			return {
				loggedIn,
			};
		} catch (e) {
			throw e;
		}
	}, []);

	return state;
}
