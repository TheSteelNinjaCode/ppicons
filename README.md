# ppicons

Generate reusable icon components for Prisma PHP and Caspian projects from the terminal.

`ppicons` downloads icon definitions from the remote catalog, normalizes the SVG, writes framework-native component files, and refreshes project metadata that documents the installed icon set.

The current component contract is HTML-first usage with `x-` tags:

```html
<x-search /> <x-arrow-right class="size-4" />
```

## What it does

- Generates PHP icon components for Prisma PHP projects.
- Generates Python icon components for Caspian projects.
- Supports single-icon installs, multi-icon installs, and full-catalog generation.
- Updates already-installed icons by reading the generated component filenames.
- Refreshes `ppicons.json` and `.github/instructions/ppicons.instructions.md` after successful add or update runs.
- Keeps generated icon usage aligned with HTML-first `x-` tag output.

## Requirements

- Node.js 18+
- Network access to `https://ppicons.tsnc.tech`
- A target project with either `prisma-php.json` or `caspian.config.json` when using auto-detection

## Install

Global install:

```bash
npm install -g ppicons
```

Local dev dependency:

```bash
npm install -D ppicons
```

## CLI

Usage:

```bash
ppicons <command> [--all] [--lang py|php] [--force] [icon...]
```

Commands:

- `add` installs one or more new icons.
- `update` refreshes icons already present in the default generated directory.

Examples:

```bash
npx ppicons add search
npx ppicons add search user settings
npx ppicons add --all
npx ppicons add search --force
npx ppicons update
```

## Flags

| Flag         | Description                                     |
| ------------ | ----------------------------------------------- |
| `--all`      | Generate every icon available from the catalog. |
| `--force`    | Overwrite existing generated files.             |
| `--lang php` | Force Prisma PHP output.                        |
| `--lang py`  | Force Caspian Python output.                    |

## Language detection

If `--lang` is not passed, `ppicons` resolves the output mode from the current project root:

1. If `caspian.config.json` exists, it uses Python mode.
2. Else if `prisma-php.json` exists, it uses PHP mode.
3. Else it falls back to PHP mode.

Examples:

```bash
npx ppicons add search --lang php
npx ppicons add search --lang py
```

## Generated output

`ppicons` writes generated icons into the `src` tree of the current project.

| Mode       | Output directory  | File pattern                          |
| ---------- | ----------------- | ------------------------------------- |
| Prisma PHP | `src/Lib/PPIcons` | `src/Lib/PPIcons/<ComponentName>.php` |
| Caspian    | `src/lib/ppicons` | `src/lib/ppicons/<ComponentName>.py`  |

Component file names are PascalCase, while runtime usage stays kebab-case with the `x-` prefix.

Examples:

- `search` becomes `Search.php` or `Search.py`
- `arrow-right` becomes `ArrowRight.php` or `ArrowRight.py`
- usage becomes `<x-search />` or `<x-arrow-right />`

## Using generated icons

Generated icons are consumed as HTML-first `x-` components.

### Prisma PHP

Import the generated classes into the PHP file, then render the icon with the `x-` tag.

```php
<?php

use Lib\PPIcons\Search;
use Lib\PPIcons\ArrowRight;

?>

<x-search />
<x-arrow-right class="size-4" />
```

When multiple icons come from the same generated namespace, grouped imports are preferred:

```php
<?php

use Lib\PPIcons\{ArrowRight, Mail, UserRound};

?>

<div>
    <x-mail class="size-4" />
    <x-user-round class="size-4" />
    <x-arrow-right class="size-4" />
</div>
```

### Caspian

Import the generated components in the template, then render them with the same `x-` tags.

```html
<!-- @import { Search, ArrowRight } from ../../lib/ppicons -->

<x-search />
<x-arrow-right class="size-4" />
```

Adjust the relative import path so it points to `src/lib/ppicons` from the current template.

## Metadata files

Every successful `add` or `update` refreshes two project files.

### `ppicons.json`

This is the machine-readable manifest for the installed icon set. It includes:

- `schemaVersion: 6`
- detected project type, framework, language, and config file
- generated component and icon directories
- canonical command strings for add/update workflows
- remote catalog API metadata
- usage metadata for the current target
- the installed icon inventory

Example:

```json
{
  "schemaVersion": 6,
  "generatedAt": "2026-04-28T00:00:00.000Z",
  "project": {
    "type": "prisma-php",
    "framework": "prisma-php",
    "language": "php",
    "detectedBy": "prisma-php.json",
    "rootDirectory": ".",
    "sourceDirectory": "src",
    "configFile": "prisma-php.json",
    "manifestFile": "ppicons.json",
    "componentsDirectory": "src/Lib/PPIcons",
    "iconsDirectory": "src/Lib/PPIcons",
    "copilotInstructionsFile": ".github/instructions/ppicons.instructions.md"
  },
  "commands": {
    "addOne": "npx ppicons add <icon-name>",
    "addMany": "npx ppicons add <icon-a> <icon-b>",
    "addAll": "npx ppicons add --all",
    "updateInstalled": "npx ppicons update"
  },
  "usage": {
    "componentType": "class",
    "entryStyle": "namespace",
    "entry": "Lib\\PPIcons",
    "filePattern": "src/Lib/PPIcons/<ComponentName>.php",
    "syntax": "jsx-like component tags"
  },
  "icons": [
    {
      "name": "search",
      "componentName": "Search",
      "file": "src/Lib/PPIcons/Search.php"
    }
  ]
}
```

### `.github/instructions/ppicons.instructions.md`

This is the generated Copilot instruction file for projects using `ppicons`. It is refreshed from the current manifest and includes:

- install commands for missing icons
- catalog lookup guidance
- project-specific usage examples
- current icon directory and import-entry metadata
- HTML-first `x-` tag examples aligned with generated usage

`ppicons` writes this generated Copilot context file under `.github/instructions/ppicons.instructions.md` and refreshes it from the current manifest.

## Catalog API

The CLI reads icon data from the remote catalog.

Fetch all icons:

```text
GET https://ppicons.tsnc.tech/icons?icon=all
```

Fetch one icon:

```text
GET https://ppicons.tsnc.tech/icons?icon=search
```

Single icon response shape:

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

This means the target icon directory exists but no generated files for the current language mode were found yet.

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

If you change generator behavior, keep the generated contract aligned across the repo.

- update the generator source in `src/`
- update the matching tests in `tests/`
- update this README when CLI behavior, output paths, or usage examples change
- update committed `dist/` output so the published package matches the documented generator behavior

## License

Released under the MIT License.

## Author

The Steel Ninja Code  
[thesteelninjacode@gmail.com](mailto:thesteelninjacode@gmail.com)
