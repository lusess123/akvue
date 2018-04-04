import {BaseCom,IBaseComConfig} from "ak-lib-sys/com/BaseCom";
import Vue from "vue";
import { core ,ioc,vue } from "ak-lib-sys";


export interface IBaseColConfig extends IBaseComConfig{
   DataValue : any ;
   RegName? : string ;
   DataSet?: any ;
}



@vue.com(`
    <div>{{vm.DataText}}</div> 
    `)
export   class BaseCol extends BaseCom {
       
     private  fDataValue :any ;
     private  RegName : string ;
     private  DataSet: any ;

      constructor (config?: IBaseColConfig){
          super(config);
          this.fDataValue = config.DataValue ;
          this.RegName = config.RegName ;
          this.DataSet = config.DataSet ;

      }

   get DataValue(): any {
        return this.pGetDataValue() ; 
    }
    set DataValue(val: any) {
         this.fDataValue = val ;
    }

    get DataText():string{
        return this.pGetDataText();
    }


    protected  pGetDataValue()
      {
          return this.fDataValue ;
      }

      protected pGetDataText()
      {
          if(this.RegName){
              if(this.DataSet[this.RegName]){
                  return this.DataSet[this.RegName][this.fDataValue]
              }
          }
        
          return "";
      }


}