/**
 * @module twrc
 */

import { TwidType, identifyTwidType, validateTwid } from './twid.mjs';

/**
 * Validate ID number of Taiwan Resident Certificate (Uniform ID Numbers):
 * - New format from 2021.
 * - Legacy format before 2021.
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Solution: Use {@link validateTwid} and {@link identifyTwidType} instead.
 * @param {string} inputId
 * @return {boolean}
 */
export default function (inputId) {
	console.warn('validid.twrc() is deprecated. Please contact developer to update the program.');
	const res = validateTwid(inputId);
	return res.ok && identifyTwidType(res.id) === TwidType.RC;
}
