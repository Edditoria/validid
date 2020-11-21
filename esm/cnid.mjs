import normalize from './utils/normalize.mjs';

import isDateValid from './utils/is-date-valid.mjs';

/**
Validate ID card number of China (2nd generation)
@module core/cnid
@param {string} id
@return {boolean}

Original name: Resident Identity Card of the People's Republic of China (PRC)
Format of card id: LLLLLLYYYYMMDD000X
*/
export default function (id) {
	var isChecksumValid, isFormatValid, isThisDateValid;
	// isLengthValid = (id) -> id.length is 18
	isFormatValid = function (id) {
		return /^[0-9]{17}[0-9X]$/.test(id);
	};
	// Assume the oldest Chinese, Luo Meizhen, was born in 25 Jun, 1886 and he had an ID card
	// Source: http://www.scmp.com/news/china/article/1297022/uygur-alimihan-seyiti-age-127-may-set-record-oldest-person-alive
	isThisDateValid = function (id) {
		return isDateValid(id.substring(6, 14), '18860625');
	};
	// Adapts ISO 7064:1983.MOD 11-2
	isChecksumValid = function (id) {
		var char,
			checkDigit,
			getWeight,
			i,
			identifier,
			index,
			len,
			remainder,
			weightedSum;
		identifier = id.slice(0, -1);
		checkDigit = id.slice(-1) === 'X' ? 10 : +id.slice(-1);
		getWeight = function (n) {
			return Math.pow(2, n - 1) % 11;
		};
		weightedSum = 0;
		index = id.length;
		for (i = 0, len = identifier.length; i < len; i++) {
			char = identifier[i];
			weightedSum += +char * getWeight(index);
			index--;
		}
		remainder = ((12 - (weightedSum % 11)) % 11) - checkDigit;
		return remainder === 0;
	};
	id = normalize(id);
	// return isLengthValid(id) and isFormatValid(id) and isThisDateValid(id) and isChecksumValid(id)
	return isFormatValid(id) && isThisDateValid(id) && isChecksumValid(id);
}
