export function updateSettings(payload = {}) {
	return {
		type: 'UPDATE_SETTINGS',
		payload,
	};
}
