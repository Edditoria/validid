/**
 * Normalize an ID by:
 * - `id.toUpperCase()`.
 * - Remove '-' and '/' at any position.
 * - Remove whitespace.
 * - Remove '(' and ')' at the end of the string, e.g. 'A123456(0)'.
 * @module utils/normalize
 * @param {string} id
 * @returns {string} Normalized ID
 */
export function normalize(id) {
	let re = /[-/\s]/g;
	id = id.toUpperCase().replace(re, '');
	re = /\([A-Z0-9]\)$/;
	if (re.test(id)) { id = id.replace(/[()]/g, ''); }
	return id;
}

/**
 * Normalize an ID by:
 * - `id.toUpperCase()`.
 * - Remove '-' and '/' at any position.
 * - Remove whitespace.
 * - Remove '(' and ')' at the end of the string, e.g. 'A123456(0)'.
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Solution: Use named export `{ normalize }`.
 * @param {string} id
 * @returns {string} Normalized ID.
 */
export default function (id) {
	return normalize(id);
}
