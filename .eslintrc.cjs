/** @type {import('eslint').Linter.FlatConfig} */
module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:svelte/recommended', 'prettier'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest',
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		'no-console': [
			'error',
			{
				allow: [
					'debug',
					'error',
					'info',
					'warn',
					'dir',
					'dirxml',
					'table',
					'trace',
					'group',
					'groupCollapsed',
					'groupEnd',
					'clear',
					'count',
					'countReset',
					'assert',
					'profile',
					'profileEnd',
					'time',
					'timeLog',
					'timeEnd',
					'timeStamp',
					'context',
					'createTask',
					'memory'
				]
			}
		]
	}
};
