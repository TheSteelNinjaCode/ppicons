# **ppicons-cli** — Icon Components for **Prisma PHP** and **Caspian Python**

Generate ready-to-use icon components (PHPX for PHP, and Python components for Caspian) directly from the terminal—no manual SVG copy/paste, no inconsistent markup, no “where did this icon come from?” drift.

> Single icon: `npx ppicons add anchor`  
> Full library: `npx ppicons add --all`  
> Update existing icons: `npx ppicons update`

---

## Why this exists

When you build UI systems (Prisma PHP / PHPXUI, or Caspian’s HTML-first Python stack), icons tend to become a maintenance tax:

- SVGs copied from random sources end up inconsistent (attributes, sizing, classes).
- Designers/devs tweak icons inline and the changes are never reusable.
- Autocomplete and static analysis can’t help you when icons are plain strings.

**ppicons-cli** turns icons into **first-class components** so your UI stays consistent and your DX improves immediately.

---

## Features

| Capability                 | What you get                                                                                 |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| **Single icon generation** | `ppicons add <name>` downloads and writes one component file.                                |
| **Bulk generation**        | `--all` generates the entire icon set in one run.                                            |
| **Update icons**           | `ppicons update` refreshes existing generated icons safely.                                  |
| **Dual language support**  | **PHP mode** (Prisma PHP / PHPX) and **Python mode** (Caspian).                              |
| **Auto-detect language**   | Detects project type automatically: `caspian.config.json` → Python, `prisma-php.json` → PHP. |
| **Force overwrite**        | `--force` overwrites existing files when explicitly requested.                               |
| **Clean component names**  | Converts icon names to **PascalCase** (e.g. `chevron-right` → `ChevronRight`).               |
| **SVG normalization**      | Injects dynamic attributes and normalizes common SVG quirks.                                 |

---

## Requirements

- Node.js (recommended: modern LTS)
- Network access to fetch icons from the upstream endpoint used by the CLI

---

## Quick start

### Generate a single icon

```bash
npx ppicons add anchor
```

### Generate the full icon library

```bash
npx ppicons add --all
```

### Update previously generated icons

```bash
npx ppicons update
```

### Force overwrite

```bash
npx ppicons add anchor --force
npx ppicons add --all --force
```

---

## Language selection (PHP vs Python)

The CLI supports:

- `--lang php` → generate **PHPX** components (Prisma PHP ecosystem)
- `--lang py` → generate **Python** components (Caspian ecosystem)

### Auto-detection

If you do **not** pass `--lang`, ppicons-cli attempts to pick the right mode:

1. If `caspian.config.json` exists in the project root → **Python mode**
2. Else if `prisma-php.json` exists in the project root → **PHP mode**
3. Else → defaults to **PHP mode**

This makes it seamless to use inside Caspian projects without extra flags.

### Explicit mode examples

```bash
# Force Python output
npx ppicons add user --lang py

# Force PHP output
npx ppicons add user --lang php
```

---

## Usage reference

```bash
npx ppicons add <icon-name> [--all] [--force] [--lang php|py]
```

### Flags

- `--all` — generate all icons
- `--force` — overwrite existing files
- `--lang php|py` — explicitly choose output language

---

## Using the generated icons

Because the generated artifacts are **real components**, you get:

- consistent sizing and attribute handling
- editor support (rename, search, “go to definition”, etc.)
- fewer UI regressions from inconsistent SVG markup

### Python (Caspian)

Icons are generated as `.py` modules using PascalCase filenames.

Typical usage:

- treat the icon as a component/function
- pass standard attributes (class, width/height, etc.) via the component’s attribute mechanism

### PHP (Prisma PHP / PHPX)

Icons are generated as PHPX-compatible components with namespaces derived from the folder structure.

The stub is designed so icons behave like standard PHPX components and accept attributes cleanly.

---

## Troubleshooting

### “Detected caspian.config.json: Using Python mode” but I wanted PHP

Pass `--lang php` explicitly:

```bash
npx ppicons add anchor --lang php
```

### My icons didn’t overwrite

Use `--force`:

```bash
npx ppicons add --all --force
```

### Network errors fetching icons

Confirm:

- you have internet access
- your firewall/proxy allows Node fetch requests
- the icon name exists upstream

---

## 👤 Author

**The Steel Ninja Code**  
✉︎ [thesteelninjacode@gmail.com](mailto:thesteelninjacode@gmail.com)

## License

Released under the **MIT License**.
