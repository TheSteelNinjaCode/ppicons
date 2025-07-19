#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = __importDefault(require("prompts"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const php_icon_1 = require("./generators/php-icon");
const php_icons_bulk_1 = require("./generators/php-icons-bulk");
/* ─────────────────────────────────────────────
 * 0.  Entrypoint
 * ──────────────────────────────────────────── */
(async () => {
    const args = process.argv.slice(2);
    const [command, ...rest] = args;
    if (command !== "add") {
        console.log(chalk_1.default.blue("Usage: ppicons add [--all] [--out <dir>] [--force] <icon…>"));
        process.exit(0);
    }
    /* ─────────────────────────────────────────────
     * 1.  Parse flags + nombres de iconos
     * ──────────────────────────────────────────── */
    const flags = { all: false, force: false, out: null };
    const iconNames = [];
    for (let i = 0; i < rest.length; i++) {
        const tok = rest[i];
        switch (tok) {
            case "--all":
                flags.all = true;
                break;
            case "--force":
                flags.force = true;
                break;
            case "--out":
                flags.out = rest[++i] ?? null; // recibe argumento de ruta
                break;
            default:
                iconNames.push(tok);
        }
    }
    /* ─────────────────────────────────────────────
     * 2.  Resolver directorio destino (siempre ↓ src/)
     * ──────────────────────────────────────────── */
    const projectRoot = process.cwd(); // raíz del paquete
    const srcPath = path_1.default.resolve(projectRoot, "src"); // carpeta "src"
    function resolveTargetDir(out) {
        // a) Sin --out →  valor por defecto
        if (!out)
            return path_1.default.join(srcPath, "Lib/PPIcons");
        const outNorm = path_1.default.normalize(out);
        // b) Ruta absoluta → usar tal cual (se validará debajo)
        if (path_1.default.isAbsolute(outNorm))
            return outNorm;
        // c) Ruta relativa
        const firstSeg = outNorm.split(path_1.default.sep)[0];
        if (firstSeg === "src") {
            //  c1) El usuario ya incluye "src/…"  → concat a projectRoot
            return path_1.default.join(projectRoot, outNorm);
        }
        //  c2) El usuario omite "src/"          → anidar dentro de src/
        return path_1.default.join(srcPath, outNorm);
    }
    const targetDir = resolveTargetDir(flags.out);
    /* ─── Validaciones ────────────────────────── */
    const insideSrc = targetDir === srcPath || targetDir.startsWith(srcPath + path_1.default.sep);
    if (!insideSrc) {
        console.error(chalk_1.default.red("✖  --out debe ser una ruta dentro de «src»."));
        process.exit(1);
    }
    if (targetDir === srcPath) {
        console.error(chalk_1.default.red("✖  No se puede generar directamente en «src». Usa un sub‑directorio."));
        process.exit(1);
    }
    /* ─────────────────────────────────────────────
     * 3.  Generación (bulk o individual)
     * ──────────────────────────────────────────── */
    try {
        /* -------- bulk (--all) -------- */
        if (flags.all) {
            const { ok, fail } = await (0, php_icons_bulk_1.generateAllIcons)(targetDir, flags.force);
            console.log(chalk_1.default.green(`\n✔ Generated ${ok.length} icons in ${path_1.default.relative(projectRoot, targetDir)}`));
            if (fail.length) {
                console.log(chalk_1.default.red(`✖ Failed ${fail.length}`));
                fail.forEach((m) => console.log("  •", m));
            }
            process.exit(fail.length ? 1 : 0);
        }
        /* -------- uno / varios nombres -------- */
        if (iconNames.length === 0) {
            const { iconList } = await (0, prompts_1.default)({
                type: "text",
                name: "iconList",
                message: "Which icons do you want? (space or comma)",
                validate: (v) => (v.trim() ? true : "Enter at least one name"),
            });
            iconNames.push(...iconList.split(/[\s,]+/));
        }
        for (const name of iconNames) {
            const savedAbs = await (0, php_icon_1.generateIcon)(name, targetDir, flags.force);
            const relPath = path_1.default.relative(projectRoot, savedAbs).replace(/\\/g, "/");
            console.log(chalk_1.default.green(`✔ ${name} → ${relPath}`));
        }
    }
    catch (err) {
        console.error(chalk_1.default.red("✖ Error:"), err.message);
        process.exit(1);
    }
})();
