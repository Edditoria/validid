import { describe, test } from 'node:test';
import { ok } from 'node:assert/strict';
import validid from '../bundles/validid.esm.mjs';
import { allData } from './data/index.mjs';
import { generateErrorMessage, generateOneLineSummary } from './commons.mjs';

let twidData = structuredClone(allData.twidData);
for (const eachData of twidData) {
	eachData.expect.ok = eachData.twidType === 'NIC' && eachData.expect.ok;
}

let twrcData = structuredClone(allData.twidData);
for (const eachData of twrcData) {
	eachData.expect.ok = eachData.twidType === 'RC' && eachData.expect.ok;
}

let twrcLegacyData = structuredClone(allData.twidData);
for (const eachData of twrcLegacyData) {
	eachData.expect.ok = eachData.twrcVersion === 'RC_LEGACY' && eachData.expect.ok;
}

const scopes = [
	{ name: 'hkid', data: allData.hkidData, errors: [] },
	{ name: 'twid', data: twidData, errors: [] },
	{ name: 'twrc', data: twrcData, errors: [] },
	{ name: 'twrcLegacy', data: twrcLegacyData, errors: [] },
	{ name: 'cnid', data: allData.cnidData, errors: [] },
	{ name: 'krid', data: allData.kridData, errors: [] },
];

describe('bundled ESM', () => {
	for (const testScope of scopes) {
		const fnName = testScope.name;
		test(`validid.${fnName}()`, (t) => {
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
				if (actual !== eachData.expect.ok) {
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
