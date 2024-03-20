import { TwidType, identifyTwidType, verifyTwid } from './twid.mjs';

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
 * @param {string} inputId
 * @return {boolean}
 */
export function twrc(inputId) {
	const res = verifyTwid(inputId);
	return res.ok && identifyTwidType(res.id) === TwidType.RC;
}
