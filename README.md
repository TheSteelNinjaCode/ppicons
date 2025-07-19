# **ppicons‑cli** — Instant PHPX Icon Generator 🚀

> **Generate fully‑typed PHPX icon components straight from the terminal.**
>
> ⚡ **Single icon** → `npx ppicons add anchor`    |    🌌 **Whole library** → `npx ppicons add --all`

---

## ✨ Features

| Feature               | Details                                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Bulk install**      | `--all` downloads **1 500+** icons in a single compressed request.                                                         |
| **SVG → PHPX stub**   | Replaces the native `class` attribute with `{$class}` and injects `{$attributes}` for Wave reactivity.                     |
| **Clean PSR‑4 paths** | Files are written under `src/…` and their namespace is **auto‑derived** from the folder path, ready for Composer autoload. |
| **Autoload‑safe**     | The generator refuses to write outside `src/`, so you’ll never break your PSR‑4 mapping by mistake.                        |
| **Friendly output**   | Clear green / red summary with relative paths only.                                                                        |
| **Cross‑platform**    | Works equally on Windows, macOS and Linux.                                                                                 |

---

## 📦 Installation

```bash
# Global
npm install -g ppicons

# Or as a dev dependency
npm install -D ppicons
```

> **Requirements**
> • **Node 18+**
> • A **Prisma PHP** project (PHP 8.2+) with the default `src/` directory mapped in `composer.json`.

---

## 🚀 Quick Start

```bash
# Add a single icon
npx ppicons add amphora

# Add multiple icons at once
npx ppicons add anchor globe rocket

# Add the entire icon set (≈ 1 500 icons)
npx ppicons add --all
```

Typical output:

```bash
✔ anchor  → src/Lib/PPIcons/Anchor.php
✔ globe   → src/Lib/PPIcons/Globe.php
✔ rocket  → src/Lib/PPIcons/Rocket.php
```

Every generated component is ready to drop into your templates:

```php
<?php
namespace Lib\PPIcons;

use Lib\PHPX\PHPX;

class Anchor extends PHPX
{
    public function render(): string
    {
        $attributes = $this->getAttributes();
        $class      = $this->getMergeClasses();

        return <<<HTML
        <svg {$attributes} class="{$class}" viewBox="0 0 24 24">…</svg>
        HTML;
    }
}
```

---

## 🔧 CLI Options

| Flag / Arg    | Description                                                                                                                         |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `<icon …>`    | One or more icon names separated by space or comma.                                                                                 |
| `--all`       | Download the full catalogue in one request.                                                                                         |
| `--out <dir>` | Destination **inside `src/`**.<br>Relative paths like `Lib/UI/Icons` or `src/Lib/UI/Icons` are accepted.<br>Default: `Lib/PPIcons`. |
| `--force`     | Overwrite existing files.                                                                                                           |

### How `--out` works

| Command example              | Destination path        | Resulting namespace |
| ---------------------------- | ----------------------- | ------------------- |
| _(no flag)_                  | `src/Lib/PPIcons/`      | `Lib\PPIcons`       |
| `--out Lib/UI/Icons`         | `src/Lib/UI/Icons/`     | `Lib\UI\Icons`      |
| `--out src/Lib/Custom/Icons` | `src/Lib/Custom/Icons/` | `Lib\Custom\Icons`  |

If the target directory resolves **outside `src/`**, the CLI aborts with:

```
✖  --out must point to a folder inside «src».
```

---

## 🛠️ Troubleshooting

| Symptom                              | Likely cause & fix                                                        |
| ------------------------------------ | ------------------------------------------------------------------------- |
| _Undefined class_ in IDE after run   | Run `composer dump‑autoload` so Composer discovers the new namespaces.    |
| CLI exits with “outside «src»” error | Adjust `--out` or move your project’s PSR‑4 root back to `src/`.          |
| Same icon shows “skipped”            | Use `--force` to overwrite, or delete the file manually before re‑adding. |

---

## 📚 Further Reading

Full docs & live preview at **[ppicons.tsnc.tech](https://ppicons.tsnc.tech/)**.

---

## 💡 Contributing

Pull requests are warmly welcome. Please open an issue before large changes so we can discuss the approach.

---

## 📄 License

Released under the **MIT License**.

---

## 👤 Author

**The Steel Ninja Code** — empowering PHP developers one package at a time.
✉︎ [thesteelninjacode@gmail.com](mailto:thesteelninjacode@gmail.com)
