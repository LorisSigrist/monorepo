import { createBundle } from 'dts-buddy';

createBundle({
	project: 'tsconfig.json',
	output: 'types/index.d.ts',
	modules: {
		'@sigrist.dev/sveltekit-roles': './src/index.js'
	},
	include: ['src']
});
