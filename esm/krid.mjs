/**
 * @module krid
 */

import { normalize, getAge, validateDateString } from './utils.mjs';
import { ValididResponse, ValididStatus, statusInvalidChecksum, statusInvalidDate, statusInvalidFormat, statusInvalidLength, statusOk, statusUnknownError } from './response.mjs';

/** 13 characters in KRID. Fixed. */
export const KRID_LENGTH = 13;

/**
 * String for regular expression to validate pattern for KRID.
 * @type {string}
 * @example new RegExp(KRID_PATTERN).test('7810305668081') // Returns true.
 */
export const KRID_PATTERN = '^[0-9]{13}$';

/**
 * Minimum age to register a ID card.
 * @type {number}
 */
export const KRID_MIN_AGE = 17;

/** @enum {ValididStatus} */
export const KridStatus = {
	OK: statusOk,
	UNKNOWN_ERROR: statusUnknownError,
	INVALID_LENGTH: statusInvalidLength,
	INVALID_FORMAT: statusInvalidFormat,
	INVALID_DATE: statusInvalidDate,
	INVALID_CHECKSUM: statusInvalidChecksum,
	// DUMMY_ID: statusDummyId,
};

/**
 * Just a magic trick for JSDoc and Typescript.
 * @ignore
 */
// @ts-ignore
const _response = ValididResponse; // eslint-disable-line no-unused-vars

/**
 * Just a magic trick for JSDoc and Typescript.
 * @ignore
 */
// @ts-ignore
const _status = ValididStatus; // eslint-disable-line no-unused-vars

/**
 * Capture birth date from KRID.
 * @example
 * // Use case: Compare with birthday entered by user:
 * captureBirthDateFromKrid(normalizedId) === yyyymmddFromWebForm
 * @param {string} id A [normalized ID]{@link normalize}.
 * @returns {string} A string of date in "YYYYMMDD".
 * @throws Invalid date, e.g. 2001-02-29.
 */
export function captureBirthDateFromKrid(id) {
	/** Recall the format of KRID: "YYMMDDSBBBBNC" */
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
	const dateStr = yearPrefix + id.substring(0, 6);
	if (!validateDateString(dateStr)) {
		throw new Error('Invalid date');
	}
	return dateStr;
}

/**
 * Get check digit of a South Korea ID.
 * NOTE: This function does not validate its pattern.
 * @example getKridDigit('781030566808_') // returns 1.
 * @param {string} id A [normalized ID]{@link normalize}. Use `_` if check digit is unknown.
 * @returns {string} Check digit: "0" to "9".
 */
export function getKridDigit(id) {
	const weight = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 1]; // 1 is added for check digit
	let weightedSum = 0;
	let idx = 0;
	const identifier = id.slice(0, -1);
	for (const char of identifier) {
		weightedSum += +char * weight[idx];
		idx++;
	}
	return ((11 - (weightedSum % 11)) % 10).toString();
}

/**
 * Validate ID card number of South Korea.
 * Official name: Resident Registration Number (RRN).
 * @param {string} inputId
 * @returns {ValididResponse}
 */
export function validateKrid(inputId) {
	const id = normalize(inputId);
	const type = 'KRID';
	if (id.length !== KRID_LENGTH) {
		return { id, type, ok: false, status: KridStatus.INVALID_LENGTH };
	}
	if (!new RegExp(KRID_PATTERN).test(id)) {
		return { id, type, ok: false, status: KridStatus.INVALID_FORMAT };
	}
	/** @type {string} */
	let birthDate;
	try {
		birthDate = captureBirthDateFromKrid(id);
	} catch (error) {
		return { id, type, ok: false, status: KridStatus.INVALID_DATE };
	}
	/** TODO: Optional date. */
	const now = new Date().toLocaleDateString('sv').replace(/-/g, '');
	const age = getAge(birthDate, now);
	// if (+now < +birthDate) {
	if (age < KRID_MIN_AGE) {
		return { id, type, ok: false, status: KridStatus.INVALID_DATE };
	}
	// TODO: Optionally validate checksum.
	// if (getKridDigit(id) !== id.slice(-1)) {
	// 	return { id, type, ok: false, status: KridStatus.INVALID_CHECKSUM };
	// }
	return { id, type, ok: true, status: KridStatus.OK };
}

/**
 * Validate ID card number of South Korea.
 * Official name: Resident Registration Number (RRN).
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Solution: Use {@link validateKrid} instead.
 * @param {string} inputId
 * @returns {boolean}
 */
export default function (inputId) {
	console.warn('validid.krid() is deprecated. Please contact developer to update the program.');
	const res = validateKrid(inputId);
	return res.ok;
}
