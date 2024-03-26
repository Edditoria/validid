import { normalize } from './utils/normalize.mjs';
import { isCaptialLetter } from './utils/is-capital-letter.mjs';
import { ValididResponse, ValididStatus, statusInvalidChecksum, statusInvalidFormat, statusInvalidLength, statusOk, statusUnknownError } from './utils/response.mjs';

/** @module core/hkid */

/**
 * String for regular expression to validate pattern for HKID.
 * @type {string}
 * @example new RegExp(HKID_PATTERN).test('A123456A'); // returns true.
 */
export const HKID_PATTERN = '^[A-NP-Z]{1,2}[0-9]{6}[0-9A]$';

/** @enum {ValididStatus} */
export const HkidStatus = {
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
 * Verify whether a HKID contains 8 or 9 characters.
 * @param {string} id A [normalized ID]{@link normalize}.
 * @returns {boolean}
 */
export function verifyHkidLength(id) {
	return id.length === 8 || id.length === 9;
}

function _getLetterValue(letter) {
	/*
	charCode = { A: 65, B: 66... Z: 90 }
	HKID     = { A: 10, B: 11... Z: 35 }
	Therefore, diff = 55
	*/
	return letter.charCodeAt(0) - 55;
}

/**
 * Get check digit of a Hong Kong ID.
 * NOTE: This function does not validate its pattern.
 * @example getHkidDigit('A123456_') // returns 3.
 * @param {string} id Full HKID with check digit. Use `_` if check digit is unknown.
 * @returns {string} Check digit: "0" to "9" or "A".
 */
export function getHkidDigit(id) {
	/*
	Check digit algorithm is variation of the ISBN-10 check digit algorithm.
	For each character: character * weight.
	Weight from largest to smallest (1).
	If ID is 8 character long, a space is added to the beginning.
	Value of space is 36, hence 36 * 9 = 324.
	*/
	let weight = id.length;
	let weightedSum = weight === 8 ? 324 : 0;
	const identifier = id.slice(0, -1);
	for (const char of identifier) {
		const charValue = isCaptialLetter(char) ? _getLetterValue(char) : +char;
		weightedSum += charValue * weight;
		weight--;
	}
	const remainder = (11 - (weightedSum % 11)) % 11;
	return remainder === 10 ? 'A' : '' + remainder;
}

/**
 * Verify ID card number of Hong Kong.
 * Accepts format "X123456(A)" and "XY123456(A)".
 * @param {string} inputId
 * @returns {ValididResponse}
 */
export function verifyHkid(inputId) {
	const id = normalize(inputId);
	const type = 'HKID';
	if (!verifyHkidLength(id)) {
		return { id, type, ok: false, status: HkidStatus.INVALID_LENGTH };
	}
	if (!new RegExp(HKID_PATTERN).test(id)) {
		return { id, type, ok: false, status: HkidStatus.INVALID_FORMAT };
	}
	if (id.slice(-1) !== getHkidDigit(id)) {
		return { id, type, ok: false, status: HkidStatus.INVALID_CHECKSUM };
	}
	// Hola!!
	return { id, type, ok: true, status: HkidStatus.OK };
}

/**
 * Validate ID card number of Hong Kong.
 * Format: "X123456(A)" or "XY123456(A)".
 * @param {string} id
 * @returns {boolean}
 */
export function hkid(id) {
	const normId = normalize(id);
	// Validate length:
	// if (normId.length < 8 && normId.length > 9) { return false; }
	// Validate pattern:
	if (!new RegExp(HKID_PATTERN).test(normId)) {
		return false;
	}
	// Validate checksum:
	return normId.slice(-1) === getHkidDigit(normId);
}
