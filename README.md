<div align="center">

# `@castlenine/vite-remove-attribute`

[![npm.badge]][npm] [![download.badge]][download]

Vite plugin that allows the removal of specified attributes and supports a variety of options, including file extensions, attributes, ignored folders, and files.
</div>

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Prerequisites](#prerequisites)
  - [Examples](#examples)

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

To use this plugin, you need to have a Vite project set up. Import and use the plugin in your `vite.config.js` or
`vite.config.ts` file.

## Examples

### Example 1: Removing 'data-testid' attributes from `.svelte` files

This configuration will remove `data-testid` attributes from all `.svelte` files in the production build.

```typescript
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

import removeAttribute from '@castlenine/vite-remove-attribute';

const IS_PRODUCTION = process.env.NODE_ENV == 'production';

export default defineConfig({
    plugins: [
        sveltekit(),

        IS_PRODUCTION
            ? removeAttribute({
                    extensions: ['svelte'],
                    attributes: ['data-testid'],
                })
            : null,
    ],
});
```

### Example 2: Ignoring specific folders and files

This configuration will remove `data-testid` and `data-id` attributes from all `.svelte`, `.ts`, and `.js` files, with the exception of those located in the `src/tests` and `src/utilities` folders, as well as the `Header.svelte`, `src/components/Modal.svelte`, and `src/layouts/LayoutAuth.svelte` files in all builds.

```typescript
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

import removeAttribute from '@castlenine/vite-remove-attribute';

export default defineConfig({
    plugins: [
        sveltekit(),
        removeAttribute({
            extensions: ['svelte', 'ts', 'js'],
            attributes: ['data-testid', 'data-id'],
            ignoreFolders: ['src/tests', 'src/utilities'],
            ignoreFiles: ['Header.svelte', 'src/components/Modal.svelte', 'src/layouts/LayoutAuth.svelte'],
        }),
    ],
});
```

<br />

Forked from [mustafadalga/remove-attr](https://github.com/mustafadalga/remove-attr)

[npm]: https://www.npmjs.com/package/@castlenine/vite-remove-attribute
[npm.badge]: https://img.shields.io/npm/v/@castlenine/vite-remove-attribute
[download]: https://www.npmjs.com/package/@castlenine/vite-remove-attribute
[download.badge]: https://img.shields.io/npm/d18m/@castlenine/vite-remove-attribute
