"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const efs = require("fs-extra");
exports.getStringByFileName = (fileName) => {
    const _res = efs.readFileSync(fileName, { encoding: "utf-8" });
    return _res;
};
exports.getFilesByDir = (dirPath) => {
    return efs.readdirSync(dirPath);
};
