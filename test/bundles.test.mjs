import { describe, test } from 'node:test';
import { ok } from 'node:assert/strict';
import validid from '../bundles/validid.esm.mjs';
import { allData } from './data/index.mjs';

const scopes = [
	{ cardType: 'hkid', data: allData.hkidData, errors: [] },
	{ cardType: 'twid', data: allData.twidData, errors: [] },
	{ cardType: 'twrc', data: allData.twrcData, errors: [] },
	{ cardType: 'cnid', data: allData.cnidData, errors: [] },
	{ cardType: 'krid', data: allData.kridData, errors: [] },
];

function generateOneLineSummary(data, errors) {
	const numOfErrors = errors.length;
	const numOfData = data.length;
	if (numOfErrors === 0) {
		return `Total ${numOfData} tests done without error.`;
	} else {
		return `${numOfErrors} error(s) out of ${numOfData} tests.`;
	}
}

function generateErrorMessage(data, errors) {
	let errMsg = generateOneLineSummary(data, errors) + ' Details:';
	for (const eachData of errors) {
		errMsg += '\n    ' + JSON.stringify(eachData);
	}
	return errMsg;
}

describe('bundled ESM', () => {
	for (const testScope of scopes) {
		const fnName = testScope.cardType;
		test(`validid.${testScope.cardType}()`, (t) => {
			// Prepare:
			if (!Object.hasOwn(validid, fnName)) {
				throw new ReferenceError(`Function not exists: validid.${fnName}.`);
			}
			if (typeof validid[fnName] !== 'function') {
				throw new TypeError(`validid.${fnName} exists but not a function.`);
			}
			// Loop data:
			for (const eachData of testScope.data) {
				const actual = validid[fnName](eachData.id);
				if (actual !== eachData.expect) {
					testScope.errors.push(eachData);
				}
			}
			// Summary:
			const hasNoError = testScope.errors.length === 0;
			if (hasNoError) {
				t.diagnostic(generateOneLineSummary(testScope.data, testScope.errors));
			} else {
				t.diagnostic(generateErrorMessage(testScope.data, testScope.errors));
			}
			ok(hasNoError, generateOneLineSummary(testScope.data, testScope.errors));
		});
	}
});
