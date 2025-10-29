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
        throw new Error(`The target directory must be inside "src". Received: ${targetDir}`);
    }
    if (rel === "") {
        throw new Error(`Cannot generate directly in "src". Use a subdirectory such as "src/Lib/PPIcons".`);
    }
    return rel.split(path_1.default.sep).join("\\"); // e.g. "Lib\\PPIcons"
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
        // Only touch the outer <svg> tag
        .replace(/<svg\b([^>]*)>/, (_, attrs) => {
        const cleaned = attrs.replace(/\s(?:width|height|class)="[^"]*"/g, "");
        return `<svg${cleaned} {$attributes}>`;
    })
        // Expand common self-closing SVG elements
        .replace(/<(rect|path|circle|line|polyline|polygon|ellipse)\b([^>]*)\/>/g, "<$1$2></$1>");
    const content = stub
        .replace(/__NAMESPACE__/g, namespace)
        .replace(/__COMPONENT_NAME__/g, component)
        .replace(/__SVG_CODE__/g, svgClean);
    await fs_extra_1.default.ensureDir(path_1.default.dirname(filePath));
    await fs_extra_1.default.writeFile(filePath, content, "utf8");
    return filePath;
}
