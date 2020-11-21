import normalize from './utils/normalize.mjs';

/**
Validate ID card number of Hong Kong
@module core/hkid
@param {string} id
@return {boolean}

Format of card id: X123456(A) or XY123456(A)
*/
export default function (id) {
	/*
  charCode = { A: 65, B: 66... Z: 90 }
  HKID     = { A: 10, B: 11... Z: 35 }
  Therefore, diff = 55
  */
	/*
  Check digit algorithm is variation of the ISBN-10 check digit algorithm
  For each character (except the last digit): character * weight
  Weight from largest to smallest (1)
  If ID is 8 character long, a space is added to the beginning
  Value of space is 36, hence 36 * 9 = 324
  */
	var getLetterValue, isChecksumValid, isFormatValid, isLetter;
	getLetterValue = function (letter) {
		return letter.charCodeAt(0) - 55;
	};
	isLetter = function (char) {
		return /[a-zA-Z]/.test(char);
	};
	// isLengthValid = (id) -> id.length is 8 or id.length is 9
	isFormatValid = function (id) {
		return /^[A-NP-Z]{1,2}[0-9]{6}[0-9A]$/.test(id);
	};
	isChecksumValid = function (id) {
		var char,
			charValue,
			checkDigit,
			i,
			identifier,
			len,
			remainder,
			weight,
			weightedSum;
		weight = id.length;
		weightedSum = weight === 8 ? 324 : 0;
		identifier = id.slice(0, -1);
		checkDigit = id.slice(-1) === 'A' ? 10 : +id.slice(-1);
		for (i = 0, len = identifier.length; i < len; i++) {
			char = identifier[i];
			charValue = isLetter(char) ? getLetterValue(char) : +char;
			weightedSum += charValue * weight;
			weight--;
		}
		remainder = (weightedSum + checkDigit) % 11;
		return remainder === 0;
	};
	id = normalize(id);
	// return isLengthValid(id) and isFormatValid(id) and isChecksumValid(id)
	return isFormatValid(id) && isChecksumValid(id);
}
