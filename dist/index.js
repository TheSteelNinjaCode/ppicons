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
(async () => {
    const args = process.argv.slice(2);
    const [command, ...rest] = args;
    if (command !== "add") {
        console.log(chalk_1.default.blue("Usage: ppicons add [--all] [--out <dir>] [--force] <icon…>"));
        process.exit(0);
    }
    /* ---------- parse flags & names ---------- */
    const flags = { all: false, force: false, out: null };
    const names = [];
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
                flags.out = rest[++i] || null;
                break;
            default:
                names.push(tok);
        }
    }
    /* ---------- destination directory ---------- */
    const targetDir = path_1.default.resolve(flags.out ?? "src/Lib/PPIcons");
    try {
        /* -------- bulk mode -------- */
        if (flags.all) {
            const { ok, fail } = await (0, php_icons_bulk_1.generateAllIcons)(targetDir, flags.force);
            console.log(chalk_1.default.green(`\n✔ Generated ${ok.length} icons in ${path_1.default.relative(process.cwd(), targetDir)}`));
            if (fail.length) {
                console.log(chalk_1.default.red(`✖ Failed ${fail.length}`));
                fail.forEach((m) => console.log("  •", m));
            }
            process.exit(fail.length ? 1 : 0);
        }
        /* -------- single / multiple names -------- */
        if (names.length === 0) {
            const { iconList } = await (0, prompts_1.default)({
                type: "text",
                name: "iconList",
                message: "Which icons do you want? (space or comma)",
                validate: (v) => (v.trim() ? true : "Enter at least one name"),
            });
            names.push(...iconList.split(/[\s,]+/));
        }
        for (const name of names) {
            const savedAbs = await (0, php_icon_1.generateIcon)(name, targetDir, flags.force);
            const rel = path_1.default.relative(process.cwd(), savedAbs).replace(/\\/g, "/");
            console.log(chalk_1.default.green(`✔ ${name} → ${rel}`));
        }
    }
    catch (err) {
        console.error(chalk_1.default.red("✖ Error:"), err.message);
        process.exit(1);
    }
})();
