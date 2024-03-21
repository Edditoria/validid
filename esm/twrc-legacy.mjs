import { verifyTwid } from './twid.mjs';
import { TwrcVersion, identifyTwrcVersion } from './utils/twrc.mjs';

/**
 * Verify ID number of Taiwan Resident Certificate (Uniform ID Numbers):
 * Only legacy format before 2021.
 * @deprecated Use {@link verifyTwid} and {@link identifyTwrcVersion} instead.
 * @param {string} inputId
 * @returns {boolean}
 */
export function twrcLegacy(inputId) {
	console.warn('Warn: twrcLegacy() is deprecated. Please contact the developer to update the program.');
	const res = verifyTwid(inputId);
	const ver = identifyTwrcVersion(res.id);
	return res.ok && ver === TwrcVersion.RC_LEGACY;
}
