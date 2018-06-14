import {BaseCom,IBaseComConfig} from "ak-lib-sys/src/com/basecom";
import Vue from "vue";
import { core ,ioc,vue } from "ak-lib-sys/src";



export interface IXXXComConfig extends IBaseComConfig{
   
}


@ioc.PlugIn({RegName:"XXXCol",BaseType:"BaseCom",Author:"zhengyukun",CreateDate:"2018-01-26",Doc:"XXX组件插件"})
@vue.com('<div>XXXCom</div>')
export   class XXXCom extends BaseCom {

      constructor (config?: IXXXComConfig){
          super(config);
      }


}