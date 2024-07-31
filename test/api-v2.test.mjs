import { describe, test } from 'node:test';
import { ok, strictEqual } from 'node:assert/strict';
import valididEsm from '../bundles/validid.esm.mjs';
import valididUmd from '../bundles/validid.umd.js';

const v2CoreNames = ['hkid', 'twid', 'twrc', 'twrcLegacy', 'krid', 'cnid'];
const v2UtilsNames = ['normalize', 'isDateValid', 'getMaxDate', 'isTwidChecksumValid', 'getTwrcFormat'];

describe('Deprecated APIs in v2: Import default via ES', () => {
	test('should exist in bundles/validid.esm.mjs', () => {
		for (const eachName of v2CoreNames) {
			ok(Object.hasOwn(valididEsm, eachName), `Function not found: ${eachName}`);
			// @ts-ignore
			const prop = valididEsm[eachName];
			strictEqual(typeof prop, 'function', `Not a function: validid.${eachName}`);
		}
		for (const eachName of v2UtilsNames) {
			ok(Object.hasOwn(valididEsm.utils, eachName), `Function not found: validid.utils.${eachName}`);
			// @ts-ignore
			const prop = valididEsm.utils[eachName];
			strictEqual(typeof prop, 'function', `Not a function: validid.utils.${eachName}`);
		}
	});
	test('should exist in bundles/validid.umd.js', () => {
		for (const eachName of v2CoreNames) {
			ok(Object.hasOwn(valididUmd, eachName), `Function not found: ${eachName}`);
			// @ts-ignore
			const prop = valididUmd[eachName];
			strictEqual(typeof prop, 'function', `Not a function: validid.${eachName}`);
		}
		for (const eachName of v2UtilsNames) {
			ok(Object.hasOwn(valididUmd.utils, eachName), `Function not found: validid.utils.${eachName}`);
			// @ts-ignore
			const prop = valididUmd.utils[eachName];
			strictEqual(typeof prop, 'function', `Not a function: validid.utils.${eachName}`);
		}
	});
});
