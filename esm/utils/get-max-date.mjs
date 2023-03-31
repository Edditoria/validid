/**
 * Calculate the expected birthday by providing year only.
 * Useful for putting `maxDate` in `isDateValid()`.
 * @module utils/get-max-date
 * @param {number} yearsOld - Should be a whole number.
 * @returns {Date}
 */
export function getMaxDate(yearsOld) {
	const now = new Date();
	const year = now.getFullYear() - yearsOld;
	return new Date(year, now.getMonth(), now.getDate());
}
