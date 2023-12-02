import { createBundle } from 'dts-buddy';

createBundle({
	project: 'tsconfig.json',
	output: 'types/index.d.ts',
	modules: {
		'@sigrist.dev/guardian': './src/index.js'
	},
	include: ['src']
});
