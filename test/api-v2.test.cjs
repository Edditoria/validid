const { describe, test } = require('node:test');
const { ok, strictEqual } = require('node:assert/strict');
const valididUmd = require('../bundles/validid.umd.js');

const v2CoreNames = ['hkid', 'twid', 'twrc', 'twrcLegacy', 'krid', 'cnid'];
const v2UtilsNames = ['normalize', 'isDateValid', 'getMaxDate', 'isTwidChecksumValid', 'getTwrcFormat'];

describe('Deprecated APIs in v2: Require via CommonJS', () => {
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
