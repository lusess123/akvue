import {BaseCom,IBaseComConfig} from "ak-lib-sys/com/basecom";
import Vue from "vue";
import { core ,ioc,vue ,util } from "ak-lib-sys";
import {BaseCol,IBaseColConfig}  from "../basecol"


export interface IDateTimeDetailColConfig extends IBaseColConfig{
   
}


@ioc.PlugIn({RegName:"DateTimeDetailCol",BaseType:"BaseCol",Author:"zhengyukun",CreateDate:"2018-01-26",Doc:"时间显示控件插件"})
export   class DateTimeDetailCol extends BaseCol {

      constructor (config?: IDateTimeDetailColConfig){
          super(config);
      }
      
    protected  pGetDataText(){
         let _text = super.pGetDataText();
         if(!_text) _text = this.DataValue;
         return  util.formatTimeFormCode(Number.parseInt(_text),"yyyy-MM-dd hh:mm:ss");
      }



}