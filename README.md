# **ppicons-cli** — Instant PHPX Icon Generator 🚀

> **Generate fully‑typed PHPX icon components straight from the terminal.**
> ⚡ **Single icon** → `npx ppicons add anchor`   |   🌌 **Whole library** → `npx ppicons add --all`

---

## ✨ Features

| Feature             | Details                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| **Bulk install**    | `--all` downloads >1 500 icons in a single compressed request.                                         |
| **SVG → PHPX stub** | Replaces the native `class` attribute with `{$class}` and injects `{$attributes}` for Wave reactivity. |
| **Clean paths**     | Files are created under `src/Lib/PPIcons/FancyName.php` with OS‑agnostic separators.                   |
| **Friendly output** | Clear green/red summary, relative paths only.                                                          |
| **Cross‑platform**  | Runs equally on Windows, macOS and Linux.                                                              |

---

## 📦 Installation

```bash
# Global
npm install -g ppicons-cli

# Or as a devDependency
npm install -D ppicons-cli
```

> Requires **Node 18+** and a Prisma PHP project (PHP 8.2+).

---

## 🚀 Quick Start

```bash
# Add a single icon
npx ppicons add amphora

# Add multiple icons at once
npx ppicons add anchor globe rocket

# Add the entire icon set (≈ 1 500+)
npx ppicons add --all
```

CLI output example:

```bash
✔ anchor  → src/Lib/PPIcons/Anchor.php
✔ globe   → src/Lib/PPIcons/Globe.php
✔ rocket  → src/Lib/PPIcons/Rocket.php
```

Each generated file looks like this:

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
        <svg {$attributes} class="{$class}" viewBox="0 0 24 24" …>…</svg>
        HTML;
    }
}
```

---

## 🔧 CLI Options

| Flag / Argument | Description                                         |
| --------------- | --------------------------------------------------- |
| `<icon …>`      | One or more icon names separated by space or comma. |
| `--all`         | Download the full catalogue in one request.         |
| `--out <dir>`   | Destination folder (default `src/Lib/PPIcons`).     |
| `--force`       | Overwrite existing files.                           |

## 📚 Documentation

For comprehensive guides and full documentation, visit the [ppicons](https://ppicons.tsnc.tech/) website

## 💡 Contributing

We welcome contributions to improve `ppicons`. If you have ideas, found bugs, or want to make improvements, feel free to open an issue or submit a pull request on the repository.

---

## 📄 License

`ppicons` is under the MIT License. See LICENSE for details.

## 👤 Author

This project is developed and maintained by [The Steel Ninja Code](https://thesteelninjacode.com/), continuously pushing the boundaries of PHP development.

## 📧 Contact Us

Got questions or feedback? Reach out to us at [thesteelninjacode@gmail.com](mailto:thesteelninjacode@gmail.com). We’d love to hear from you!
