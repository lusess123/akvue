import {getFilesByDir} from "./../util/fileutil"
import * as appcontext from "./appcontext"
import * as path from "path"

export const getApps = () : string[] => {
    const _strs = getFilesByDir(path.resolve(appcontext.getBasePath, ".."));
    // var _package = require("./../../package.json"); var name = _package.name; var
    // version = _package.version; console.log(name + "   "+ version);

    return _strs.concat(getFilesByDir(path.resolve(appcontext.getBasePath, "..","apps","arwen"))).filter((str) => {
        if (str.toUpperCase().indexOf("AK-APP") == 0 ) {
            return true;
        }
    })
}