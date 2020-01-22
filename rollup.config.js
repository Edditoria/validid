/*jshint esversion: 6 */

import babel from 'rollup-plugin-babel';
import cjs from '@rollup/plugin-commonjs';
import coffee from 'rollup-plugin-coffee-script';
import packageJson from './package.json';

const src = 'src';
const dest = packageJson.directories.lib;
const test = packageJson.directories.test;

const inputFile = `${src}/${packageJson.name}.coffee`;
const outputFileUmd = packageJson.main;
const outputFileBrowser = packageJson.browser;

const packageName = packageJson.name;
const resolveExt = ['.coffee', '.litcoffee', '.mjs', 'js'];


export default [
	{
		// UMD format as default; Not supported by some browsers, e.g. class in IE
		input: inputFile,
		output: [
			{
				file: outputFileUmd,
				format: 'umd',
				name: packageName
			}, {
				file: `${test}/${packageName}.umd.js`,
				format: 'umd',
				name: packageName
			}
		],
		plugins: [
			coffee(),
			cjs({ extensions: resolveExt })
		]
	}, {
		// IIFE format for legacy browsers; Class is transpiled by babel
		input: inputFile,
		output: [
			{
				file: outputFileBrowser,
				format: 'iife',
				name: packageName
			}, {
				file: `${test}/${packageName}.browser.js`,
				format: 'iife',
				name: packageName
			}
		],
		plugins: [
			coffee(),
			cjs({ extensions: resolveExt }),
			babel({
				babelrc: false,
				presets: ['@babel/env'],
				exclude: 'node_modules/**',
				extensions: resolveExt
			})
		]
	}
];
