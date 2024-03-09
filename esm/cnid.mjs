import { normalize } from './utils/normalize.mjs';
import { isDateValid } from './utils/is-date-valid.mjs';

/** @module core/cnid */

/**
 * String for regular expression to validate pattern for CNID.
 * @type {string}
 * @example new RegExp(CNID_PATTERN).test('11010120170210193X'); // returns true.
 */
export const CNID_PATTERN = '^[0-9]{17}[0-9X]$';

function isThisDateValid(id) {
	/*
	Assume the oldest Chinese, Luo Meizhen, was born in 25 Jun, 1886 and he had an ID card.
	Source: http://www.scmp.com/news/china/article/1297022/uygur-alimihan-seyiti-age-127-may-set-record-oldest-person-alive
	*/
	return isDateValid(id.substring(6, 14), '18860625');
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
	return isThisDateValid(normId) && isChecksumValid(normId);
}
