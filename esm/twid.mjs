import { normalize } from './utils/normalize.mjs';
import { isCaptialLetter } from './utils/is-capital-letter.mjs';
import { ValididResponse, ValididStatus, statusInvalidChecksum, statusInvalidFormat, statusInvalidLength, statusOk, statusUnknownError } from './response.mjs';

/** @module core/twid */

/** 10 characters for National Identification Card and Resident Certificate. */
export const TWID_LENGTH = 10;

/** Each letter represents a value from "10" to "35". */
const _LETTERS = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';

/**
 * Type of a TWID.
 * @readonly
 * @enum {string}
 */
export const TwidType = Object.freeze({
	NIC: 'NIC',
	RC: 'RC',
	INVALID: 'INVALID',
});

/**
 * String for regular expression to validate pattern for TWID.
 * @readonly
 * @example new RegExp(TwidPattern.NIC).test('A123456789'); // Returns true
 */
export const TwidPattern = Object.freeze({
	NIC: '^[A-Z][12][0-9]{8}$',
	RC: '^[A-Z][89A-D][0-9]{8}$',
});

/** @enum {ValididStatus} */
export const TwidStatus = {
	OK: statusOk,
	UNKNOWN_ERROR: statusUnknownError,
	INVALID_LENGTH: statusInvalidLength,
	INVALID_FORMAT: statusInvalidFormat,
	INVALID_CHECKSUM: statusInvalidChecksum,
	// DUMMY_ID: statusDummyId,
};

/** Just a magic trick for JSDoc and Typescript. */
// @ts-ignore
const _response = ValididResponse; // eslint-disable-line no-unused-vars

/** Just a magic trick for JSDoc and Typescript. */
// @ts-ignore
const _status = ValididStatus; // eslint-disable-line no-unused-vars

/**
 * Identify the type of a Taiwan ID.
 * @param {string} id Expect the ID is normalized.
 * @returns {TwidType} Either NIC, RC or invalid.
 */
export function identifyTwidType(id) {
	if (new RegExp(TwidPattern.NIC).test(id)) {
		return TwidType.NIC;
	}
	if (new RegExp(TwidPattern.RC).test(id)) {
		return TwidType.RC;
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
function _getRegionCodeValue(id, weight = 9) {
	const idx = _LETTERS.indexOf(id[0]);
	return Math.floor(idx / 10 + 1) + idx * weight;
}

/**
 * Get weighted sum of the gender code, aka the second character in Taiwan ID.
 * @param {string} id The whole ID or first 2 characters.
 * @param {number} [weight=8] Default: 8.
 * @returns {number}
 */
function _getGenderCodeValue(id, weight = 8) {
	const gCode = id[1];
	const val = isCaptialLetter(gCode) ? +_LETTERS.indexOf(gCode) : +gCode;
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
	let weightedSum = _getRegionCodeValue(id) + _getGenderCodeValue(id);
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

/**
 * Validate ID card number of Taiwan:
 * - National Identification Card of the Republic of China.
 * - Resident Certificate of the Republic of China, including new ID from 2021.
 * @param {string} inputId
 * @returns {ValididResponse}
 */
export function validateTwid(inputId) {
	const id = normalize(inputId);
	const type = 'TWID';
	const twidType = identifyTwidType(id);
	if (id.length !== TWID_LENGTH) {
		return { id, type, ok: false, status: TwidStatus.INVALID_LENGTH };
	}
	if (twidType === TwidType.INVALID) {
		return { id, type, ok: false, status: TwidStatus.INVALID_FORMAT };
	}
	if (getTwidDigit(id) !== id.slice(-1)) {
		return { id, type, ok: false, status: TwidStatus.INVALID_CHECKSUM };
	}
	// Hola!!
	return { id, type, ok: true, status: TwidStatus.OK };
}

/**
 * Validate ID card number of Taiwan:
 * National Identification Card of the Republic of China.
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Solution: Use {@link validateTwid} and {@link identifyTwidType} instead.
 * @param {string} inputId
 * @returns {boolean}
 */
export default function (inputId) {
	console.warn('validid.twid() is deprecated. Please contact developer to update the program.');
	const res = validateTwid(inputId);
	return res.ok && identifyTwidType(res.id) === TwidType.NIC;
}
