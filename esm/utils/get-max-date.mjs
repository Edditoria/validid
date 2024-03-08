/**
 * Calculate the expected birthday by providing year only.
 * Useful for putting `maxDate` in `isDateValid()`.
 * @deprecated
 * Not perfectly safe to use user's local time.
 * Consider to refactor using `getAge()` that accepts `currentTimeStr`.
 * @param {number} yearsOld A positive integer representing age.
 * @returns {Date}
 */
export function getMaxDate(yearsOld) {
	const now = new Date();
	const year = now.getFullYear() - yearsOld;
	return new Date(year, now.getMonth(), now.getDate());
}
