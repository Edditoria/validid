/** @module utils/twrc */

/**
 * Version of numbering system of RC (Resident Certificate).
 * @readonly
 * @enum {string}
 */
export const TwrcVersion = Object.freeze({
	RC_2021: 'RC_2021',
	RC_LEGACY: 'RC_LEGACY',
	NOT_RC: 'NOT_RC',
});

/**
 * String for regular expression to validate the pattern for Taiwan RC.
 * @readonly
 * @example new RegExp(TwrcPattern.RC_LEGACY).test('A800000014'); // Returns true
 */
export const TwrcPattern = Object.freeze({
	RC_2021: '^[A-Z][89][0-9]{8}$',
	RC_LEGACY: '^[A-Z][A-D][0-9]{8}$',
});

/**
 * Identify the version of a Taiwan RC.
 * @param {string} id Expect the ID is normalized.
 * @returns {TwrcVersion} Either legacy, 2021 version, not-RC.
 */
export function identifyTwrcVersion(id) {
	if (new RegExp(TwrcPattern.RC_LEGACY).test(id)) {
		return TwrcVersion.RC_LEGACY;
	}
	if (new RegExp(TwrcPattern.RC_2021).test(id)) {
		return TwrcVersion.RC_2021;
	}
	// Else:
	return TwrcVersion.NOT_RC;
}
