import type { Plugin } from 'vite';
import type { Options } from './types';

import { removeAttributes, hasIgnorePath, getOptions, hasExtension, getIgnoredPaths } from './utilities';

export default function removeAttributesPlugin(options: Options): Plugin {
	const OPTION_LIST: Options = getOptions(options);
	const IGNORED_PATHS: string[] = getIgnoredPaths(OPTION_LIST);

	return {
		name: 'remove-attributes',
		enforce: 'pre',
		transform(code: string, id: string): string {
			const IS_IGNORED_PATH = hasIgnorePath(id) || hasIgnorePath(id, IGNORED_PATHS);

			if (IS_IGNORED_PATH || !hasExtension(id, OPTION_LIST)) {
				return code;
			}

			return removeAttributes(code, OPTION_LIST.attributes);
		},
	};
}
