

import { core, ioc, vue, util } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/BasePage";
import { BaseReactPage, BaseDomReact } from "ak-lib-react-web/basereactpage";
import React, { Component } from "react";


export class ReactDemo2PageReact extends BaseDomReact<ReactDemo2Page>{
    render() {
        return <div>
            ReactDemoPage2React{new Date().toString()}
            {this.Vm.Pro1}
            </div>;
    }
}



@ioc.PlugIn({ RegName: "ReactDemo2Page", BaseType: "IPage", CreateDate: "2018-04-07", Doc: "ReactDemoPage2页面插件" })
export class ReactDemo2Page extends BaseReactPage {

    public Title: string = "ReactDemoPage2";
    $ReactType: any = ReactDemo2PageReact;
    Pro1:string = "rrfff1233222";
    protected loadPage() {

    }

}
