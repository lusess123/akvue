import { getFilesByDir } from "./../util/fileutil"
import *  as appcontext from "./appcontext"
import * as path from "path"

export const getApps = (): string[] => {
    const _strs = getFilesByDir(path.resolve(appcontext.getBasePath, ".."));
    return _strs.filter((str) => {
        if (str.toUpperCase().indexOf("AK-APP") == 0) {
            return true;
        }
    })
}