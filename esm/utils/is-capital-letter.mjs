/**
 * Check if the character is uppercase / captial letter.
 * @param {string} character
 * @returns {boolean}
 */
export function isCaptialLetter(character) {
	return /^[A-Z]$/.test(character);
}
