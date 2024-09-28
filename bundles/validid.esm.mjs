/**
 * Validid is a Javascript library to validate ID card number of Hong Kong, Taiwan, South Korea and China.
 *
 * Validid is open source in:
 * https://github.com/Edditoria/validid
 *
 * Code released under the MIT license:
 * https://github.com/Edditoria/validid/blob/main/LICENSE.txt
 *
 * @author Edditoria <edditoria@pm.me>
 * @license MIT
 */

/**
 * @module utils
 */

/**
 * Normalize an ID by:
 * - `id.toUpperCase()`.
 * - Remove "-" and "/" at any position.
 * - Remove whitespace.
 * - Remove "(" and ")" at the end.
 * @example normalize('A123456(0)') // returns 'A1234560'.
 * @param {string} inputId Input ID, such as user-input in web form.
 * @returns {string} A normalized ID.
 */
function normalize$1(inputId) {
	let re = /[-/\s]/g;
	inputId = inputId.toUpperCase().replace(re, '');
	re = /\([A-Z0-9]\)$/;
	if (re.test(inputId)) {
		inputId = inputId.replace(/[()]/g, '');
	}
	return inputId;
}

/**
 * Check if the character is uppercase / captial letter.
 * @param {string} character
 * @returns {boolean}
 */
function isCaptialLetter(character) {
	return /^[A-Z]$/.test(character);
}

/**
 * Simply get age ignoring time zone.
 *
 * NOTE: You may want to validate the parameters. See {@link validateDateString}.
 *
 * NOTE: This function may return negative number.
 *
 * @param {string} birthDateStr Birth date in format of "YYYYMMDD".
 * @param {string} currentTimeStr Current time in format of "YYYYMMDD".
 * @returns {number} Age in integar.
 */
function getAge(birthDateStr, currentTimeStr) {
	const bYear = +birthDateStr.substring(0, 4);
	const bMonth = +birthDateStr.substring(4, 6);
	const bDay = +birthDateStr.substring(6, 8);
	const cYear = +currentTimeStr.substring(0, 4);
	const cMonth = +currentTimeStr.substring(4, 6);
	const cDay = +currentTimeStr.substring(6, 8);
	let age = cYear - bYear;
	if (cMonth < bMonth) {
		age--;
	} else if (cMonth === bMonth && cDay < bDay) {
		age--;
	}
	return age;
}

/**
 * Validate a date-like string.
 * @param {string} yyyymmdd A string of date in "YYYYMMDD".
 * @returns {boolean}
 */
function validateDateString(yyyymmdd) {
	if (typeof yyyymmdd !== 'string') {
		return false;
	}
	if (yyyymmdd.length !== 8) {
		return false;
	}
	const year = yyyymmdd.substring(0, 4);
	const month = yyyymmdd.substring(4, 6);
	const day = yyyymmdd.substring(6, 8);
	const date = new Date(`${year}-${month}-${day}`);
	return !Number.isNaN(date.valueOf());
}

/**
 * @module response
 */

/**
 * Serve as "final answer" of the main modules in Validid package.
 * Keep the type simple for more usages, e.g. JSON data via API call.
 * @typedef {Object} ValididResponse
 * @property {string} id A [normalized ID]{@link normalize}.
 * @property {string} type Type of ID, e.g. "TWID".
 * @property {boolean} ok Valid or not. Most developers may rely on this.
 * @property {ValididStatus} status
 */
const ValididResponse = {}; // For type hints in JSDoc and Typescript.

/**
 * Status to describe error, or not.
 * Designed to be rewritable for developers, so not going to `Object.freeze()`.
 * @typedef {Object} ValididStatus
 * @property {number} code Unique number across your program.
 * @property {string} text Unique "label" or symbol-like string.
 * @property {string} desc Free to use message, e.g. localized message in UI.
 */
const ValididStatus = {}; // For type hints in JSDoc and Typescript.

/** @type {ValididStatus} */
const statusOk = { code: 0, text: 'OK', desc: '' };

/** @type {ValididStatus} */
const statusUnknownError = { code: 1, text: 'UNKNOWN_ERROR', desc: '' };

/** @type {ValididStatus} */
const statusInvalidLength = { code: 2, text: 'INVALID_LENGTH', desc: '' };

/** @type {ValididStatus} */
const statusInvalidFormat = { code: 3, text: 'INVALID_FORMAT', desc: '' };

/** @type {ValididStatus} */
const statusInvalidDate = { code: 4, text: 'INVALID_DATE', desc: '' };

/** @type {ValididStatus} */
const statusInvalidChecksum = { code: 5, text: 'INVALID_CHECKSUM', desc: '' };

/** @type {ValididStatus} */
const statusDummyId = { code: 6, text: 'DUMMY_ID', desc: '' };

/**
 * @module hkid
 */


/**
 * String for regular expression to validate pattern for HKID.
 * @type {string}
 * @example new RegExp(HKID_PATTERN).test('A123456A'); // returns true.
 */
const HKID_PATTERN = '^[A-NP-Z]{1,2}[0-9]{6}[0-9A]$';

/** @enum {ValididStatus} */
const HkidStatus = {
	OK: statusOk,
	UNKNOWN_ERROR: statusUnknownError,
	INVALID_LENGTH: statusInvalidLength,
	INVALID_FORMAT: statusInvalidFormat,
	INVALID_CHECKSUM: statusInvalidChecksum,
	// DUMMY_ID: statusDummyId,
};

/**
 * Check whether a HKID contains 8 or 9 characters.
 * @param {string} id A [normalized ID]{@link normalize}.
 * @returns {boolean}
 */
function validateHkidLength(id) {
	return id.length === 8 || id.length === 9;
}

/**
 * While charCode = { A: 65, B: 66... Z: 90 },
 *           HKID = { A: 10, B: 11... Z: 35 }.
 * Therefore, diff = 55.
 * @ignore
 * @param {string} letter A single character.
 * @returns {number}
 */
function _getLetterValue(letter) {
	return letter.charCodeAt(0) - 55;
}

/**
 * Get check digit of a Hong Kong ID.
 * NOTE: This function does not validate its pattern.
 * @example getHkidDigit('A123456_') // returns 3.
 * @param {string} id A [normalized ID]{@link normalize}. Use `_` if check digit is unknown.
 * @returns {string} Check digit: "0" to "9" or "A".
 */
function getHkidDigit(id) {
	/*
	Check digit algorithm is variation of the ISBN-10 check digit algorithm.
	For each character: character * weight.
	Weight from largest to smallest (1).
	If ID is 8 character long, a space is added to the beginning.
	Value of space is 36, hence 36 * 9 = 324.
	*/
	let weight = id.length;
	let weightedSum = weight === 8 ? 324 : 0;
	const identifier = id.slice(0, -1);
	for (const char of identifier) {
		const charValue = isCaptialLetter(char) ? _getLetterValue(char) : +char;
		weightedSum += charValue * weight;
		weight--;
	}
	const remainder = (11 - (weightedSum % 11)) % 11;
	return remainder === 10 ? 'A' : '' + remainder;
}

/**
 * Validate ID card number of Hong Kong.
 * Accepts format "X123456(A)" and "XY123456(A)".
 * @param {string} inputId
 * @returns {ValididResponse}
 */
function validateHkid(inputId) {
	const id = normalize$1(inputId);
	const type = 'HKID';
	if (!validateHkidLength(id)) {
		return { id, type, ok: false, status: HkidStatus.INVALID_LENGTH };
	}
	if (!new RegExp(HKID_PATTERN).test(id)) {
		return { id, type, ok: false, status: HkidStatus.INVALID_FORMAT };
	}
	if (id.slice(-1) !== getHkidDigit(id)) {
		return { id, type, ok: false, status: HkidStatus.INVALID_CHECKSUM };
	}
	// Hola!!
	return { id, type, ok: true, status: HkidStatus.OK };
}

/**
 * Validate ID card number of Hong Kong.
 * Accepts format "X123456(A)" and "XY123456(A)".
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Solution: Use {@link validateHkid} instead.
 * @param {string} inputId
 * @returns {boolean}
 */
function hkid (inputId) {
	console.warn('validid.hkid() is deprecated. Please contact developer to update the program.');
	const res = validateHkid(inputId);
	return res.ok;
}

/**
 * @module twid
 */


/** 10 characters for National Identification Card and Resident Certificate. */
const TWID_LENGTH = 10;

/**
 * Each letter represents a value from "10" to "35".
 * @ignore
 */
const _LETTERS = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';

/**
 * Type of a TWID.
 * @readonly
 * @enum {string}
 */
const TwidType = Object.freeze({
	NIC: 'NIC',
	RC: 'RC',
	INVALID: 'INVALID',
});

/**
 * String for regular expression to validate pattern for TWID.
 * @readonly
 * @example new RegExp(TwidPattern.NIC).test('A123456789'); // Returns true
 */
const TwidPattern = Object.freeze({
	NIC: '^[A-Z][12][0-9]{8}$',
	RC: '^[A-Z][89A-D][0-9]{8}$',
});

/**
 * Version of numbering system of RC (Resident Certificate).
 * @readonly
 * @enum {string}
 */
const TwrcVersion = Object.freeze({
	RC_2021: 'RC_2021',
	RC_LEGACY: 'RC_LEGACY',
	NOT_RC: 'NOT_RC',
});

/**
 * String for regular expression to validate the pattern for Taiwan RC.
 * @readonly
 * @example new RegExp(TwrcPattern.RC_LEGACY).test('A800000014'); // Returns true
 */
const TwrcPattern = Object.freeze({
	RC_2021: '^[A-Z][89][0-9]{8}$',
	RC_LEGACY: '^[A-Z][A-D][0-9]{8}$',
});

/** @enum {ValididStatus} */
const TwidStatus = {
	OK: statusOk,
	UNKNOWN_ERROR: statusUnknownError,
	INVALID_LENGTH: statusInvalidLength,
	INVALID_FORMAT: statusInvalidFormat,
	INVALID_CHECKSUM: statusInvalidChecksum,
	// DUMMY_ID: statusDummyId,
};

/**
 * Identify the type of a Taiwan ID.
 * @param {string} id A [normalized ID]{@link normalize}.
 * @returns {TwidType} Either NIC, RC or invalid.
 */
function identifyTwidType(id) {
	if (new RegExp(TwidPattern.NIC).test(id)) {
		return TwidType.NIC;
	}
	if (new RegExp(TwidPattern.RC).test(id)) {
		return TwidType.RC;
	}
	// Else:
	return TwidType.INVALID;
}

/**
 * Identify the version of a Taiwan RC.
 * @param {string} id A [normalized ID]{@link normalize}.
 * @returns {TwrcVersion} Either legacy, 2021 version, not-RC.
 */
function identifyTwrcVersion(id) {
	if (new RegExp(TwrcPattern.RC_LEGACY).test(id)) {
		return TwrcVersion.RC_LEGACY;
	}
	if (new RegExp(TwrcPattern.RC_2021).test(id)) {
		return TwrcVersion.RC_2021;
	}
	// Else:
	return TwrcVersion.NOT_RC;
}

/**
 * Get weighted sum of the region code, aka the first character in Taiwan ID.
 * @ignore
 * @param {string} id The whole ID or its first character.
 * @param {number} [weight=9] Default: 9.
 * @returns {number}
 */
function _getRegionCodeValue(id, weight = 9) {
	const idx = _LETTERS.indexOf(id[0]);
	return Math.floor(idx / 10 + 1) + idx * weight;
}

/**
 * Get weighted sum of the gender code, aka the second character in Taiwan ID.
 * @ignore
 * @param {string} id The whole ID or first 2 characters.
 * @param {number} [weight=8] Default: 8.
 * @returns {number}
 */
function _getGenderCodeValue(id, weight = 8) {
	const gCode = id[1];
	const val = isCaptialLetter(gCode) ? +_LETTERS.indexOf(gCode) : +gCode;
	return val * weight;
}

/**
 * Get check digit of Taiwan ID, including TWID/TWRC.
 * NOTE: This function does not validate its pattern.
 * @example getTwidDigit('A12345678_') // returns 9.
 * @param {string} id A [normalized ID]{@link normalize}. Use `_` if check digit is unknown.
 * @returns {string}
 */
function getTwidDigit(id) {
	// Weighted sum of 1st and 2nd characters:
	let weightedSum = _getRegionCodeValue(id) + _getGenderCodeValue(id);
	// Process Weighted sum of other characters but check digit:
	const identifier = id.slice(2, -1);
	let weight = identifier.length;
	for (const char of identifier) {
		weightedSum += +char * weight;
		weight--;
	}
	return '' + ((10 - (weightedSum % 10)) % 10);
	// return String(10 - (weightedSum % 10)).slice(-1); // ~20% slower.
}

/**
 * Validate ID card number of Taiwan:
 * - National Identification Card of the Republic of China.
 * - Resident Certificate of the Republic of China, including new ID from 2021.
 * @param {string} inputId
 * @returns {ValididResponse}
 */
function validateTwid(inputId) {
	const id = normalize$1(inputId);
	const type = 'TWID';
	const twidType = identifyTwidType(id);
	if (id.length !== TWID_LENGTH) {
		return { id, type, ok: false, status: TwidStatus.INVALID_LENGTH };
	}
	if (twidType === TwidType.INVALID) {
		return { id, type, ok: false, status: TwidStatus.INVALID_FORMAT };
	}
	if (getTwidDigit(id) !== id.slice(-1)) {
		return { id, type, ok: false, status: TwidStatus.INVALID_CHECKSUM };
	}
	// Hola!!
	return { id, type, ok: true, status: TwidStatus.OK };
}

/**
 * Validate ID card number of Taiwan:
 * - Validate: National Identification Card of the Republic of China.
 * - But not: Resident Certificate.
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Solution: Use {@link validateTwid} and {@link identifyTwidType} instead.
 * @param {string} inputId
 * @returns {boolean}
 */
function twid (inputId) {
	console.warn('validid.twid() is deprecated. Please contact developer to update the program.');
	const res = validateTwid(inputId);
	return res.ok && identifyTwidType(res.id) === TwidType.NIC;
}

/**
 * @module twrc
 */


/**
 * Validate ID number of Taiwan Resident Certificate (Uniform ID Numbers):
 * - New format from 2021.
 * - Legacy format before 2021.
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Solution: Use {@link validateTwid} and {@link identifyTwidType} instead.
 * @param {string} inputId
 * @return {boolean}
 */
function twrc (inputId) {
	console.warn('validid.twrc() is deprecated. Please contact developer to update the program.');
	const res = validateTwid(inputId);
	return res.ok && identifyTwidType(res.id) === TwidType.RC;
}

/**
 * @module twrc-legacy
 */


/**
 * Validate ID number of Taiwan Resident Certificate (Uniform ID Numbers):
 * Only legacy format before 2021.
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Solution: Use {@link validateTwid} and {@link identifyTwrcVersion} instead.
 * @param {string} inputId
 * @returns {boolean}
 */
function twrcLegacy (inputId) {
	console.warn('validid.twrcLegacy() is deprecated. Please contact developer to update the program.');
	const res = validateTwid(inputId);
	const ver = identifyTwrcVersion(res.id);
	return res.ok && ver === TwrcVersion.RC_LEGACY;
}

/**
 * @module krid
 */


/** 13 characters in KRID. Fixed. */
const KRID_LENGTH = 13;

/**
 * String for regular expression to validate pattern for KRID.
 * @type {string}
 * @example new RegExp(KRID_PATTERN).test('7810305668081') // Returns true.
 */
const KRID_PATTERN = '^[0-9]{13}$';

/**
 * Minimum age to register a ID card.
 * @type {number}
 */
const KRID_MIN_AGE = 17;

/** @enum {ValididStatus} */
const KridStatus = {
	OK: statusOk,
	UNKNOWN_ERROR: statusUnknownError,
	INVALID_LENGTH: statusInvalidLength,
	INVALID_FORMAT: statusInvalidFormat,
	INVALID_DATE: statusInvalidDate,
	INVALID_CHECKSUM: statusInvalidChecksum,
	// DUMMY_ID: statusDummyId,
};

/**
 * Capture birth date from KRID.
 * @example
 * // Use case: Compare with birthday entered by user:
 * captureBirthDateFromKrid(normalizedId) === yyyymmddFromWebForm
 * @param {string} id A [normalized ID]{@link normalize}.
 * @returns {string} A string of date in "YYYYMMDD".
 * @throws Invalid date, e.g. 2001-02-29.
 */
function captureBirthDateFromKrid(id) {
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
function getKridDigit(id) {
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
function validateKrid(inputId) {
	const id = normalize$1(inputId);
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
function krid (inputId) {
	console.warn('validid.krid() is deprecated. Please contact developer to update the program.');
	const res = validateKrid(inputId);
	return res.ok;
}

/**
 * @module cnid
 */


/** 18 characters in CNID. Fixed. */
const CNID_LENGTH = 18;

/**
 * String for regular expression to validate pattern for CNID.
 * @type {string}
 * @example new RegExp(CNID_PATTERN).test('11010120170210193X'); // returns true.
 */
const CNID_PATTERN = '^[0-9]{17}[0-9X]$';

/**
 * A string of date in "YYYYMMDD" representing the birth date of the oldest Chinese.
 * Assume the oldest Chinese, Alimihan Seyiti, was born in 25 Jun, 1886 and she had an ID card.
 * Source: [SCMP news]{@link http://www.scmp.com/news/china/article/1297022/uygur-alimihan-seyiti-age-127-may-set-record-oldest-person-alive }
 *
 * This is not used in Validid package directly, but for reference for other developers.
 *
 * @type {string}
 */
const BIRTH_DATE_OF_OLDEST_CHINESE = '18860625';

/** @enum {ValididStatus} */
const CnidStatus = {
	OK: statusOk,
	UNKNOWN_ERROR: statusUnknownError,
	INVALID_LENGTH: statusInvalidLength,
	INVALID_FORMAT: statusInvalidFormat,
	INVALID_DATE: statusInvalidDate,
	INVALID_CHECKSUM: statusInvalidChecksum,
	// DUMMY_ID: statusDummyId,
};

/**
 * Capture birth date from CNID.
 * @example
 * // Use case: Compare with birthday entered by user:
 * captureBirthDateFromCnid(normalizedId) === yyyymmddFromWebForm
 * @param {string} id A [normalized ID]{@link normalize}.
 * @returns {string} A string of date in "YYYYMMDD".
 * @throws Invalid date, e.g. 2001-02-29
 */
function captureBirthDateFromCnid(id) {
	/** Recall the format of CNID: "110102YYYYMMDD888X" */
	const dateStr = id.substring(6, 14);
	if (!validateDateString(dateStr)) {
		throw new Error('Invalid date');
	}
	return dateStr;
}

/**
 * Get check digit of a China ID.
 * NOTE: This function does not validate its pattern.
 * @example getCnidDigit('11010120170210193_') // returns "X".
 * @param {string} id A [normalized ID]{@link normalize}. Use `_` if check digit is unknown.
 * @returns {string} Check digit: "0" to "9" or "X".
 */
function getCnidDigit(id) {
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
function validateCnid(inputId) {
	const id = normalize$1(inputId);
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
function cnid (inputId) {
	console.warn('validid.cnid() is deprecated. Please contact developer to update the program.');
	const res = validateCnid(inputId);
	return res.ok;
}

/**
 * @module utils/normalize
 */


/**
 * Normalize an ID by:
 * - `id.toUpperCase()`.
 * - Remove "-" and "/" at any position.
 * - Remove whitespace.
 * - Remove "(" and ")" at the end.
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Solution: Use named export `import { normalize } from 'validid/utils'`.
 * @example normalize('A123456(0)') // returns 'A1234560'.
 * @param {string} inputId Input ID, such as user-input in web form.
 * @returns {string} A normalized ID.
 */
function normalize (inputId) {
	return normalize$1(inputId);
}

/**
 * @module utils/is-date-valid
 */

/**
 * Parse a string of date to a `Date`.
 * @deprecated
 * @ignore
 * @param {string} yyyymmdd A string of date in "YYYYMMDD".
 * @returns {Date}
 * @throws Error of invalid format.
 */
function _parseDate(yyyymmdd) {
	if (typeof yyyymmdd !== 'string') {
		throw new TypeError('Input has to be string.');
	}
	if (yyyymmdd.length !== 8) {
		throw new RangeError('Input has to be in format of "YYYYMMDD".');
	}
	const year = yyyymmdd.substring(0, 4);
	const month = yyyymmdd.substring(4, 6);
	const day = yyyymmdd.substring(6, 8);
	const date = new Date(`${year}-${month}-${day}`);
	if (Number.isNaN(date.valueOf())) {
		throw new Error('Invalid date.');
	}
	return date;
}

/**
 * Validate a string of date, includes:
 * - Is a string in format "YYYYMMDD".
 * - Is not a future date.
 * - Is between `minDate` and `maxDate`.
 * - Any step is false, will interrupt and return false.
 *
 * Note about the default `minDate`:
 * - Assuming that only a living person can register for something.
 * - Providing ID number for a dead person is NOT the case.
 * - So, `minDate` is the birth date of world's "living" person verified.
 * - NOT a dead person who does not act on internet.
 * - Source: {@link https://en.wikipedia.org/wiki/Oldest_people }
 *
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Reason: Should not assume that only a living person can use a system.
 * @param {string} idDate A string of date in "YYYYMMDD".
 * @param {string} [minDate='default'] A string of date in "YYYYMMDD". Optional.
 * @param {(string|Date)} [maxDate='today'] Either "YYYYMMDD" or a `Date` object. Optional.
 * @returns {boolean}
 */
function isDateValid (idDate, minDate = 'default', maxDate = 'today') {
	/** @type {Date}
	 * @ignore */
	let parsedIdDate;
	/** @type {Date}
	 * @ignore */
	let parsedMinDate;
	/** @type {Date}
	 * @ignore */
	let parsedMaxDate;

	// Keep for legacy reason.
	if (minDate === 'default' || minDate === '') {
		minDate = '18991129';
	}

	// In proper format:
	try {
		parsedIdDate = _parseDate(idDate);
		parsedMinDate = _parseDate(minDate);
	} catch (error) {
		return false; // Early.
	}

	// Not a future date:
	const now = new Date();
	if (parsedIdDate > now || parsedMinDate > now) {
		return false;
	}

	// Parse maxDate:
	if (maxDate === 'today') {
		parsedMaxDate = now;
	} else if (typeof maxDate === 'string') {
		try {
			parsedMaxDate = _parseDate(maxDate);
		} catch (error) {
			return false;
		}
		if (parsedMaxDate < now) {
			return false;
		}
	} else if (maxDate instanceof Date && isFinite(maxDate.getTime())) {
		parsedMaxDate = maxDate;
	} else {
		return false;
	}

	// 5. Finally, check if the idDate falls between minDate and maxDate
	return parsedIdDate >= parsedMinDate && parsedIdDate <= parsedMaxDate;
}

/**
 * @module utils/get-max-date
 */

/**
 * Calculate the expected birth date by providing age.
 * Useful for putting `maxDate` in `isDateValid()`.
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Reason: Not perfectly safe to use user's local time.
 * Solution: Refactor using `getAge()` that accepts `currentTimeStr`.
 * @param {number} yearsOld A positive integer representing age.
 * @returns {Date}
 */
function getMaxDate (yearsOld) {
	const now = new Date();
	const year = now.getFullYear() - yearsOld;
	return new Date(year, now.getMonth(), now.getDate());
}

/**
 * @module utils/is-twid-checksum-valid
 */


/**
 * Validate checksum of Taiwan ID, including NIC and RC.
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Solution: Use {@link getTwidDigit} instead.
 * @param {string} id A [normalized ID]{@link normalize} including checksum.
 * @param {1|2} letterNum For legacy reason, this paramater is useless now.
 * @returns {boolean}
 */
function isTwidChecksumValid (id, letterNum) {
	return getTwidDigit(id) === id.slice(-1);
}

/**
 * @module utils/get-twrc-format
 */


/**
 * Check format of Taiwan Resident Certificate.
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Reason: "Old" and "new" are confusing.
 * Solution: Use {@link identifyTwrcVersion} instead.
 * @param {string} id A [normalized ID]{@link normalize}.
 * @returns {'old'|'new'|false}
 */
function getTwrcFormat (id) {
	const ver = identifyTwrcVersion(id);
	if (ver === TwrcVersion.RC_2021) {
		return 'new';
	}
	if (ver === TwrcVersion.RC_LEGACY) {
		return 'old';
	}
	return false;
}

/**
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Solution: Use named export from individual modules, e.g. `{ validateHkid }`.
 */
const validid = {
	hkid,
	twid,
	twrc,
	twrcLegacy,
	krid,
	cnid,
	utils: {
		normalize,
		isDateValid,
		getMaxDate,
		isTwidChecksumValid,
		getTwrcFormat,
	},
};

export { BIRTH_DATE_OF_OLDEST_CHINESE, CNID_LENGTH, CNID_PATTERN, CnidStatus, HKID_PATTERN, HkidStatus, KRID_LENGTH, KRID_MIN_AGE, KRID_PATTERN, KridStatus, TWID_LENGTH, TwidPattern, TwidStatus, TwidType, TwrcPattern, TwrcVersion, ValididResponse, ValididStatus, captureBirthDateFromCnid, captureBirthDateFromKrid, validid as default, getAge, getCnidDigit, getHkidDigit, getKridDigit, getTwidDigit, identifyTwidType, identifyTwrcVersion, isCaptialLetter, normalize$1 as normalize, statusDummyId, statusInvalidChecksum, statusInvalidDate, statusInvalidFormat, statusInvalidLength, statusOk, statusUnknownError, validateCnid, validateDateString, validateHkid, validateHkidLength, validateKrid, validateTwid };
