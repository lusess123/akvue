

import { core, ioc, vue, util } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import React, { Component } from "react";
import { render,unmountComponentAtNode } from "react-dom";



export class BaseDomReact<T> extends React.Component<IProps<T>, any> {

    get Vm ():T{
        alert(123);
        return this.props.Vm;
    }

    render() {
        return <div></div>;
    }
}



export interface IProps<T>{
   Vm:T
}

    
@vue.com(`<div>reactPage</div>`,{
    data:function(){
       return {
        reactNode: undefined
       }
    },
    mounted() {
        this.reactNode = this.getReactType();
        render(<this.reactNode  Vm={this.vm}></this.reactNode>, this.$el);
    },
    methods:{
         getReactType(){
             return this.vm.$ReactType;
         }
    },
    beforeDestroy() {
        this.reactNode = undefined;
        unmountComponentAtNode(this.$el);

    },

    updated: function () {
        if (this.reactNode) {
            this.reactNode.forceUpdate();
        }
    }
    
})
@ioc.PlugIn({ RegName: "reactpage", BaseType: "IPage", CreateDate: "2018-04-06", Doc: "reactv页面插件" })
export class BaseReactPage extends BasePage {

    public Title: string = "reactv";
    public $ReactType: any = BasePageReact;
    protected loadPage() {
            
    }

}

export class BasePageReact  extends BaseDomReact<BaseReactPage>{

}





