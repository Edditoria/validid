import { validateTwid } from './twid.mjs';
import { TwrcVersion, identifyTwrcVersion } from './utils/twrc.mjs';

/**
 * Validate ID number of Taiwan Resident Certificate (Uniform ID Numbers):
 * Only legacy format before 2021.
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Solution: Use {@link validateTwid} and {@link identifyTwrcVersion} instead.
 * @param {string} inputId
 * @returns {boolean}
 */
export default function (inputId) {
	console.warn('validid.twrcLegacy() is deprecated. Please contact developer to update the program.');
	const res = validateTwid(inputId);
	const ver = identifyTwrcVersion(res.id);
	return res.ok && ver === TwrcVersion.RC_LEGACY;
}
