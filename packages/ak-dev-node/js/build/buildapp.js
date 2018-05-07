"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileutil_1 = require("./../util/fileutil");
const appcontext = require("./appcontext");
const path = require("path");
exports.getApps = () => {
    const _strs = fileutil_1.getFilesByDir(path.resolve(appcontext.getBasePath, ".."));
    return _strs.filter((str) => {
        if (str.toUpperCase().indexOf("AK-APP") == 0) {
            return true;
        }
    });
};
