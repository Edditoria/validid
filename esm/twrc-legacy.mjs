import { validateTwid } from './twid.mjs';
import { TwrcVersion, identifyTwrcVersion } from './utils/twrc.mjs';

/**
 * Validate ID number of Taiwan Resident Certificate (Uniform ID Numbers):
 * Only legacy format before 2021.
 * @deprecated Use {@link validateTwid} and {@link identifyTwrcVersion} instead.
 * @param {string} inputId
 * @returns {boolean}
 */
export function twrcLegacy(inputId) {
	console.warn('Warn: twrcLegacy() is deprecated. Please contact the developer to update the program.');
	const res = validateTwid(inputId);
	const ver = identifyTwrcVersion(res.id);
	return res.ok && ver === TwrcVersion.RC_LEGACY;
}
