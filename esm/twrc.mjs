import { TwidType, identifyTwidType, verifyTwid } from './twid.mjs';

/**
 * Verify ID number of Taiwan Resident Certificate (Uniform ID Numbers):
 * - New format from 2021.
 * - Legacy format before 2021.
 * @deprecated Use {@link verifyTwid} and {@link identifyTwidType} instead.
 * @param {string} inputId
 * @return {boolean}
 */
export function twrc(inputId) {
	console.warn('Warn: twrc() is deprecated. Please contact the developer to update the program.');
	const res = verifyTwid(inputId);
	return res.ok && identifyTwidType(res.id) === TwidType.RC;
}
