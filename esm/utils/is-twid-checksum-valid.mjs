/* TODO:
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

/**
 * Validate checksum for TWID and TWRC.
 * @module utils/is-twid-checksum-valid
 * @param {string} id - The whole ID including checksum.
 * @param {number} letterNum - Number of letter in the ID. Either 1 or 2.
 * @returns {boolean}
 */
export function isTWIDChecksumValid(id, letterNum) {
	const idLetters = id.slice(0, letterNum);
	const idNumbers = id.slice(letterNum);
	// ID in format of 'AA0000000C' or 'A00000000C'
	const idLen = 10; // fixed
	// Each letter represents a value from [10..35]
	const letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';

	// weightedSum for idLetters
	const letterIndex = letters.indexOf(idLetters[0]);
	let weightedSum = Math.floor((letterIndex / 10) + 1) + (letterIndex * (idLen - 1));
	if (letterNum === 2) {
		weightedSum += letters.indexOf(idLetters[1]) * (idLen - 2);
	}

	// weightedSum for idNumbers
	let weight = idLen - idLetters.length - 1; // Minus letter digit and check digit
	for (var char of Array.from(idNumbers)) {
		weightedSum += +char * weight;
		weight--;
	}
	// Note: the check digit of 'idNumbers' is weighted 0

	const remainder = (weightedSum + +idNumbers.slice(-1)) % 10;
	return remainder === 0;
}
