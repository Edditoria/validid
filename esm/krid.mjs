import { normalize } from './utils/normalize.mjs';
import { getMaxDate } from './utils/get-max-date.mjs';
import { isDateValid } from './utils/is-date-valid.mjs';

/** @module core/krid */

function isLengthValid(id) {
	return id.length === 13;
}

function isFormatValid(id) {
	return /^[0-9]{13}$/.test(id);
}

/**
 * Parse the date into 'YYYYMMDD' according to 'S' digit.
 */
function isThisDateValid(id) {
	const sDigit = id.substring(6, 7);
	let yearPrefix;
	switch (sDigit) {
		case '1':
		case '2':
		case '5':
		case '6':
			yearPrefix = '19';
			break;
		case '3':
		case '4':
		case '7':
		case '8':
			yearPrefix = '20';
			break;
		default:
			yearPrefix = '18';
	}
	const date = yearPrefix + id.substring(0, 6);
	const maxDate = getMaxDate(17); // 17 years old to register for an ID
	return isDateValid(date, 'default', maxDate);
}

function isChecksumValid(id) {
	const weight = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 0]; // 0 is added for check digit
	let weightedSum = 0;
	let index = 0;
	for (var char of id) {
		weightedSum += +char * weight[index];
		index++;
	}
	const remainder = ((11 - (weightedSum % 11)) % 10) - +id.slice(-1);
	return remainder === 0;
}

/**
 * Validate ID card number of South Korea.
 * - Original name: Resident Registration Number (RRN).
 * - Format: "YYMMDD-SBBBBNC".
 * @param {string} id
 * @returns {boolean}
 */
export function krid(id) {
	id = normalize(id);
	// return isLengthValid(id) && isFormatValid(id) && isThisDateValid(id) && isChecksumValid(id);
	return isFormatValid(id) && isThisDateValid(id) && isChecksumValid(id);
}
