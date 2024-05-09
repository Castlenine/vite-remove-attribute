import { defineConfig } from 'vite';

import typescript from '@rollup/plugin-typescript';

export default defineConfig({
	build: {
		lib: {
			entry: './src/index.ts',
			name: 'RemoveAttributesPlugin',
			fileName: 'index',
		},
		rollupOptions: {
			plugins: [
				typescript({
					tsconfig: './tsconfig.json',
				}),
			],
		},
	},
});
