"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIcon = generateIcon;
const node_fetch_1 = __importDefault(require("node-fetch"));
const write_icon_1 = require("./write-icon");
const stub_path_1 = require("../utils/stub-path");
const SINGLE_URL = "https://ppicons.tsnc.tech/icons";
async function generateIcon(iconName, targetDir, force = false) {
    const url = `${SINGLE_URL}?icon=${encodeURIComponent(iconName)}`;
    const res = await (0, node_fetch_1.default)(url);
    if (!res.ok)
        throw new Error(`No se pudo obtener "${iconName}": ${res.status} – ${url}`);
    const iconJson = (await res.json());
    return (0, write_icon_1.writeIcon)(iconJson, targetDir, stub_path_1.STUB_PATH, force);
}
