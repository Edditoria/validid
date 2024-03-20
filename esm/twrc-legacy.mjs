import { verifyTwid } from './twid.mjs';
import { TwrcVersion, identifyTwrcVersion } from './utils/twrc.mjs';

/** @module core/twrc-legacy */

/**
 * Validate ID number of Taiwan Resident Certificate (Uniform ID Numbers).
 * Only validate ID in or before 2020.
 * Format of the id: "AB12345678"
 *
 * In Taiwan, there is another system called National Identification Card.
 * @see module:core/twid
 *
 * @param {string} inputId
 * @returns {boolean}
 */
export function twrcLegacy(inputId) {
	const res = verifyTwid(inputId);
	const ver = identifyTwrcVersion(res.id);
	return res.ok && ver === TwrcVersion.RC_LEGACY;
}
