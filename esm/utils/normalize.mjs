/**
 * @module utils/normalize
 */

import { normalize } from '../utils.mjs';

/**
 * Normalize an ID by:
 * - `id.toUpperCase()`.
 * - Remove '-' and '/' at any position.
 * - Remove whitespace.
 * - Remove '(' and ')' at the end of the string, e.g. 'A123456(0)'.
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Solution: Use named export `{ normalize }`.
 * @param {string} inputId Input ID, such as user-input in web form.
 * @returns {string} A normalized ID.
 */
export default function (inputId) {
	return normalize(inputId);
}
