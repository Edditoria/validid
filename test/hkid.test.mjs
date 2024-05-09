import { describe, test } from 'node:test';
import { ok, deepStrictEqual } from 'node:assert/strict';
import { validateHkid } from '../esm/hkid.mjs';
import { hkidData } from './data/hkid.mjs';
import { generateErrorMessage, generateOneLineSummary } from './commons.mjs';

describe('hkid module', () => {
	test('validateHkid()', (t) => {
		const errors = [];
		for (const eachData of hkidData) {
			const actual = validateHkid(eachData.id);
			try {
				deepStrictEqual(actual, eachData.expect);
			} catch {
				errors.push(eachData);
			}
		}
		const hasNoError = errors.length === 0;
		if (hasNoError) {
			t.diagnostic(generateOneLineSummary(hkidData, errors));
		} else {
			t.diagnostic(generateErrorMessage(hkidData, errors));
		}
		ok(hasNoError, generateOneLineSummary(hkidData, errors));
	});
});
