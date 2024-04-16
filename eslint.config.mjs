import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import js from '@eslint/js';

export default [
	js.configs.recommended,
	eslintConfigPrettier,
	{
		languageOptions: {
			ecmaVersion: 2022, // aka 13.
			sourceType: 'module',
			globals: { ...globals.es2022, ...globals.node },
		},
		rules: {
			'linebreak-style': ['error', 'unix'], // as default in ESLint.
			indent: ['error', 'tab', { SwitchCase: 1 }],
			quotes: ['error', 'single'],
			'jsx-quotes': ['error', 'prefer-double'], // as default in ESLint.
			'max-len': [
				'warn',
				{
					code: 80,
					ignoreTrailingComments: true,
					ignoreUrls: true,
					ignoreStrings: true,
					ignoreTemplateLiterals: true,
					ignoreRegExpLiterals: true,
				},
			],
			semi: ['error', 'always'], // as default in ESLint.
		},
	},
];
