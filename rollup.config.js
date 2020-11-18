/* jshint esversion: 6 */

import packageJson from './package.json';
import coffee from 'rollup-plugin-coffee-script';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import banner from 'rollup-plugin-banner';
import copy from 'rollup-plugin-copy';

// Setup Some Vars
// ===============

const packageName = packageJson.name;
const resolveExt = ['.coffee', '.litcoffee', '.mjs', 'js'];
// #todo: not sure how to use tab as indentation in all codes
const indent = '  '; // '  ' or '\t'

// Options for Plugins
// ===================

const babelOptions = {
	babelrc: false,
	presets: ['@babel/env'],
	exclude: 'node_modules/**',
	extensions: resolveExt
};
const terserOptions = {
	mangle: { reserved: [packageName] }
};

// Preset Plugins Configs
// ======================

const pluginsCommon = [
	coffee(),
	babel(babelOptions),
	banner({ file: 'src/index.head.txt' })
];
const pluginsMinify = [
	coffee(),
	babel(babelOptions),
	terser(terserOptions),
	banner({ file: 'src/index.head.txt' })
];


export default [
	{
		// Copy files
		input: 'src/test/shared/rollup-other-tasks.js',
		plugins: [
			copy({ targets: [
				{ src: 'src/test/browser/index.html', dest: 'test/browser/' }
			]})
		]
	}, {
		// Build bundles:
		input: 'src/index.coffee',
		output: [
			{
				// UMD; Bundle in one file; Not minified
				file: `bundles/${packageName}.umd.js`,
				format: 'umd',
				name: packageName,
				indent: indent
			}, {
				// ESM; Bundle in one file; Not minified
				file: `bundles/${packageName}.esm.js`,
				format: 'esm',
				name: packageName,
				indent: indent
			}
		],
		plugins: pluginsCommon
	}, {
		// Build bundles:
		input: 'src/index.coffee',
		output: [
			{
				// UMD; Bundles in one file; Minified
				file: `bundles/${packageName}.umd.min.js`,
				format: 'umd',
				name: packageName,
				indent: indent
			}, {
				// ESM; Bundles in one file; Minified
				file: `bundles/${packageName}.esm.min.js`,
				format: 'esm',
				name: packageName,
				indent: indent
			}
		],
		plugins: pluginsMinify
	}, {
		// Build bundled UMD for test in browser
		input: 'src/index.coffee',
		output: {
			file: `test/browser/${packageName}.umd.js`,
			format: 'umd',
			name: packageName,
			indent: indent
		},
		plugins: pluginsCommon
	}, {
		// UMD test file
		input: 'src/test/umd/test.coffee',
		output: {
			file: 'test/umd/test.js',
			format: 'umd',
			name: 'test',
			indent: indent
		},
		plugins: pluginsCommon
	}, {
		// Browser test file
		input: 'src/test/browser/test.coffee',
		output: {
			file: 'test/browser/test.js',
			format: 'iife',
			name: 'test',
			indent: indent
		},
		plugins: pluginsCommon
	}
];
