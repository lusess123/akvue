

import { core, ioc, vue, util } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/BasePage";
import React, { Component } from "react";
import { render } from "react-dom";

@vue.com(`<div>reactvPage</div>`,{
    mounted() {
          
    }
    
})
@ioc.PlugIn({ RegName: "reactvPage", BaseType: "IPage", CreateDate: "2018-04-06", Doc: "reactv页面插件" })
export class reactvPage extends BasePage {

    public Title: string = "reactv";
    public $ReactType:any ;
    protected loadPage() {
            
    }

}


export class Hello extends React.Component<any, {}> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}
