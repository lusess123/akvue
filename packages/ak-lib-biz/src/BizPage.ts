

import { core, ioc, vue, util } from "ak-lib-sys/src";
import { BasePage } from "ak-lib-web/src/basepage";
import { ISource } from "./source/isource";


@vue.com(`<div>BizPage</div>`)
@ioc.PlugIn({ RegName: "ak-lib-bizPage", BaseType: "IPage", CreateDate: "2018-02-05", Doc: "ak-lib-biz页面插件" })
export class BizPage extends BasePage {

    public Title: string = "ak-lib-biz";
    protected Source: ISource  = null;
    public PageStyle :string = null;

    public reset(pagename: any, p1: any, p2: any, p3: any){
           super.reset(pagename,p1,p2,p3);
           let _sourceName = this.P1;
           _sourceName = _sourceName ? _sourceName : "BaseSource";
   
           const _source = ioc.Ioc.Current().FetchInstance<ISource>(_sourceName, "ISource");
          // _source.initData();
           this.Source = _source ;

           this.Source.setSource(this.PageStyle,{P1:p1,P2:p2,P3:p3});
    }
    
    protected loadPage() {
        this.Source.initData();
       
       // alert("load page after");
       
    }

    protected 
    loadModule() {
        this.pRegisterModule(_getNewModule(this.Source));
        //window["ss"] = this ;
    }

    protected get getVuexSource() {
        return this.getModuleState();

    }

    public get Store(): ISource {
        return this.getModuleState();
    }


}

const _getNewModule = (source: ISource) => {

    return {
        state: source
    };

}
