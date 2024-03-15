import { normalize } from './utils/normalize.mjs';
import { TwidType, identifyTwidType } from './twid.mjs';
import { getTwidDigit } from './twid.mjs';

/** @module core/twrc-legacy */

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
	const normId = normalize(id);
	// Validate length:
	// if (normId.length !== TWID_LENGTH) { return false; }
	// Validate pattern:
	if (identifyTwidType(id) !== TwidType.LEGACY_RC) {
		return false;
	}
	// Validate checksum:
	return getTwidDigit(normId) === normId.slice(-1);
}
