import efs from "fs-extra";

export const getStringByFileName = (fileName: string): string => {
   const _res = efs.readFileSync(fileName, { encoding: "utf-8" });
    return  _res ;
}

export const ggg =(a)=>{
    return a ;
}