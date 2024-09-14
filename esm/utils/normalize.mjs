/**
 * @module utils/normalize
 */

import { normalize } from '../utils.mjs';

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
export default function (inputId) {
	return normalize(inputId);
}
