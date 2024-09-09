/**
 * @module utils/get-twrc-format
 */

import { identifyTwrcVersion, TwrcVersion } from '../twid.mjs';

/**
 * Check format of Taiwan Resident Certificate, or invalid.
 * @deprecated
 * "Old" and "new" are confusing. Use {@link identifyTwrcVersion} instead.
 * This function will be removed without notice. Please update your code ASAP.
 * @param {string} id A [normalized ID]{@link normalize}.
 * @returns {'old'|'new'|false}
 */
export default function (id) {
	const ver = identifyTwrcVersion(id);
	if (ver === TwrcVersion.RC_2021) {
		return 'new';
	}
	if (ver === TwrcVersion.RC_LEGACY) {
		return 'old';
	}
	return false;
}
