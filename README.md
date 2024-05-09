<div align="center">

# `@castlenine/vite-remove-attribute`

[![npm.badge]][npm] [![download.badge]][download]

Vite plugin that allows the removal of specified attributes and supports a variety of options, including file extensions, attributes, ignored folders, and files.
</div>

## Table of Contents

- [Disclaimer](#disclaimer)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Prerequisites](#prerequisites)
  - [Notes](#notes)
  - [Examples](#examples)

## Disclaimer

**Only tested with Svelte, SvelteKit and Vue.js projects**. Please open an issue if you encounter any problems with other frameworks.

## Features

- Removes specified attributes
- Allows you to specify the file extensions to be processed
- Can ignore certain folders or files based on configuration
- Ensures clean production code by removing unnecessary attributes, like 'data-testid' used in testing

## Installation

Use your package manager to install:

```shell
npm i --save-dev @castlenine/vite-remove-attribute
```

## Usage

### Prerequisites

To use this plugin, you must have a Vite config file set up in your project. If you don't have one, create a `vite.config.js` or `vite.config.ts` file in the root of your project.

### Notes

For some frameworks, like Svelte & SvelteKit, this plugin should be placed first (before the framework's plugin) in the `plugins` array and for others, like Vue.js, it should be placed after the framework's plugin.

## Examples

### SvelteKit example 1: Removing 'data-testid' attributes from `.svelte` files

This configuration will remove `data-testid` attributes from all `.svelte` files in the production build.

```typescript
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

import removeAttribute from '@castlenine/vite-remove-attribute';

const IS_PRODUCTION = process.env.NODE_ENV == 'production';

export default defineConfig({
    plugins: [
        IS_PRODUCTION
            ? removeAttribute({
                    extensions: ['svelte'],
                    attributes: ['data-testid'],
                })
            : null,

        sveltekit(), // SvelteKit plugin should be placed after removeAttribute
    ],
});
```

### SvelteKit example 2: Ignoring specific folders and files

This configuration will remove `data-testid` and `data-id` attributes from all `.svelte`, `.ts`, and `.js` files, with the exception of those located in the `src/tests` and `src/utilities` folders, as well as the `Header.svelte`, `src/components/Modal.svelte`, and `src/layouts/LayoutAuth.svelte` files in all builds.

```typescript
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

import removeAttribute from '@castlenine/vite-remove-attribute';

export default defineConfig({
    plugins: [
        removeAttribute({
            extensions: ['svelte', 'ts', 'js'],
            attributes: ['data-testid', 'data-id'],
            ignoreFolders: ['src/tests', 'src/utilities'],
            ignoreFiles: ['Header.svelte', 'src/components/Modal.svelte', 'src/layouts/LayoutAuth.svelte'],
        }),

        sveltekit(), // SvelteKit plugin should be placed after removeAttribute
    ],
});
```

### Vue.js example 1: Removing 'data-testid' attributes from '.vue' files

This configuration will remove 'data-testid' attributes from all '.vue' files in the production build.

```typescript
const IS_PRODUCTION = process.env.NODE_ENV == 'production';

export default defineConfig({
    plugins: [
        vue(), // Vue plugin should be placed before removeAttribute
        IS_PRODUCTION
            ? removeAttribute({
                    extensions: ['vue'],
                    attributes: ['data-testid'],
                })
            : null,
    ]
})
```

#### Vue.js example 2: Ignoring specific folders and files

This configuration will remove `data-testid` and `data-id` attributes from all `.vue`, `.ts`, and `.js` files, with the exception of those located in the `src/tests` and `src/utilities` folders, as well as the `Header.vue`, `src/components/Modal.vue`, and `src/layouts/LayoutAuth.vue` files in all builds.

```typescript
export default defineConfig({
    plugins: [
        vue(), // Vue plugin should be placed before removeAttribute
        removeAttr({
            extensions: [ 'vue', "ts", "js" ],
            attributes: [ 'data-testid', "data-id" ],
            ignoreFolders: [ 'src/tests', "src/utilities" ],
            ignoreFiles: [ 'Header.vue', 'src/components/Modal.vue', "src/layouts/LayoutAuth.vue" ]
        })
    ]
})
```

<br />

Forked from [mustafadalga/remove-attr](https://github.com/mustafadalga/remove-attr)

[npm]: https://www.npmjs.com/package/@castlenine/vite-remove-attribute
[npm.badge]: https://img.shields.io/npm/v/@castlenine/vite-remove-attribute
[download]: https://www.npmjs.com/package/@castlenine/vite-remove-attribute
[download.badge]: https://img.shields.io/npm/d18m/@castlenine/vite-remove-attribute
