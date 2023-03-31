import { normalize } from './utils/normalize.mjs';
import { isTWIDChecksumValid } from './utils/is-twid-checksum-valid.mjs';

/**
 * Validate ID card number of Taiwan.
 * - Original name: National Identification Card of the Republic of China.
 * - Format: "A123456789".
 *
 * There is another system called Taiwan Resident Certificate (Uniform ID Numbers).
 * @see module:core/twrc
 *
 * @module core/twid
 * @param {string} id
 * @returns {boolean}
 */
export function twid(id) {
	// isLengthValid = (id) -> id.length is 10
	const isFormatValid = id => /^[A-Z][12][0-9]{8}$/.test(id);

	id = normalize(id);
	// return isLengthValid(id) and isFormatValid(id) and isTWIDChecksumValid(id, 1)
	return isFormatValid(id) && isTWIDChecksumValid(id, 1);
}
