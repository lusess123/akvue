import {BaseCom,IBaseComConfig} from "ak-lib-sys/com/basecom";
import Vue from "vue";
import { core ,ioc,vue } from "ak-lib-sys";
import {BaseCol,IBaseColConfig}  from "./basecol"


export interface IXXXColConfig extends IBaseColConfig{
   
}


@ioc.PlugIn({RegName:"XXXCol",BaseType:"BaseCol",Author:"zhengyukun",CreateDate:"2018-01-26",Doc:"XXXCol控件插件"})
@vue.com('<div>xxxCol</div>')
export   class XXXCol extends BaseCol {

      constructor (config?: IXXXColConfig){
          super(config);
      }


}