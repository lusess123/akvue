import  * as ff from "./fileutil"
import * as path from "path"
import * as appcontext from "./../build/appcontext"


describe("fileutil 文件操作工具类",()=>{

    it('文件文本读取', () => {
        
        const _path =   path.resolve(appcontext.getBasePath,"src/test/fixtures/file.json");
        const _res =   ff.getStringByFileName(_path);
        console.log(_res);
         expect(  _res.trim()).toBe("123");
    }); 

    it('getFilesByDir',()=>{
        const _path =   path.resolve("./src/test/fixtures/");
        const _res =   ff.getFilesByDir(_path);
        expect(  _res[0]).toBe('file.json');
    })
});