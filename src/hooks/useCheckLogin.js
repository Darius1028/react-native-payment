import { useSelector } from 'react-redux';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';

import AuthStorage from 'src/utils/auth-storage';

export default function useCheckLogin() {
	const auth = useSelector(state => state.auth);
	const { value: loggedIn = false, loading, retry } = useAsyncRetry(async () => {
		try {
			const isLogin = await AuthStorage.loggedIn && !!auth.id;

			return isLogin;
		} catch (e) {
			console.warn(e);
		}
	}, [auth.id]);

	return {
		retry,
		loading,
		loggedIn,
	};
}
