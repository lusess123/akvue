import  * as ff from "./fileutil"


describe("aaa",()=>{

    it('ggg', () => {
        console.log(ff.getStringByFileName(__filename));
         expect(  ff.ggg(123)).toBe(123);
    });
});