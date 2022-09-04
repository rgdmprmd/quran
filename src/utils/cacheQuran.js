const ALL_SURAH = "ALL_SURAH";
const TWO_WEEKS = 1000 * 60 * 60 * 24 * 14;

const currentTime = () => {
	return Date.now();
};

const getAllSurah = () => {
	let allSurahCache = {
		data: {},
		nextCleanup: new Date().getTime() + TWO_WEEKS,
	};

	try {
		const data = localStorage.getItem(ALL_SURAH);

		if (data) {
			allSurahCache = JSON.parse(data);
		}
	} catch (err) {
		console.log(err.message);
	}

	return allSurahCache;
};

const setAllSurahToCache = (value) => {
	const allSurahCache = getAllSurah();
	let data = allSurahCache.data;

	const item = {
		expiry: new Date().getTime() + TWO_WEEKS,
		allSurah: value,
	};

	data = item;

	try {
		localStorage.setItem(ALL_SURAH, JSON.stringify(allSurahCache));
	} catch (err) {
		console.log(err.message);
		cleanUpStorage(data);
	}
};

const cleanUpStorage = (data) => {
	let isDeleted;
	let oldest;
	let oldestKey;

	//if 14 days have been passed, it removes the cache
	for (const key in data) {
		const expiry = data[key].expiry;
		if (expiry && expiry <= currentTime()) {
			delete data[key];
			isDeleted = true;
		}

		//finding the oldest cache in case none of them are expired
		if (!oldest || oldest > expiry) {
			oldest = expiry;
			oldestKey = key;
		}
	}

	//remove the oldest cache if there is no more space in local storage (5 MB)
	if (!isDeleted && oldestKey) {
		delete data[oldestKey];
	}

	localStorage.setItem(
		ALL_SURAH,
		JSON.stringify({
			data: data,
			nextCleanup: currentTime() + TWO_WEEKS,
		})
	);
};

export { setAllSurahToCache, getAllSurah };
