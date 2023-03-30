import packageJson from './package.json' assert { type: 'json' };
import buble from '@rollup/plugin-buble';
import terser from '@rollup/plugin-terser';
import banner from 'rollup-plugin-banner';

// Setup Some Vars
// ===============

const packageName = packageJson.name;
const resolveExt = ['.coffee', '.litcoffee', '.mjs', 'js'];
// #todo: not sure how to use tab as indentation in all codes
const indent = '  '; // '  ' or '\t'

// Options for Plugins
// ===================

// NOTE: Keep it tentatively.
// const babelOptions = {
//	babelrc: false,
//	presets: [
//		[
//			'@babel/preset-env',
//			{ targets: { ie: "9", node: "4" } }
//		]
//	],
//	babelHelpers: 'bundled',
//	exclude: 'node_modules/**',
//	extensions: resolveExt
//};
const terserOptions = {
	ecma: 5,
	compress: false,
	mangle: false,
	keep_classnames: true,
	keep_fnames: true,
	output: {
		beautify: false,
		comments: false,
		indent_level: 2,
	},
};

// Preset Plugins Configs
// ======================

const pluginsCommon = [
	// buble(),
	// babel(babelOptions),
	banner.default({ file: 'src/index.head.txt' }),
];
const pluginsMinify = [
	buble({
		transforms: { dangerousForOf: true },
	}),
	// babel(babelOptions),
	terser(terserOptions),
	banner.default({ file: 'src/index.head.txt' }),
];

export default [
	{
		// Build bundles:
		input: 'esm/index.mjs',
		output: [
			{
				// UMD; Bundle in one file; Not minified
				file: `bundles/${packageName}.umd.js`,
				format: 'umd',
				name: packageName,
				indent: indent,
			},
			{
				// ESM; Bundle in one file; Not minified
				file: `bundles/${packageName}.esm.mjs`,
				format: 'esm',
				name: packageName,
				indent: indent,
			},
		],
		plugins: pluginsCommon,
	},
	{
		// Build bundles:
		input: 'esm/index.mjs',
		output: [
			{
				// UMD; Bundles in one file; Minified
				file: `bundles/${packageName}.umd.min.js`,
				format: 'umd',
				name: packageName,
				indent: indent,
			},
			{
				// ESM; Bundles in one file; Minified
				file: `bundles/${packageName}.esm.min.mjs`,
				format: 'esm',
				name: packageName,
				indent: indent,
			},
		],
		plugins: pluginsMinify,
	},
];
