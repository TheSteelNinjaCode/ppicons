# **ppicons-cli** — Icon Components for **Prisma PHP** and **Caspian Python**

Generate ready-to-use icon components (PHPX for PHP, and Python components for Caspian) directly from the terminal—no manual SVG copy/paste, no inconsistent markup, no “where did this icon come from?” drift.

> Single icon: `npx ppicons add anchor`  
> Full library: `npx ppicons add --all`

---

## Why this exists

When you build UI systems (Prisma PHP / PHPXUI, or Caspian’s HTML-first Python stack), icons tend to become a maintenance tax:

- SVGs copied from random sources end up inconsistent (attributes, sizing, classes).
- Designers/devs tweak icons inline and the changes are never reusable.
- Autocomplete and static analysis can’t help you when icons are plain strings.

**ppicons-cli** turns icons into **first-class components** so your UI stays consistent and your DX improves immediately.

---

## Features

| Capability                 | What you get                                                                                   |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| **Single icon generation** | `ppicons add <name>` downloads and writes one component file.                                  |
| **Bulk generation**        | `--all` generates the entire icon set in one run (hundreds / thousands depending on upstream). |
| **Dual language support**  | **PHP mode** (Prisma PHP / PHPX) and **Python mode** (Caspian).                                |
| **Auto-detect language**   | Detects project type automatically: `caspian.config.json` → Python, `prisma-php.json` → PHP.   |
| **Force overwrite**        | `--force` overwrites existing files safely when you want to refresh.                           |
| **Clean component names**  | Converts icon names to **PascalCase** (e.g. `chevron-right` → `ChevronRight`).                 |
| **SVG normalization**      | Injects dynamic attributes and normalizes common SVG quirks (safer parsing / rendering).       |

---

## Requirements

- Node.js (recommended: modern LTS)
- Network access to fetch icons from the upstream endpoint used by the CLI

---

## Quick start

### 1) Generate a single icon

```bash
npx ppicons add anchor
```

### 2) Generate the full icon library

```bash
npx ppicons add --all
```

### 3) Overwrite existing icons

```bash
npx ppicons add anchor --force
# or
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

## Output paths and project-safe defaults

### Default output locations

If you do not pass `--out`:

- **PHP mode** writes to: `src/Lib/PPIcons/`
- **Python mode** writes to: `src/lib/ppicons/`

### Custom output directory

Use `--out` to control where generated files land.

```bash
# PHP: relative to src/ by default
npx ppicons add anchor --lang php --out Lib/UI/Icons

# PHP: explicit src/ path also supported
npx ppicons add anchor --lang php --out src/Lib/Custom/Icons

# Python: relative to project root
npx ppicons add anchor --lang py --out src/app/icons
```

### Important safety rules

- **PHP mode** requires `--out` to resolve **inside `src/`**.  
  This prevents breaking PSR-4 mappings by accidentally writing outside your autoload root.
- The generator refuses to write directly into `src/` (choose a subfolder).

If you violate the PHP constraint, the CLI exits with a clear error.

---

## Usage reference

```bash
npx ppicons add <icon-name> [--all] [--force] [--lang php|py] [--out <path>]
```

### Flags

- `--all` — generate all icons
- `--force` — overwrite existing files
- `--lang php|py` — explicitly choose output language
- `--out <path>` — output directory (see rules above)

---

## Using the generated icons

Because the generated artifacts are **real components**, you get:

- consistent sizing and attribute handling
- editor support (rename, search, “go to definition”, etc.)
- fewer UI regressions from inconsistent SVG markup

### Python (Caspian)

Icons are generated as `.py` modules using PascalCase filenames, under the Python default folder (`src/lib/ppicons/`) unless overridden.

Typical imports depend on your project’s Python import path setup, but the intended usage is:

- treat the icon as a component/function
- pass standard attributes (class, width/height, etc.) via the component’s attribute mechanism defined by your stub

### PHP (Prisma PHP / PHPX)

Icons are generated into `src/Lib/PPIcons/` (unless overridden) with a namespace derived from the folder structure.

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

The CLI fetches icon JSON from the upstream endpoint. Confirm:

- you have internet access
- your firewall/proxy allows Node fetch requests
- the icon name exists upstream

---

## 👤 Author

**The Steel Ninja Code** — empowering PHP developers one package at a time.
✉︎ [thesteelninjacode@gmail.com](mailto:thesteelninjacode@gmail.com)

## License

Released under the **MIT License**.
