import { normalize } from './utils/normalize.mjs';

/** @module core/hkid */

function getLetterValue(letter) {
	/*
	charCode = { A: 65, B: 66... Z: 90 }
	HKID     = { A: 10, B: 11... Z: 35 }
	Therefore, diff = 55
	*/
	return letter.charCodeAt(0) - 55;
}

function isLetter(char) {
	return /[a-zA-Z]/.test(char);
}

function isLengthValid(id) {
	return id.length === 8 || id.length === 9;
}

function isFormatValid(id) {
	return /^[A-NP-Z]{1,2}[0-9]{6}[0-9A]$/.test(id);
}

/**
 * Check digit algorithm is variation of the ISBN-10 check digit algorithm
 * For each character (except the last digit): character * weight
 * Weight from largest to smallest (1)
 * If ID is 8 character long, a space is added to the beginning
 * Value of space is 36, hence 36 * 9 = 324
 */
function isChecksumValid(id) {
	let weight = id.length;
	let weightedSum = weight === 8 ? 324 : 0;
	const identifier = id.slice(0, -1);
	const checkDigit = id.slice(-1) === 'A' ? 10 : +id.slice(-1);
	for (var char of identifier) {
		var charValue = isLetter(char) ? getLetterValue(char) : +char;
		weightedSum += charValue * weight;
		weight--;
	}
	const remainder = (weightedSum + checkDigit) % 11;
	return remainder === 0;
}

/**
 * Validate ID card number of Hong Kong.
 * Format: "X123456(A)" or "XY123456(A)".
 * @param {string} id
 * @returns {boolean}
 */
export function hkid(id) {
	id = normalize(id);
	// return isLengthValid(id) && isFormatValid(id) && isChecksumValid(id);
	return isFormatValid(id) && isChecksumValid(id);
}
