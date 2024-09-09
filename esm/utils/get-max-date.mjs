/**
 * @module utils/get-max-date
 */

/**
 * Calculate the expected birthday by providing year only.
 * Useful for putting `maxDate` in `isDateValid()`.
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Reason: Not perfectly safe to use user's local time.
 * Solution: Refactor using `getAge()` that accepts `currentTimeStr`.
 * This function will be removed without notice. Please update your code ASAP.
 * @param {number} yearsOld A positive integer representing age.
 * @returns {Date}
 */
export default function (yearsOld) {
	const now = new Date();
	const year = now.getFullYear() - yearsOld;
	return new Date(year, now.getMonth(), now.getDate());
}
