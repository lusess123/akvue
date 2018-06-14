import { IApp } from "./iapp"
import {IMenu} from "./imenu"
import {ioc,vue} from "ak-lib-sys/src"

export  abstract class BaseApp  implements IApp {
   
    public Name:string = "";
    public Title :string  = "";
    public Doc :string  = "";
    public Icon :string = "";
    public  TagName:string = "default";

    protected MenuList :IMenu [] ;
    protected PlugDict:ioc.IClassList ;
    public Order :number = 0;

    public RootRoute: vue.IRouteConfig[] ;
    public MainRoute: vue.IRouteConfig[] ;
    public   async useContext(pre:any):Promise<any> {
        return pre ;
    }

    public   async afterUseContext(pre:any):Promise<any> {
        return pre ;
    };

     public  getMenus():IMenu[]{
                  return  this.MenuList ;
     }
    
    public getPlugs():ioc.IClassList{
             return this.PlugDict ;
     }

}