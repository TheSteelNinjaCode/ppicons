# ppicons-cli

Generate reusable icon components for Prisma PHP and Caspian projects from the terminal.

Instead of copying SVG markup by hand, `ppicons` downloads icon definitions from the remote catalog, normalizes the SVG, writes framework-friendly component files, and refreshes AI-aware metadata files in the target project.

Quick examples:

```bash
npx ppicons add search
npx ppicons add anchor globe rocket
npx ppicons add --all
npx ppicons update
```

## Why use it

UI icon usage gets messy fast when SVGs are copied inline across templates and components.

`ppicons` solves that by turning icons into first-class components:

- one source of truth per installed icon
- consistent SVG normalization and attribute handling
- predictable file names and import paths
- easier refactoring, reuse, and search in the editor
- machine-readable and AI-readable project metadata

## Features

| Capability             | What you get                                                                |
| ---------------------- | --------------------------------------------------------------------------- |
| Single icon generation | `ppicons add <name>` downloads and writes one component file.               |
| Bulk generation        | `ppicons add --all` generates the full icon catalog in one run.             |
| Update installed icons | `ppicons update` refreshes only the icons already installed in the project. |
| Dual language support  | PHP mode for Prisma PHP / PHPX and Python mode for Caspian.                 |
| Auto-detect language   | Detects `caspian.config.json` for Python or `prisma-php.json` for PHP.      |
| Force overwrite        | `--force` overwrites existing generated files.                              |
| AI-aware outputs       | Writes `ppicons.json`, `.github/copilot-instructions.md`, and `AGENTS.md`.  |
| Catalog discovery      | Documents and exposes the remote icon catalog endpoints used by the CLI.    |

## Requirements

- Node.js 18+
- Network access to `https://ppicons.tsnc.tech`
- A Prisma PHP project or a Caspian project when using the generated components in a real app

## Installation

Global install:

```bash
npm install -g ppicons
```

Local dev dependency:

```bash
npm install -D ppicons
```

## Commands

### Add one icon

```bash
npx ppicons add search
```

### Add multiple icons

```bash
npx ppicons add search user settings
```

### Add the full icon set

```bash
npx ppicons add --all
```

### Update installed icons

```bash
npx ppicons update
```

### Force overwrite

```bash
npx ppicons add search --force
npx ppicons add --all --force
```

## Flags

| Flag         | Description                                  |
| ------------ | -------------------------------------------- |
| `--all`      | Generate every icon from the remote catalog. |
| `--force`    | Overwrite existing generated icon files.     |
| `--lang php` | Force Prisma PHP / PHPX output.              |
| `--lang py`  | Force Caspian Python output.                 |

## Language selection

If you do not pass `--lang`, `ppicons` auto-detects the target mode using the project root:

1. If `caspian.config.json` exists, it uses Python mode.
2. Else if `prisma-php.json` exists, it uses PHP mode.
3. Else it falls back to PHP mode.

Explicit examples:

```bash
npx ppicons add search --lang php
npx ppicons add search --lang py
```

## Generated output locations

By default, `ppicons` writes icon components into `src` based on the selected language mode.

| Mode              | Output directory  |
| ----------------- | ----------------- |
| Prisma PHP / PHPX | `src/Lib/PPIcons` |
| Caspian Python    | `src/lib/ppicons` |

The generator converts icon names to PascalCase component file names.

Examples:

- `search` -> `Search.php` or `Search.py`
- `chevron-right` -> `ChevronRight.php` or `ChevronRight.py`

## Using generated icons

### Prisma PHP / PHPX

Generated PHP icons are class-based components and are intended to be used with JSX-like tags.

```php
<?php

use Lib\PPIcons\Search;

?>

<Search />
<Search class="size-4" />
```

### Caspian

Generated Caspian icons are Python components and are intended to be used with JSX-like tags inside templates.

```html
<!-- @import { Search } from ../../lib/ppicons -->

<search />
<search class="size-4" />
```

Adjust the relative import path to match the location of the current template.

## AI-aware project files

Every successful `add` or `update` refreshes project metadata files that help editors, scripts, and AI tools understand the icon setup.

### `ppicons.json`

This file is the core machine-readable inventory. It includes:

- project type and language mode
- icon output directory
- supported `ppicons` commands
- remote catalog API endpoints
- installed icon inventory
- import entry metadata for the current project mode

Example:

```json
{
  "schemaVersion": 4,
  "generatedAt": "2026-04-19T00:00:00.000Z",
  "project": {
    "type": "prisma-php",
    "language": "php",
    "detectedBy": "prisma-php.json",
    "rootDirectory": ".",
    "sourceDirectory": "src",
    "iconsDirectory": "src/Lib/PPIcons",
    "copilotInstructionsFile": ".github/copilot-instructions.md",
    "agentsFile": "AGENTS.md"
  },
  "commands": {
    "addOne": "npx ppicons add <icon-name>",
    "addMany": "npx ppicons add <icon-a> <icon-b>",
    "addAll": "npx ppicons add --all",
    "updateInstalled": "npx ppicons update"
  },
  "catalogApi": {
    "listAll": {
      "method": "GET",
      "url": "https://ppicons.tsnc.tech/icons?icon=all",
      "returns": "IconRecord[]",
      "purpose": "List all available icons that can be installed."
    },
    "getOne": {
      "method": "GET",
      "urlTemplate": "https://ppicons.tsnc.tech/icons?icon=<icon-name>",
      "exampleUrl": "https://ppicons.tsnc.tech/icons?icon=search",
      "returns": "IconRecord",
      "purpose": "Fetch one icon by name before installing it."
    },
    "responseFields": {
      "id": "number",
      "name": "string",
      "componentName": "string",
      "svg": "string",
      "createdAt": "number",
      "updatedAt": "number"
    }
  }
}
```

### `.github/copilot-instructions.md`

This file is generated for GitHub Copilot. It includes:

- install commands for new icons
- icon discovery API guidance
- project-specific usage examples
- notes about the current icon directory and import entry

The `ppicons` section is managed automatically so it can be refreshed safely.

### `AGENTS.md`

This file is generated in the project root for AI agents that automatically read root-level instruction files.

It contains the same `ppicons` AI context as the Copilot instructions file, including install commands, discovery guidance, and rendering examples.

The `ppicons` section is also managed automatically so existing user-authored notes outside the managed block stay intact.

## Icon discovery API

If you need to know which icon names are available before installation, use the remote catalog API.

### Fetch all icons

```text
GET https://ppicons.tsnc.tech/icons?icon=all
```

This returns a JSON array of icon objects.

### Fetch one icon by name

```text
GET https://ppicons.tsnc.tech/icons?icon=search
```

This returns a single JSON object.

Example response:

```json
{
  "id": 166531,
  "name": "search",
  "componentName": "Search",
  "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-search\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>",
  "createdAt": 1774923647142,
  "updatedAt": 1774923647142
}
```

Fields:

- `id`: numeric record id
- `name`: icon name used by `ppicons add <name>`
- `componentName`: PascalCase component name that will be generated
- `svg`: raw SVG markup returned by the catalog
- `createdAt`: creation timestamp
- `updatedAt`: update timestamp

## Troubleshooting

### I wanted PHP mode but Caspian was detected

Force PHP output explicitly:

```bash
npx ppicons add search --lang php
```

### Existing files were not overwritten

Use `--force`:

```bash
npx ppicons add search --force
```

### `ppicons update` says no icon components were found

This means the target icon directory exists but no generated icon files matching the current language mode were found yet.

Run an `add` command first:

```bash
npx ppicons add search
```

### Network fetch failed

Check the following:

- internet access is available
- your firewall or proxy allows requests to `https://ppicons.tsnc.tech`
- the icon name exists in the remote catalog

## Contributing

Pull requests and issues are welcome.

If you change generation behavior, update the tests and keep the README aligned with the actual CLI behavior.

## License

Released under the MIT License.

## Author

The Steel Ninja Code  
[thesteelninjacode@gmail.com](mailto:thesteelninjacode@gmail.com)
