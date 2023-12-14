import { normalize } from './utils/normalize.mjs';
import { isTWIDChecksumValid } from './utils/is-twid-checksum-valid.mjs';

/** @module core/twid */

function isLengthValid(id) {
	return id.length === 10;
}

function isFormatValid(id) {
	return /^[A-Z][12][0-9]{8}$/.test(id);
}

/**
 * Validate ID card number of Taiwan.
 * - Original name: National Identification Card of the Republic of China.
 * - Format: "A123456789".
 *
 * There is another system called Taiwan Resident Certificate (Uniform ID Numbers).
 * @see module:core/twrc
 *
 * @param {string} id
 * @returns {boolean}
 */
export function twid(id) {
	id = normalize(id);
	// return isLengthValid(id) && isFormatValid(id) && isTWIDChecksumValid(id, 1);
	return isFormatValid(id) && isTWIDChecksumValid(id, 1);
}
