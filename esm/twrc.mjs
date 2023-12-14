import { normalize } from './utils/normalize.mjs';
import { getTWRCFormat } from './utils/get-twrc-format.mjs';
import { isTWIDChecksumValid } from './utils/is-twid-checksum-valid.mjs';

/** @module core/twrc */

function isLengthValid(id) {
	return id.length === 10;
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
	/** @type {string|boolean} - Either 'new', 'old' or false */
	const idFormat = getTWRCFormat(id);
	if (idFormat === 'old') {
		return isTWIDChecksumValid(id, 2);
	}
	if (idFormat === 'new') {
		return isTWIDChecksumValid(id, 1);
	}
	// else: idFormat is false
	return false;
}
