import { normalize } from './utils/normalize.mjs';
import { TwidType, getTwidDigit, identifyTwidType } from './twid.mjs';

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
	const idFormat = identifyTwidType(normId);
	if (idFormat !== TwidType.RC) {
		return false;
	}
	// Validate checksum:
	return getTwidDigit(normId) === normId.slice(-1);
}
