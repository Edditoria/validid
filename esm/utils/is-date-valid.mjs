/**
 * Parse a date string to a `Date`.
 * @deprecated
 * @param {string} yyyymmdd A string of date in "YYYYMMDD".
 * @returns {Date}
 * @throws Error of invalid format.
 */
function parseDate(yyyymmdd) {
	if (typeof yyyymmdd !== 'string') {
		throw new TypeError('Input has to be string.');
	}
	if (yyyymmdd.length !== 8) {
		throw new RangeError('Input has to be in format of "YYYYMMDD".');
	}
	const year = yyyymmdd.substring(0, 4);
	const month = yyyymmdd.substring(4, 6);
	const day = yyyymmdd.substring(6, 8);
	const date = new Date(`${year}-${month}-${day}`);
	if (Number.isNaN(date.valueOf())) {
		throw new Error('Invalid date.');
	}
	return date;
}

/**
 * Validate a date-string, includes:
 * - Is a string in format "YYYYMMDD".
 * - Is not a future date.
 * - Is between `minDate` and `maxDate`.
 * - Any step is false, will interrupt and return false.
 *
 * Note about the default `minDate`:
 * - Assuming that only a living person can register for something.
 * - Providing ID number for a dead person is NOT the case.
 * - So, `minDate` is the birth date of world's "living" person verified.
 * - NOT a dead person who does not act on internet.
 * - Source: https://en.wikipedia.org/wiki/Oldest_people
 *
 * @deprecated Should not assume that only a living person can use a system.
 * @param {string} idDate A string of date in "YYYYMMDD".
 * @param {string} [minDate='default'] A string of date in "YYYYMMDD". Optional.
 * @param {(string|Date)} [maxDate='today'] Either "YYYYMMDD" or a `Date` object. Optional.
 * @returns {boolean}
 */
export function isDateValid(idDate, minDate = 'default', maxDate = 'today') {
	/** @type {Date} */
	let parsedIdDate;
	/** @type {Date} */
	let parsedMinDate;
	/** @type {Date} */
	let parsedMaxDate;

	// Keep for legacy reason.
	if (minDate === 'default' || minDate === '') {
		minDate = '18991129';
	}

	// In proper format:
	try {
		parsedIdDate = parseDate(idDate);
		parsedMinDate = parseDate(minDate);
	} catch (error) {
		return false; // Early.
	}

	// Not a future date:
	const now = new Date();
	if (parsedIdDate > now || parsedMinDate > now) {
		return false;
	}

	// Parse maxDate:
	if (maxDate === 'today') {
		parsedMaxDate = now;
	} else if (typeof maxDate === 'string') {
		try {
			parsedMaxDate = parseDate(maxDate);
		} catch (error) {
			return false;
		}
		if (parsedMaxDate < now) {
			return false;
		}
	} else if (maxDate instanceof Date && isFinite(maxDate.getTime())) {
		parsedMaxDate = maxDate;
	} else {
		return false;
	}

	// 5. Finally, check if the idDate falls between minDate and maxDate
	return parsedIdDate >= parsedMinDate && parsedIdDate <= parsedMaxDate;
}
