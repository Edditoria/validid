import { normalize } from './utils/normalize.mjs';
import { getTwidDigit } from './twid.mjs';
import { TwrcVersion, identifyTwrcVersion } from './utils/twrc.mjs';

/** @module core/twrc */

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
	const normId = normalize(id);
	// Validate length:
	// if (normId.length !== TWID_LENGTH) { return false; }
	// Validate pattern:
	const idFormat = identifyTwrcVersion(id);
	if (idFormat === TwrcVersion.NOT_RC) {
		return false;
	}
	// Validate checksum:
	return getTwidDigit(normId) === normId.slice(-1);
}
