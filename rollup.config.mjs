// Import assertion is still in experimental, and it fails in ESLint.
// import packageJson from './package.json' assert { type: 'json' };
import { readFileSync } from 'node:fs';
import buble from '@rollup/plugin-buble';
import terser from '@rollup/plugin-terser';

// MARK: - Setup variables

/**
 * @typedef {Object} PackageJson
 * @property {string} name
 * @property {string} license
 * @property {string} author
 */

/**
 * Ref: https://github.com/eslint/eslint/discussions/15305
 * @returns {PackageJson} The JSON object.
 * @throws Error for missing properties.
 */
function importPackageJson() {
	// @ts-ignore
	const fileURL = new URL('./package.json', import.meta.url);
	const { name, license, author } = JSON.parse(readFileSync(fileURL, 'utf8'));
	if (!name && !license && !author) {
		throw new Error();
	}
	return { name, license, author };
}

/** @type {PackageJson} */
const pkg = importPackageJson();

/** @type {import('rollup').OutputOptions} */
const outputCommons = {
	indent: true, // as default.
	banner: `\
/**
 * Validid is a Javascript library to validate ID card number of Hong Kong, Taiwan, South Korea and China.
 *
 * Validid is open source in:
 * https://github.com/Edditoria/validid
 *
 * Code released under the ${pkg.license} license:
 * https://github.com/Edditoria/validid/blob/main/LICENSE.txt
 *
 * @author ${pkg.author}
 * @license ${pkg.license}
 */
`,
};

// MARK: - Plugin options

/** @type {import('@rollup/plugin-buble').RollupBubleOptions} */
const bubleEsmOptions = {
	target: { node: 8, safari: 11, chrome: 71 },
	// transforms: { dangerousForOf: true },
};

/** @type {import('@rollup/plugin-buble').RollupBubleOptions} */
const bubleUmdOptions = {
	target: { ie: 8 },
	transforms: { dangerousForOf: true },
};

/** @type {import('@rollup/plugin-terser').Options} */
const terserEsmOptions = {
	ecma: 2015,
	keep_classnames: true,
	compress: { arrows: false, typeofs: false },
	// mangle: false,
	format: {
		comments: 'some', // as default.
	},
};

/** @type {import('@rollup/plugin-terser').Options} */
const terserUmdOptions = {
	ecma: 5,
	ie8: true,
	safari10: true,
	keep_classnames: true,
	compress: { arrows: false, typeofs: false },
	// mangle: false,
	format: {
		comments: 'some', // as default.
	},
};

// MARK: - Export objects

/**
 * Rollup options:
 * - Target ES6 aka ECMAScript 2015.
 * - ESM; Not minified; In one file.
 * @type {import('rollup').RollupOptions}
 */
const rollupEsm = {
	input: 'tasks/resources/rollup-input/module.mjs',
	output: {
		...outputCommons,
		file: `bundles/${pkg.name}.esm.mjs`,
		format: 'esm',
	},
	plugins: [buble(bubleEsmOptions)],
};

/**
 * Rollup options:
 * - Target ES6 aka ECMAScript 2015.
 * - ESM; Minified; In one file.
 * @type {import('rollup').RollupOptions}
 */
const rollupEsmMin = {
	input: 'tasks/resources/rollup-input/module.mjs',
	output: {
		...outputCommons,
		file: `bundles/${pkg.name}.esm.min.mjs`,
		format: 'esm',
	},
	plugins: [buble(bubleEsmOptions), terser(terserEsmOptions)],
};

/**
 * Rollup options:
 * - Target legacy browsers.
 * - UMD; Not minified; In one file.
 * @type {import('rollup').RollupOptions}
 */
const rollupUmd = {
	input: 'tasks/resources/rollup-input/umd.mjs',
	output: {
		...outputCommons,
		file: `bundles/${pkg.name}.umd.js`,
		format: 'umd',
		name: pkg.name,
	},
	plugins: [buble(bubleUmdOptions)],
};

/**
 * Rollup options:
 * - Target legacy browsers.
 * - UMD; Minified; In one file.
 * @type {import('rollup').RollupOptions}
 */
const rollupUmdMin = {
	input: 'tasks/resources/rollup-input/umd.mjs',
	output: {
		...outputCommons,
		file: `bundles/${pkg.name}.umd.min.js`,
		format: 'umd',
		name: pkg.name,
	},
	plugins: [buble(bubleUmdOptions), terser(terserUmdOptions)],
};

export default [rollupEsm, rollupEsmMin, rollupUmd, rollupUmdMin];
