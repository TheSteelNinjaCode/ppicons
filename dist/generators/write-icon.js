"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNamespace = buildNamespace;
exports.writeIcon = writeIcon;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const change_case_1 = require("change-case");
function buildNamespace(targetDir) {
    const projectRoot = process.cwd();
    const srcPath = path_1.default.resolve(projectRoot, "src");
    const rel = path_1.default.relative(srcPath, targetDir);
    if (rel.startsWith("..") || path_1.default.isAbsolute(rel)) {
        throw new Error(`The target directory must be inside "src". ` +
            `Received path: ${targetDir}`);
    }
    // 2) Is it pointing exactly to "src"? (empty namespace) → explicit error
    if (rel === "") {
        throw new Error(`Cannot generate directly in "src". ` +
            `Please specify a subdirectory like "src/Lib/PPIcons".`);
    }
    return rel
        .split(path_1.default.sep)
        .map((seg) => (0, change_case_1.pascalCase)(seg))
        .join("\\"); // "Lib\\PPIcons"
}
async function writeIcon(iconJson, targetDir, stubPath, force = false) {
    const component = (0, change_case_1.pascalCase)(iconJson.componentName || iconJson.name);
    const filePath = path_1.default.join(targetDir, `${component}.php`);
    const namespace = buildNamespace(targetDir);
    if (!force && (await fs_extra_1.default.pathExists(filePath))) {
        return filePath;
    }
    const stub = await fs_extra_1.default.readFile(stubPath, "utf8");
    const svgClean = iconJson.svg
        .replace(/\sclass="[^"]*"/, "")
        .replace("<svg ", '<svg class="{$class}" {$attributes} ');
    const content = stub
        .replace(/__NAMESPACE__/g, namespace)
        .replace(/__COMPONENT_NAME__/g, component)
        .replace(/__SVG_CODE__/g, svgClean);
    await fs_extra_1.default.ensureDir(path_1.default.dirname(filePath));
    await fs_extra_1.default.writeFile(filePath, content, "utf8");
    return filePath;
}
