import efs from "fs-extra";
export const getStringByFileName = (fileName) => {
    efs.readFileSync(fileName, { encoding: "utf-8" });
    return "";
};
export const ggg = (a) => {
    return a;
};
