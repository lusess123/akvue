import { IPage } from "./ipage";
import {BaseCom, IBaseComConfig} from "ak-lib-sys/com/BaseCom";
import { vue,core } from "ak-lib-sys";


export interface  IBasePageConfig extends IBaseComConfig
{

}



@vue.com(`
      <div>页面组件：{{vm.PageName}}</div>
`)
export class BasePage   extends BaseCom   implements IPage {


   public Title :string ;
   public PageName :string = "";
   public P1:string ;
   public P2 :string ;
   public P3 :string ;
  // public _VueObj : any ;
  protected IsSingle$  = true ;

  public constructor(config?: IBaseComConfig){
         super(config);
         if(config && config.UniId){
            this.UniId = config.UniId ;
         }
         else{
            this.UniId =  "BasePage"+ core.getUniId();
        }
       
  }


   protected  loadPage(){

   }

    public  sysloadPage(){
        this.loadPage();
    }
    public reset(pagename,p1,p2,p3){
         this.PageName = pagename,
         this.P1 = p1 ,
         this.P2 = p2 ,
         this.P3 = p3;
         //alert(this.PageName); 
    }
}