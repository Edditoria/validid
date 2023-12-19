import { normalize } from './utils/normalize.mjs';
import { getTwidDigit } from './twid.mjs';

/** @module core/twrc-legacy */

function isLengthValid(id) {
	return id.length === 10;
}

function isFormatValid(id) {
	return /^[A-Z][A-D][0-9]{8}$/.test(id);
}

/**
 * @param {string} id
 * @returns {boolean}
 */
function isChecksumValid(id) {
	return id.slice(-1) === getTwidDigit(id);
}

/**
 * Validate ID number of Taiwan Resident Certificate (Uniform ID Numbers).
 * Only validate ID in or before 2020.
 * Format of the id: "AB12345678"
 *
 * In Taiwan, there is another system called National Identification Card.
 * @see module:core/twid
 *
 * @param {string} id
 * @returns {boolean}
 */
export function twrcLegacy(id) {
	id = normalize(id);
	// return isLengthValid(id) && isFormatValid(id) && isChecksumValid(id);
	return isFormatValid(id) && isChecksumValid(id);
}
