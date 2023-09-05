const getFileType = (file) => {
	if (!file || !file.type) {
		return 'other';
	}
	if (file.type?.match('image.*')) {
		return 'image';
	}

	if (file.type?.match('video.*')) {
		return 'video';
	}

	if (file.type?.match('audio.*')) {
		return 'audio';
	}

	return 'other';
};

export default getFileType;
