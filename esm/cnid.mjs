/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
import { normalize } from './utils/normalize.mjs';
import { isDateValid } from './utils/is-date-valid.mjs';

/**
 * Validate ID card number of China (2nd generation).
 * - Original name: Resident Identity Card of the People's Republic of China (PRC).
 * - Format: "LLLLLLYYYYMMDD000X".
 * @module core/cnid
 * @param {string} id
 * @returns {boolean}
 */
export function cnid(id) {

	// isLengthValid = (id) -> id.length is 18

	const isFormatValid = id => /^[0-9]{17}[0-9X]$/.test(id);

	// Assume the oldest Chinese, Luo Meizhen, was born in 25 Jun, 1886 and he had an ID card
	// Source: http://www.scmp.com/news/china/article/1297022/uygur-alimihan-seyiti-age-127-may-set-record-oldest-person-alive
	const isThisDateValid = id => isDateValid(id.substring(6,14), '18860625');

	// Adapts ISO 7064:1983.MOD 11-2
	const isChecksumValid = function(id) {
		const identifier = id.slice(0, -1);
		const checkDigit = id.slice(-1) === 'X' ? 10 : +id.slice(-1);
		const getWeight = n => Math.pow(2, n - 1) % 11;
		let weightedSum = 0;
		let index = id.length;
		for (var char of Array.from(identifier)) {
			weightedSum += +char * getWeight(index);
			index--;
		}
		const remainder = ((12 - (weightedSum % 11)) % 11) - checkDigit;
		return remainder === 0;
	};

	id = normalize(id);
	// return isLengthValid(id) and isFormatValid(id) and isThisDateValid(id) and isChecksumValid(id)
	return isFormatValid(id) && isThisDateValid(id) && isChecksumValid(id);
}
