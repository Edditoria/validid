// Import assertion is still in experimental, and it fails in ESLint.
// import packageJson from './package.json' assert { type: 'json' };
import { readFileSync } from 'node:fs';
import buble from '@rollup/plugin-buble';
import terser from '@rollup/plugin-terser';

/**
 * Ref: https://github.com/eslint/eslint/discussions/15305
 * @param {string} filePath - E.g. './package.json'.
 * @returns {Object} The JSON object.
 */
function importJSONSync(filePath) {
	const fileURL = new URL(filePath, import.meta.url);
	const theJSON = JSON.parse(readFileSync(fileURL, 'utf8'));
	return theJSON;
}

// Setup Some Vars
// ===============

const packageJSON = importJSONSync('./package.json');
const packageName = packageJSON.name;
const indent = true;
const banner = `\
/**
 * Validid is a Javascript library to validate ID Card numbers of China, Taiwan, Hong Kong and South Korea. \\
 * Validid is open source in: \\
 * https://github.com/Edditoria/validid \\
 * Code released under the ${packageJSON.license} license: \\
 * https://github.com/Edditoria/validid/blob/master/LICENSE.txt
 * @author ${packageJSON.author}
 * @license ${packageJSON.license}
 */
`;

// Options for Plugins
// ===================

const terserOptions = {
	ecma: 5,
	compress: false,
	mangle: false,
	keep_classnames: true,
	keep_fnames: true,
	format: {
		beautify: false, // as default.
		comments: 'some', // as default.
		indent_level: 2,
	},
};

// Preset Configs
// ==============

const outputCommon = {
	indent: indent,
	banner: banner,
};
const pluginsCommon = [
	// buble(),
];
const pluginsMinify = [
	buble({
		transforms: { dangerousForOf: true },
	}),
	terser(terserOptions),
];

export default [
	{
		// Build bundles:
		input: 'esm/index.mjs',
		output: [
			// UMD; Bundle in one file; Not minified
			{
				...outputCommon,
				file: `bundles/${packageName}.umd.js`,
				format: 'umd',
				name: packageName,
			},
			// ESM; Bundle in one file; Not minified
			{
				...outputCommon,
				file: `bundles/${packageName}.esm.mjs`,
				format: 'esm',
				// name: packageName,
			},
		],
		plugins: pluginsCommon,
	},
	{
		// Build bundles:
		input: 'esm/index.mjs',
		output: [
			// UMD; Bundles in one file; Minified
			{
				...outputCommon,
				file: `bundles/${packageName}.umd.min.js`,
				format: 'umd',
				name: packageName,
			},
			// ESM; Bundles in one file; Minified
			{
				...outputCommon,
				file: `bundles/${packageName}.esm.min.mjs`,
				format: 'esm',
				// name: packageName,
			},
		],
		plugins: pluginsMinify,
	},
];
