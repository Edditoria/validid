import { normalize } from './utils/normalize.mjs';
import { isCaptialLetter } from './utils/is-capital-letter.mjs';

/** @module core/twid */

/** Each letter represents a value from "10" to "35". */
const letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';

/**
 * Type of a TWID.
 * You can get its name using symbol method such as `TwidType.NIC.description`.
 * @readonly
 * @enum {Symbol}
 */
export const TwidType = Object.freeze({
	NIC: Symbol('National Identification Card'),
	NEW_RC: Symbol('new Resident Certificate'),
	LEGACY_RC: Symbol('legacy Resident Certificate'),
	INVALID: Symbol('invalid'),
});

/**
 * String for regular expression to validate pattern for TWID.
 * @readonly
 * @example new RegExp(twidPattern.NIC).test('A123456789'); // Returns true
 */
export const twidPattern = Object.freeze({
	NIC: '^[A-Z][12][0-9]{8}$',
	NEW_RC: '^[A-Z][89][0-9]{8}$',
	LEGACY_RC: '^[A-Z][A-D][0-9]{8}$',
});

/**
 * Identify the type of a Taiwan ID.
 * You can get the name of the result using `returnedSymbol.description`.
 * @param {string} id Expect the ID is normalized.
 * @returns {TwidType} Either NIC, new RC, legacy RC or invalid.
 */
export function identifyTwidType(id) {
	if (new RegExp(twidPattern.NIC).test(id)) {
		return TwidType.NIC;
	}
	if (new RegExp(twidPattern.LEGACY_RC).test(id)) {
		return TwidType.LEGACY_RC;
	}
	if (new RegExp(twidPattern.NEW_RC).test(id)) {
		return TwidType.NEW_RC;
	}
	// Else:
	return TwidType.INVALID;
}

/**
 * Get weighted sum of the region code, aka the first character in Taiwan ID.
 * @param {string} id The whole ID or its first character.
 * @param {number} [weight=9] Default: 9.
 * @returns {number}
 */
function getRegionCodeValue(id, weight = 9) {
	const idx = letters.indexOf(id[0]);
	return Math.floor(idx / 10 + 1) + idx * weight;
}

/**
 * Get weighted sum of the gender code, aka the second character in Taiwan ID.
 * @param {string} id The whole ID or first 2 characters.
 * @param {number} [weight=8] Default: 8.
 * @returns {number}
 */
function getGenderCodeValue(id, weight = 8) {
	const gCode = id[1];
	const val = isCaptialLetter(gCode) ? +letters.indexOf(gCode) : +gCode;
	return val * weight;
}

/**
 * Get check digit of Taiwan ID, including TWID/TWRC.
 * NOTE: This function does not validate its pattern.
 * @example getTwidDigit('A12345678_') // returns 9.
 * @param {string} id The whole ID including check digit. Use `_` if check digit is unknown.
 * @returns {string}
 */
export function getTwidDigit(id) {
	// Weighted sum of 1st and 2nd characters:
	let weightedSum = getRegionCodeValue(id) + getGenderCodeValue(id);
	// Process Weighted sum of other characters but check digit:
	const identifier = id.slice(2, -1);
	let weight = identifier.length;
	for (const char of identifier) {
		weightedSum += +char * weight;
		weight--;
	}
	return '' + ((10 - (weightedSum % 10)) % 10);
	// return String(10 - (weightedSum % 10)).slice(-1); // ~20% slower.
}

function isLengthValid(id) {
	return id.length === 10;
}

/**
 * @param {string} id
 * @returns {boolean}
 */
function isFormatValid(id) {
	return identifyTwidType(id) === TwidType.NIC;
}

/**
 * @param {string} id
 * @returns {boolean}
 */
function isChecksumValid(id) {
	return id.slice(-1) === getTwidDigit(id);
}

/**
 * Validate ID card number of Taiwan.
 * - Original name: National Identification Card of the Republic of China.
 * - Format: "A123456789".
 *
 * There is another system called Taiwan Resident Certificate (Uniform ID Numbers).
 * @see module:core/twrc
 *
 * @param {string} id
 * @returns {boolean}
 */
export function twid(id) {
	id = normalize(id);
	// return isLengthValid(id) && isFormatValid(id) && isChecksumValid(id);
	return isFormatValid(id) && isChecksumValid(id);
}
