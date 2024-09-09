/**
 * Prettier, eslint, .editorconfig and .gitattributes work together.
 * Remember to check their configs regularly.
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import('prettier').Config}
 */
export default {
	printWidth: 999,
	useTabs: true, // also in .editorconfig file.
	semi: true, // as default.
	singleQuote: true,
	jsxSingleQuote: true,
	trailingComma: 'es5',
	proseWrap: 'preserve', // as default.
	endOfLine: 'lf', // as default. Also in .editorconfig and .gitattributes files.
};
