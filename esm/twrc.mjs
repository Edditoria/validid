import { normalize } from './utils/normalize.mjs';
import { getTWRCFormat } from './utils/get-twrc-format.mjs';
import { getTwidDigit } from './twid.mjs';

/** @module core/twrc */

function isLengthValid(id) {
	return id.length === 10;
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
 *
 * Format of the ID:
 * - "A123456789" - New ID in 2020.
 * - "AB12345678" - Legacy but still valid.
 *
 * In Taiwan, there is another system called National Identification Card.
 * @see module:core/twid
 *
 * @param {string} id
 * @return {boolean}
 */
export function twrc(id) {
	id = normalize(id);
	return !!getTWRCFormat(id) && isChecksumValid(id);
}
