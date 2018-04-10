import  * as ff from "./fileutil"
import * as path from "path"


describe("fileutil 文件操作工具类",()=>{

    it('文件文本读取', () => {
        
        const _path =   path.resolve("./src/test/fixtures/file.json");
        const _res =   ff.getStringByFileName(_path);
        console.log(_res);
         expect(  _res.trim()).toBe("123");
    }); 
});