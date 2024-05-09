import type { Options } from './types';

const DEFAULT_IGNORE_PATHS: string[] = [
	// Node modules
	'node_modules',

	// Git
	'.git',

	// IDE configurations
	'.idea', // JetBrains IDEs (e.g., WebStorm)
	'.vscode', // Visual Studio Code

	// OS generated files
	'.DS_Store', // macOS
	'Thumbs.db', // Windows

	// Environment variables
	'.env',
	'.env.*', // .env.development, .env.production, etc.

	// Logs
	'logs',
	'*.log',

	// Svelte
	'public', // Svelte.js public folder
	'build', // Svelte.js build folder

	// SvelteKit
	'.svelte-kit', // SvelteKit generates this folder

	// Dist
	'dist', // Distribution folder

	// Vue.js
	'.nuxt', // Nuxt.js generates this folder

	// React.js
	'.next', // Next.js generates this folder

	// Remix.js
	'.remix', // Remix.js cache

	// Angular
	'e2e', // End-to-end tests in Angular
	'angular.json', // Angular CLI configuration
	'browserslist', // Browser compatibility list for Angular

	'.cache', // Cache files for various tools
];

export function getOptions(options: Options): Options {
	return {
		extensions: Array.isArray(options.extensions) ? options.extensions : [],
		ignoreFolders: Array.isArray(options.ignoreFolders) ? options.ignoreFolders : [],
		ignoreFiles: Array.isArray(options.ignoreFiles) ? options.ignoreFiles : [],
		attributes: Array.isArray(options.attributes) ? options.attributes : [],
	};
}

export function getIgnoredPaths(options: Options): string[] {
	const INVALID_PATHS: string[] = ['.', './', '/', '/.'];
	const IGNORED_FOLDERS: string[] = cleanIgnoredPaths(options.ignoreFolders || [], INVALID_PATHS).filter((path) => isFolder(path));
	const IGNORED_FILES: string[] = cleanIgnoredPaths(options.ignoreFiles || [], INVALID_PATHS).filter((path) => isFile(path));
	const IGNORED_PATHS: string[] = IGNORED_FOLDERS.concat(IGNORED_FILES);

	return IGNORED_PATHS;
}

export function isString(path: string): boolean {
	return !!path && typeof path === 'string';
}

export function cleanString(path: string): string {
	return path.trim().startsWith('./') ? path.substring(2) : path.trim();
}

export function hasIgnorePath(id: string, paths?: string[]): boolean {
	return (paths ?? DEFAULT_IGNORE_PATHS).some((path: string) => id.includes(path));
}

export function cleanIgnoredPaths(paths: string[], inValidPaths: string[]): string[] {
	return [...new Set(paths.filter((path: string) => !inValidPaths.includes(path) && isString(path) && cleanString(path).length).map(cleanString))];
}

export function isFile(path: string): boolean {
	const [fileName, ...fileExtension] = (path.split('/').pop() ?? '').split('.');
	return path.length >= 3 && fileExtension.length >= 2 && fileName.length >= 3 && !fileName.includes('/');
}

export function isFolder(path: string): boolean {
	// Check for valid characters - alphanumeric, underscore, dash, dot and slash are allowed
	return !isFile(path) && /^[a-zA-Z0-9_.-/]*$/.test(path);
}

export function hasExtension(id: string, options: Options): boolean {
	// eslint-disable-next-line security/detect-non-literal-regexp
	const EXTENSION_REGEX: RegExp = new RegExp(`\\.(${options.extensions.join('|')})$`, 'i');
	return EXTENSION_REGEX.test(id);
}

export function removeAttributes(input: string, attributes: string[]): string {
	return attributes.reduce((output, attribute) => {
		// eslint-disable-next-line security/detect-non-literal-regexp
		const REGEX: RegExp = new RegExp(`(\\s(:|v-bind:)?${attribute}\\s*=\\s*(['"\`])((?:(?!\\3).)*)(\\3))|(\\s(:|v-bind:)?${attribute}(?=[\\s>]))`, 'gi');
		return output.replace(REGEX, '');
	}, input);
}
