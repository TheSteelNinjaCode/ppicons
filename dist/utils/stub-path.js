"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STUB_PATH = void 0;
const path_1 = __importDefault(require("path"));
/**
 * Absolute path to templates/icon.stub.php inside this package.
 * Works in dev (src) and after build (dist).
 */
exports.STUB_PATH = path_1.default.resolve(__dirname, "../templates/icon.stub.php");
