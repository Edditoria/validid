/*jshint esversion: 6 */

import packageJson from './package.json';

import babel from 'rollup-plugin-babel';
import cjs from '@rollup/plugin-commonjs';
import cleaner from 'rollup-plugin-cleaner';
import coffee from 'rollup-plugin-coffee-script';
import copy from 'rollup-plugin-copy';

const src = 'src';
const dest = packageJson.directories.lib;
const test = packageJson.directories.test;

const inputFile = `${src}/${packageJson.name}.coffee`;
const outputFileUmd = packageJson.main;

const packageName = packageJson.name;
const resolveExt = ['.coffee', '.litcoffee', '.mjs', 'js'];
const indent = '  '; // '  ' or '\t'
// #todo: not sure how to use tab as indentation in all codes
const commonPlugins = [
			coffee(),
			cjs({ extensions: resolveExt }),
			babel({
				babelrc: false,
				presets: ['@babel/env'],
				exclude: 'node_modules/**',
				extensions: resolveExt
			})
		];


export default [
	{
		// Clean up and copy files
		input: 'src/test/shared/rollup-other-tasks.js',
		plugins: [
			cleaner({ targets: [`./${dest}/`, `./${test}/`]}),
			copy({ targets: [
				{ src: `${src}/test/browser/index.html`, dest: `${test}/browser/` }
			]})
		]
	}, {
		// UMD format as default
		input: inputFile,
		output: [
			{
				file: outputFileUmd,
				format: 'umd',
				name: packageName,
				indent: indent
			}, {
				file: `${test}/browser/${packageName}.umd.js`,
				format: 'umd',
				name: packageName,
				indent: indent
			}
		],
		plugins: commonPlugins
	}, {
		// UMD test file
		input: `${src}/test/umd/test.coffee`,
		output: {
			file: `${test}/umd/test.js`,
			format: 'umd',
			name: 'test',
			indent: indent
		},
		plugins: commonPlugins
	}, {
		// Browser test file
		input: `${src}/test/browser/test.coffee`,
		output: {
			file: `${test}/browser/test.js`,
			format: 'iife',
			name: 'test',
			indent: indent
		},
		plugins: commonPlugins
	}
];
