

import { core, ioc, vue } from "ak-lib-sys/src";
import { BaseCom, IBaseComConfig } from "ak-lib-sys/src/com/basecom";
import  lvForm from "./vmformvue.vue";



export interface ILvForm
{
    rules?: IDict<IRule> ;
    value?:any;
    options?:Ioption[];
    action?:boolean ;
    loading?:boolean ;
}

export interface IDict<T>
{
    [index: string]: T;
}

export interface IRule
{
    message ?:string ;
    pattern? : string;
    required?:boolean;
    type?:string ;
    min?:number;
    max?:number;
    trigger?:string ;

}

export interface Ioption
{
    default?:any ;
    key:string ;
    type:string ;
    title:string ;
    tooltip?:string ;
    selectList?:ISelect[];
    radioList?:ISelect[];
    Options?:any ;

   
}
export interface ISelect { 
    label :string ;
    value : string ;
}



export interface IVmFormComConfig extends IBaseComConfig  , ILvForm  {
    
}

@ioc.PlugIn({ RegName: "VmFormCol", BaseType: "BaseCom", CreateDate: "2018-02-24", Doc: "VmForm组件插件" })

@vue.com(lvForm)
export class VmFormCom extends BaseCom  implements ILvForm {

    rules?: IDict<IRule> ;
    value?:any;
    options?:Ioption[];
    action?:boolean ;
    loading?:boolean ;

    constructor(config?: IVmFormComConfig) {
        super(config);
        this.rules = config.rules ;
        this.value = config.value;
        this.options = config.options ;
        this.action = config.action ;
        this.loading = config.loading ;
    }

}
