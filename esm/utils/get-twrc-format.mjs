/**
 * @module utils/get-twrc-format
 */

import { identifyTwrcVersion, TwrcVersion } from '../twid.mjs';

/**
 * Check format of Taiwan Resident Certificate.
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Reason: "Old" and "new" are confusing.
 * Solution: Use {@link identifyTwrcVersion} instead.
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
