import { normalize } from './utils/normalize.mjs';
import { isCaptialLetter } from './utils/is-capital-letter.mjs';

/** @module core/hkid */

function getLetterValue(letter) {
	/*
	charCode = { A: 65, B: 66... Z: 90 }
	HKID     = { A: 10, B: 11... Z: 35 }
	Therefore, diff = 55
	*/
	return letter.charCodeAt(0) - 55;
}

function isLengthValid(id) {
	return id.length === 8 || id.length === 9;
}

function isFormatValid(id) {
	return /^[A-NP-Z]{1,2}[0-9]{6}[0-9A]$/.test(id);
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
		const charValue = isCaptialLetter(char) ? getLetterValue(char) : +char;
		weightedSum += charValue * weight;
		weight--;
	}
	const remainder = (11 - (weightedSum % 11)) % 11;
	return remainder === 10 ? 'A' : '' + remainder;
}

/**
 * Validate ID card number of Hong Kong.
 * Format: "X123456(A)" or "XY123456(A)".
 * @param {string} id
 * @returns {boolean}
 */
export function hkid(id) {
	id = normalize(id);
	const isChecksumValid = id.slice(-1) === getHkidDigit(id);
	// return isLengthValid(id) && isFormatValid(id) && isChecksumValid;
	return isFormatValid(id) && isChecksumValid;
}
