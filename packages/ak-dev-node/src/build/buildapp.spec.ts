import * as buildapp from "./buildapp"


describe("buildapp   app构建类",()=>{
  it("getapps ",()=>{

      const _res = buildapp.getApps();
      console.log(_res);
      expect(_res).toContain("ak-app-sdk");
    })
});