import normalize from './utils/normalize.mjs';

import getMaxDate from './utils/get-max-date.mjs';

import isDateValid from './utils/is-date-valid.mjs';

/**
Validate ID card number of South Korea
@module core/krid
@param {string} id
@return {boolean}

Original name: Resident Registration Number (RRN)
Format of card id: YYMMDD-SBBBBNC
*/
export default function (id) {
	var isChecksumValid, isFormatValid, isThisDateValid;
	// isLengthValid = (id) -> id.length is 13
	isFormatValid = function (id) {
		return /^[0-9]{13}$/.test(id);
	};
	// Parse the date into 'YYYYMMDD' according to 'S' digit
	isThisDateValid = function (id) {
		var date, maxDate, sDigit, yearPrefix;
		sDigit = id.substring(6, 7);
		yearPrefix = (function () {
			switch (sDigit) {
				case '1':
				case '2':
				case '5':
				case '6':
					return '19';
				case '3':
				case '4':
				case '7':
				case '8':
					return '20';
				default:
					return '18';
			}
		})();
		date = yearPrefix + id.substring(0, 6);
		maxDate = getMaxDate(17); // 17 years old to register for an ID
		return isDateValid(date, 'default', maxDate);
	};
	isChecksumValid = function (id) {
		var char, i, index, len, remainder, weight, weightedSum;
		weight = [
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			2,
			3,
			4,
			5,
			0, // 0 is added for check digit
		];
		weightedSum = 0;
		index = 0;
		for (i = 0, len = id.length; i < len; i++) {
			char = id[i];
			weightedSum += +char * weight[index];
			index++;
		}
		remainder = ((11 - (weightedSum % 11)) % 10) - +id.slice(-1);
		return remainder === 0;
	};
	id = normalize(id);
	// return isLengthValid(id) and isFormatValid(id) and isThisDateValid(id) and isChecksumValid(id)
	return isFormatValid(id) && isThisDateValid(id) && isChecksumValid(id);
}
