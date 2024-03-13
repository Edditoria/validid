import { normalize } from './utils/normalize.mjs';
import { validateDateString } from './utils/date-utils.mjs';

/** @module core/cnid */

/**
 * String for regular expression to validate pattern for CNID.
 * @type {string}
 * @example new RegExp(CNID_PATTERN).test('11010120170210193X'); // returns true.
 */
export const CNID_PATTERN = '^[0-9]{17}[0-9X]$';

/**
 * Birth date of the oldest Chinese with reliable record.
 * Assume the oldest Chinese, Alimihan Seyiti, was born in 25 Jun, 1886 and she had an ID card.
 * Source: http://www.scmp.com/news/china/article/1297022/uygur-alimihan-seyiti-age-127-may-set-record-oldest-person-alive
 *
 * This is not used in Validid package directly, but for reference for other developers.
 *
 * @type {string} A string of date "YYYYMMDD".
 */
export const BIRTH_DATE_OF_OLDEST_CHINESE = '18860625';

/**
 * Capture birth date from CNID.
 * @example
 * // Use case: Compare with birthday entered by user:
 * captureBirthDateFromCnid(normalizedId) === yyyymmddFromWebForm
 * @param {string} normId A normalized ID. See: {@link normalize}
 * @returns {string} A string of date in "YYYYMMDD".
 * @throws Invalid date, e.g. 2001-02-29
 */
export function captureBirthDateFromCnid(normId) {
	/** Recall the format of CNID: "110102YYYYMMDD888X" */
	const dateStr = normId.substring(6, 14);
	if (!validateDateString(dateStr)) {
		throw new Error('Invalid date');
	}
	return dateStr;
}

/**
 * Adapts "ISO 7064:1983.MOD 11-2".
 */
function isChecksumValid(id) {
	const identifier = id.slice(0, -1);
	const checkDigit = id.slice(-1) === 'X' ? 10 : +id.slice(-1);
	const getWeight = (n) => Math.pow(2, n - 1) % 11;
	let weightedSum = 0;
	let index = id.length;
	for (var char of identifier) {
		weightedSum += +char * getWeight(index);
		index--;
	}
	const remainder = ((12 - (weightedSum % 11)) % 11) - checkDigit;
	return remainder === 0;
}

/**
 * Validate ID card number of China (2nd generation).
 * - Original name: Resident Identity Card of the People's Republic of China (PRC).
 * - Format: "LLLLLLYYYYMMDD000X".
 * @param {string} id
 * @returns {boolean}
 */
export function cnid(id) {
	const normId = normalize(id);
	// Validate length:
	// if (normId.length !== 18) { return false; }
	// Validate pattern:
	if (!new RegExp(CNID_PATTERN).test(normId)) {
		return false;
	}
	// Validate date:
	/** @type {string} */
	let birthDate;
	try {
		birthDate = captureBirthDateFromCnid(normId);
	} catch (error) {
		return false; // Reason: Invalid date, e.g. 2001-02-29.
	}
	const now = new Date().toLocaleDateString('sv').replace(/-/g, '');
	if (+birthDate >= +now) {
		return false; // Reason: Invalid date: Birth date is in future.
	}
	return isChecksumValid(normId);
}
