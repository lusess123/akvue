import {BaseCom,IBaseComConfig} from "ak-lib-sys/com/BaseCom";
import Vue from "vue";
import { core ,ioc,vue } from "ak-lib-sys";
import {BaseCol,IBaseColConfig}  from "./../BaseCol"


export interface IDateTimeColConfig extends IBaseColConfig{
   
}



@ioc.PlugIn({RegName:"DateTimeCol",BaseType:"BaseCol",Author:"zhengyukun",CreateDate:"2018-01-26",Doc:"时间控件插件"})
@vue.com('<DatePicker type="datetime" placeholder="Select date" ></DatePicker>')
export   class DateTimeCol extends BaseCol {

      constructor (config?: IDateTimeColConfig){
          super(config);
      }


}