import { normalize } from './utils/normalize.mjs';
import { isTWIDChecksumValid } from './utils/is-twid-checksum-valid.mjs';

/**
 * Validate ID number of Taiwan Resident Certificate (Uniform ID Numbers).
 * Only validate ID in or before 2020.
 * Format of the id: "AB12345678"
 *
 * In Taiwan, there is another system called National Identification Card.
 * @see module:core/twid
 *
 * @module core/twrc-legacy
 * @param {string} id
 * @returns {boolean}
 */
export function twrcLegacy(id) {
	// isLengthValid = (id) -> id.length is 10
	const isFormatValid = id => /^[A-Z][A-D][0-9]{8}$/.test(id);

	id = normalize(id);
	// return isLengthValid(id) && isFormatValid(id) && isTWIDChecksumValid(id, 2)
	return isFormatValid(id) && isTWIDChecksumValid(id, 2);
}
