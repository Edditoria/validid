/**
 * @module utils/is-twid-checksum-valid
 */

import { getTwidDigit } from '../twid.mjs';

/**
 * Validate checksum of Taiwan ID, including NIC and RC.
 * @deprecated To be removed without notice. Please update your code ASAP.
 * Solution: Use {@link getTwidDigit} instead.
 * @param {string} id A [normalized ID]{@link normalize} including checksum.
 * @param {1|2} letterNum For legacy reason, this paramater is useless now.
 * @returns {boolean}
 */
export default function (id, letterNum) {
	// @ts-ignore
	const _ = letterNum; // eslint-disable-line no-unused-vars
	return getTwidDigit(id) === id.slice(-1);
}
