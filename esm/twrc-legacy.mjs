import { normalize } from './utils/normalize.mjs';
import { isTWIDChecksumValid } from './utils/is-twid-checksum-valid.mjs';

/** @module core/twrc-legacy */

function isLengthValid(id) {
	return id.length === 10;
}

function isFormatValid(id) {
	return /^[A-Z][A-D][0-9]{8}$/.test(id);
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
	// return isLengthValid(id) && isFormatValid(id) && isTWIDChecksumValid(id, 2);
	return isFormatValid(id) && isTWIDChecksumValid(id, 2);
}
