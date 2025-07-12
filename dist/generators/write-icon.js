"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeIcon = writeIcon;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const change_case_1 = require("change-case");
/** Escribe un icono a disco a partir del JSON recibido del servidor */
async function writeIcon(iconJson, targetDir, stubPath, force = false) {
    const component = (0, change_case_1.pascalCase)(iconJson.componentName || iconJson.name);
    const filePath = path_1.default.join(targetDir, `${component}.php`);
    if (!force && (await fs_extra_1.default.pathExists(filePath))) {
        // skip quietly
        return filePath;
    }
    const stub = await fs_extra_1.default.readFile(stubPath, "utf8");
    const content = stub
        .replace(/__COMPONENT_NAME__/g, component)
        .replace(/__SVG_CODE__/g, iconJson.svg
        .replace(/\sclass="[^"]*"/, "")
        .replace("<svg ", '<svg class="{$class}" {$attributes} '));
    await fs_extra_1.default.ensureDir(path_1.default.dirname(filePath));
    await fs_extra_1.default.writeFile(filePath, content, "utf8");
    return filePath;
}
