import { normalize } from './utils/normalize.mjs';
import { getAge, validateDateString } from './utils/date-utils.mjs';

/** @module core/krid */

/**
 * String for regular expression to validate pattern for KRID.
 * @type {string}
 * @example new RegExp(KRID_PATTERN).test('7810305668081') // Returns true.
 */
export const KRID_PATTERN = '^[0-9]{13}$';

/** @type {number} Minimum age to register a ID card. */
export const KRID_MIN_AGE = 17;

/**
 * Capture birth date from KRID.
 * @example
 * // Use case: Compare with birthday entered by user:
 * captureBirthDateFromKrid(normalizedId) === yyyymmddFromWebForm
 * @param {string} normId A normalized ID. See: {@link normalize}
 * @returns {string} A string in format of date "YYYYMMDD".
 * @throws Invalid date, e.g. 2001-02-29.
 */
export function captureBirthDateFromKrid(normId) {
	/** Recall the format of KRID: "YYMMDDSBBBBNC" */
	const sDigit = normId.substring(6, 7);
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
	const dateStr = yearPrefix + normId.substring(0, 6);
	if (!validateDateString(dateStr)) {
		throw new Error('Invalid date');
	}
	return dateStr;
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
	/** @type {string} */
	let birthDate;
	try {
		birthDate = captureBirthDateFromKrid(normId);
	} catch (error) {
		return false; // Reason: The entered date is not a valid date, e.g. 2001-02-29.
	}
	const now = new Date().toLocaleDateString('sv').replace(/-/g, '');
	// if (+now < +birthDate) return false; // Reason: Birth date is a future date.
	const age = getAge(birthDate, now);
	if (age < KRID_MIN_AGE) {
		return false; // Reason: Not legal age to get a ID.
	}
	// Validate checksum:
	return getKridDigit(normId) === normId.slice(-1);
}
