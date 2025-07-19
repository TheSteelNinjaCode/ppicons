"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAllIcons = generateAllIcons;
const node_fetch_1 = __importDefault(require("node-fetch"));
const write_icon_1 = require("./write-icon");
const stub_path_1 = require("../utils/stub-path");
const BULK_URL = "https://ppicons.tsnc.tech/icons?icon=all";
/** Descarga el array y escribe todos los iconos */
async function generateAllIcons(targetDir, force = false) {
    const res = await (0, node_fetch_1.default)(BULK_URL);
    if (!res.ok)
        throw new Error(`Could not fetch list: ${res.statusText} – ${BULK_URL}`);
    const icons = (await res.json());
    console.log(`➡  Recibidos ${icons.length} iconos. Generando…`);
    const ok = [];
    const fail = [];
    /** Pequeña cola de concurrencia para no saturar el FS */
    const BATCH = 10;
    let queue = [];
    for (const icon of icons) {
        const job = (0, write_icon_1.writeIcon)(icon, targetDir, stub_path_1.STUB_PATH, force)
            .then((file) => ok.push(file))
            .catch((e) => fail.push(`${icon.name}: ${e.message}`));
        queue.push(job);
        if (queue.length >= BATCH) {
            await Promise.allSettled(queue);
            queue = [];
        }
    }
    await Promise.allSettled(queue);
    return { ok, fail };
}
