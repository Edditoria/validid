import { normalize } from './utils/normalize.mjs';
import { getMaxDate } from './utils/get-max-date.mjs';
import { isDateValid } from './utils/is-date-valid.mjs';

/** @module core/krid */

/**
 * String for regular expression to validate pattern for KRID.
 * @type {string}
 * @example new RegExp(KRID_PATTERN).test('7810305668081') // Returns true.
 */
export const KRID_PATTERN = '^[0-9]{13}$';

/**
 * Parse the date into 'YYYYMMDD' according to 'S' digit.
 */
function isThisDateValid(id) {
	const sDigit = id.substring(6, 7);
	let yearPrefix;
	switch (sDigit) {
		case '1':
		case '2':
		case '5':
		case '6':
			yearPrefix = '19';
			break;
		case '3':
		case '4':
		case '7':
		case '8':
			yearPrefix = '20';
			break;
		default:
			yearPrefix = '18';
	}
	const date = yearPrefix + id.substring(0, 6);
	const maxDate = getMaxDate(17); // 17 years old to register for an ID
	return isDateValid(date, 'default', maxDate);
}

/**
 * Get check digit of a South Korea ID.
 * NOTE: This function does not validate its pattern.
 * @example getKridDigit('781030566808_') // returns 1.
 * @param {string} id Full ID with check digit. Use `_` if check digit is unknown.
 * @returns {string} Check digit: "0" to "9".
 */
export function getKridDigit(id) {
	const weight = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 1]; // 1 is added for check digit
	let weightedSum = 0;
	let idx = 0;
	const identifier = id.slice(0, -1);
	for (const char of identifier) {
		weightedSum += +char * weight[idx];
		idx++;
	}
	return ((11 - (weightedSum % 11)) % 10).toString();
}

/**
 * Validate ID card number of South Korea.
 * - Original name: Resident Registration Number (RRN).
 * - Format: "YYMMDD-SBBBBNC".
 * @param {string} id
 * @returns {boolean}
 */
export function krid(id) {
	const normId = normalize(id);
	// Validate length:
	// if (normId.length !== 13) { return false; }
	// Validate pattern:
	if (!new RegExp(KRID_PATTERN).test(normId)) {
		return false;
	}
	// Validate date:
	if (!isThisDateValid(normId)) {
		return false;
	}
	// Validate checksum:
	return getKridDigit(normId) === normId.slice(-1);
}
