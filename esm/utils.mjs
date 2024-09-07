/**
 * @module utils
 */

/**
 * Normalize an ID by:
 * - `id.toUpperCase()`.
 * - Remove '-' and '/' at any position.
 * - Remove whitespace.
 * - Remove '(' and ')' at the end of the string, e.g. 'A123456(0)'.
 * @param {string} id
 * @returns {string} Normalized ID
 */
export function normalize(id) {
	let re = /[-/\s]/g;
	id = id.toUpperCase().replace(re, '');
	re = /\([A-Z0-9]\)$/;
	if (re.test(id)) {
		id = id.replace(/[()]/g, '');
	}
	return id;
}

/**
 * Check if the character is uppercase / captial letter.
 * @param {string} character
 * @returns {boolean}
 */
export function isCaptialLetter(character) {
	return /^[A-Z]$/.test(character);
}

/**
 * Simply get age ignoring time zone.
 *
 * NOTE: You may want to validate the parameters. See {@link validateDateString}.
 *
 * NOTE: This function may return negative number.
 *
 * @param {string} birthDateStr Birth date in format of "YYYYMMDD".
 * @param {string} currentTimeStr Current time in format of "YYYYMMDD".
 * @returns {number} Age in integar.
 */
export function getAge(birthDateStr, currentTimeStr) {
	const bYear = +birthDateStr.substring(0, 4);
	const bMonth = +birthDateStr.substring(4, 6);
	const bDay = +birthDateStr.substring(6, 8);
	const cYear = +currentTimeStr.substring(0, 4);
	const cMonth = +currentTimeStr.substring(4, 6);
	const cDay = +currentTimeStr.substring(6, 8);
	let age = cYear - bYear;
	if (cMonth < bMonth) {
		age--;
	} else if (cMonth === bMonth && cDay < bDay) {
		age--;
	}
	return age;
}

/**
 * Validate a date-like string.
 * @param {string} yyyymmdd A string of date "YYYYMMDD".
 * @returns {boolean}
 */
export function validateDateString(yyyymmdd) {
	if (typeof yyyymmdd !== 'string') {
		return false;
	}
	if (yyyymmdd.length !== 8) {
		return false;
	}
	const year = yyyymmdd.substring(0, 4);
	const month = yyyymmdd.substring(4, 6);
	const day = yyyymmdd.substring(6, 8);
	const date = new Date(`${year}-${month}-${day}`);
	return !Number.isNaN(date.valueOf());
}
