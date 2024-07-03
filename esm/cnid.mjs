import { normalize } from './utils/normalize.mjs';
import { validateDateString } from './utils/date-utils.mjs';
import { ValididResponse, ValididStatus, statusInvalidChecksum, statusInvalidDate, statusInvalidFormat, statusInvalidLength, statusOk, statusUnknownError } from './response.mjs';

/** @module core/cnid */

/** 18 characters in CNID. Fixed. */
export const CNID_LENGTH = 18;

/**
 * String for regular expression to validate pattern for CNID.
 * @type {string}
 * @example new RegExp(CNID_PATTERN).test('11010120170210193X'); // returns true.
 */
export const CNID_PATTERN = '^[0-9]{17}[0-9X]$';

/**
 * Birth date of the oldest Chinese with reliable record.
 * Assume the oldest Chinese, Alimihan Seyiti, was born in 25 Jun, 1886 and she had an ID card.
 * Source: http://www.scmp.com/news/china/article/1297022/uygur-alimihan-seyiti-age-127-may-set-record-oldest-person-alive
 *
 * This is not used in Validid package directly, but for reference for other developers.
 *
 * @type {string} A string of date "YYYYMMDD".
 */
export const BIRTH_DATE_OF_OLDEST_CHINESE = '18860625';

/** @enum {ValididStatus} */
export const CnidStatus = {
	OK: statusOk,
	UNKNOWN_ERROR: statusUnknownError,
	INVALID_LENGTH: statusInvalidLength,
	INVALID_FORMAT: statusInvalidFormat,
	INVALID_DATE: statusInvalidDate,
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
 * Capture birth date from CNID.
 * @example
 * // Use case: Compare with birthday entered by user:
 * captureBirthDateFromCnid(normalizedId) === yyyymmddFromWebForm
 * @param {string} normId A normalized ID. See: {@link normalize}
 * @returns {string} A string of date in "YYYYMMDD".
 * @throws Invalid date, e.g. 2001-02-29
 */
export function captureBirthDateFromCnid(normId) {
	/** Recall the format of CNID: "110102YYYYMMDD888X" */
	const dateStr = normId.substring(6, 14);
	if (!validateDateString(dateStr)) {
		throw new Error('Invalid date');
	}
	return dateStr;
}

/**
 * Get check digit of a China ID.
 * NOTE: This function does not validate its pattern.
 * @example getCnidDigit('11010120170210193_') // returns "X".
 * @param {string} id Full ID with check digit. Use `_` if check digit is unknown.
 * @returns {string} Check digit: "0" to "9" or "X".
 */
export function getCnidDigit(id) {
	/*
	Check digit algorithm utilizes "ISO 7064:1983.MOD 11-2".
	*/
	const identifier = id.slice(0, -1);
	let weightedSum = 0;
	let idx = id.length;
	for (const char of identifier) {
		/** Weight coefficient: [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] */
		const weight = Math.pow(2, idx - 1) % 11;
		weightedSum += +char * weight;
		idx--;
	}
	const remainder = (12 - (weightedSum % 11)) % 11;
	return remainder === 10 ? 'X' : '' + remainder;
}

/**
 * Validate ID card number of China (2nd generation):
 * Resident Identity Card of the People's Republic of China (PRC).
 * @param {string} inputId
 * @returns {ValididResponse}
 */
export function validateCnid(inputId) {
	const id = normalize(inputId);
	const type = 'CNID';
	if (id.length !== CNID_LENGTH) {
		return { id, type, ok: false, status: CnidStatus.INVALID_LENGTH };
	}
	if (!new RegExp(CNID_PATTERN).test(id)) {
		return { id, type, ok: false, status: CnidStatus.INVALID_FORMAT };
	}
	/** @type {string} */
	let birthDate;
	try {
		birthDate = captureBirthDateFromCnid(id);
	} catch (error) {
		return { id, type, ok: false, status: CnidStatus.INVALID_DATE };
	}
	/** TODO: Optional date. */
	const now = new Date().toLocaleDateString('sv').replace(/-/g, '');
	if (+birthDate >= +now) {
		return { id, type, ok: false, status: CnidStatus.INVALID_DATE };
	}
	if (getCnidDigit(id) !== id.slice(-1)) {
		return { id, type, ok: false, status: CnidStatus.INVALID_CHECKSUM };
	}
	// Hola!!
	return { id, type, ok: true, status: CnidStatus.OK };
}

/**
 * Validate ID card number of China (2nd generation):
 * Resident Identity Card of the People's Republic of China (PRC).
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Solution: Use {@link validateCnid} instead.
 * @param {string} inputId
 * @returns {boolean}
 */
export default function (inputId) {
	console.warn('validid.cnid() is deprecated. Please contact developer to update the program.');
	const res = validateCnid(inputId);
	return res.ok;
}
