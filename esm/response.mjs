/**
 * @module response
 */

/**
 * Serve as "final answer" of the main modules in Validid package.
 * Keep the type simple for more usages, e.g. JSON data via API call.
 * @typedef {Object} ValididResponse
 * @property {string} id Normalized ID.
 * @property {string} type Type of ID, e.g. "TWID".
 * @property {boolean} ok Valid or not. Most developers may rely on this.
 * @property {ValididStatus} status
 */
export const ValididResponse = {}; // For type hints in JSDoc and Typescript.

/**
 * Status to describe error, or not.
 * Designed to be rewritable for developers, so not going to `Object.freeze()`.
 * @typedef {Object} ValididStatus
 * @property {number} code Unique number across your program.
 * @property {string} text Unique "label" or symbol-like string.
 * @property {string} desc Free to use message, e.g. localized message in UI.
 */
export const ValididStatus = {}; // For type hints in JSDoc and Typescript.

/** @type {ValididStatus} */
export const statusOk = { code: 0, text: 'OK', desc: '' };

/** @type {ValididStatus} */
export const statusUnknownError = { code: 1, text: 'UNKNOWN_ERROR', desc: '' };

/** @type {ValididStatus} */
export const statusInvalidLength = { code: 2, text: 'INVALID_LENGTH', desc: '' };

/** @type {ValididStatus} */
export const statusInvalidFormat = { code: 3, text: 'INVALID_FORMAT', desc: '' };

/** @type {ValididStatus} */
export const statusInvalidDate = { code: 4, text: 'INVALID_DATE', desc: '' };

/** @type {ValididStatus} */
export const statusInvalidChecksum = { code: 5, text: 'INVALID_CHECKSUM', desc: '' };

/** @type {ValididStatus} */
export const statusDummyId = { code: 6, text: 'DUMMY_ID', desc: '' };
