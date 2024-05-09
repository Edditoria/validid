import { describe, test } from 'node:test';
import { ok, deepStrictEqual } from 'node:assert/strict';
import { validateTwid } from '../esm/twid.mjs';
import { twidData } from './data/twid.mjs';
import { generateErrorMessage, generateOneLineSummary } from './commons.mjs';

describe('twid module', () => {
	test('validateTwid()', (t) => {
		const errors = [];
		for (const eachData of twidData) {
			const actual = validateTwid(eachData.id);
			try {
				deepStrictEqual(actual, eachData.expect);
			} catch {
				errors.push(eachData);
			}
		}
		const hasNoError = errors.length === 0;
		if (hasNoError) {
			t.diagnostic(generateOneLineSummary(twidData, errors));
		} else {
			t.diagnostic(generateErrorMessage(twidData, errors));
		}
		ok(hasNoError, generateOneLineSummary(twidData, errors));
	});
});
