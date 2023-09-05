import Storage from './StorageSecure';

class AuthStorage extends Storage {
	get loggedIn() {
		return (async () => {
			try {
				const value = await this.value;
				return Promise.resolve(!!value && !!value.userId);
			} catch (error) {
				return Promise.reject(error);
			}
		})();
	}

	get accessToken() {
		return (async () => {
			try {
				const value = await this.value;
				return Promise.resolve(!!value && value.accessToken);
			} catch (error) {
				return Promise.reject(error);
			}
		})();
	}

	get refreshToken() {
		return (async () => {
			try {
				const value = await this.value;
				return Promise.resolve(!!value && value.refreshToken);
			} catch (error) {
				return Promise.reject(error);
			}
		})();
	}

	get role() {
		return (async () => {
			try {
				const value = await this.value;
				return Promise.resolve(!!value && value.role);
			} catch (error) {
				return Promise.reject(error);
			}
		})();
	}

	get userId() {
		return (async () => {
			try {
				const value = await this.value;
				return Promise.resolve(!!value && value.userId);
			} catch (error) {
				return Promise.reject(error);
			}
		})();
	}
}

export default new AuthStorage('AUTH');
