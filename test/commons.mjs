import { ValididResponse } from '../esm/response.mjs';

/**
 * @typedef {Object} TestData
 * @property {string} id
 * @property {ValididResponse} expect
 * @property {string} [twidType]
 * @property {string} [twrcVersion]
 */

/** Just a magic trick for JSDoc and Typescript. */
// @ts-ignore
const _response = ValididResponse; // eslint-disable-line no-unused-vars

/**
 * @param {TestData[]} data
 * @param {TestData[]} errors
 * @returns {string}
 */
export function generateOneLineSummary(data, errors) {
	const numOfErrors = errors.length;
	const numOfData = data.length;
	if (numOfErrors === 0) {
		return `Total ${numOfData} tests done without error.`;
	} else {
		return `${numOfErrors} error(s) out of ${numOfData} tests.`;
	}
}

/**
 * @param {TestData[]} data
 * @param {TestData[]} errors
 * @returns {string}
 */
export function generateErrorMessage(data, errors) {
	let errMsg = generateOneLineSummary(data, errors) + ' Details:';
	for (const eachData of errors) {
		errMsg += '\n    ' + JSON.stringify(eachData);
	}
	return errMsg;
}
