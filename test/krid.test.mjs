import { describe, test } from 'node:test';
import { ok, deepStrictEqual } from 'node:assert/strict';
import { validateKrid } from '../esm/krid.mjs';
import { kridData } from './data/krid.mjs';
import { generateErrorMessage, generateOneLineSummary } from './commons.mjs';

describe('krid module', () => {
	test('validateKrid()', (t) => {
		const errors = [];
		for (const eachData of kridData) {
			const actual = validateKrid(eachData.id);
			try {
				deepStrictEqual(actual, eachData.expect);
			} catch {
				errors.push(eachData);
			}
		}
		const hasNoError = errors.length === 0;
		if (hasNoError) {
			t.diagnostic(generateOneLineSummary(kridData, errors));
		} else {
			t.diagnostic(generateErrorMessage(kridData, errors));
		}
		ok(hasNoError, generateOneLineSummary(kridData, errors));
	});
});
