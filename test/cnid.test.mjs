import { describe, test } from 'node:test';
import { ok, deepStrictEqual } from 'node:assert/strict';
import { validateCnid } from '../esm/cnid.mjs';
import { cnidData } from './data/cnid.mjs';
import { generateErrorMessage, generateOneLineSummary } from './commons.mjs';

describe('cnid module', () => {
	test('validateCnid()', (t) => {
		const errors = [];
		for (const eachData of cnidData) {
			const actual = validateCnid(eachData.id);
			try {
				deepStrictEqual(actual, eachData.expect);
			} catch {
				errors.push(eachData);
			}
		}
		const hasNoError = errors.length === 0;
		if (hasNoError) {
			t.diagnostic(generateOneLineSummary(cnidData, errors));
		} else {
			t.diagnostic(generateErrorMessage(cnidData, errors));
		}
		ok(hasNoError, generateOneLineSummary(cnidData, errors));
	});
});
