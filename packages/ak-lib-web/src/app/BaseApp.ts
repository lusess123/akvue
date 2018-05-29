import { IApp } from "./IApp"
import {IMenu} from "./IMenu"
import {ioc} from "ak-lib-sys"

export  abstract class BaseApp  implements IApp {
   
    public Name:string = "";
    public Title :string  = "";
    public Doc :string  = "";
    public Icon :string = "";

    protected MenuList :IMenu [] ;
    protected PlugDict:ioc.IClassList ;
    public Order :number = 0;

     public  getMenus():IMenu[]{
                  return  this.MenuList ;
     }
    
    public getPlugs():ioc.IClassList{
             return this.PlugDict ;
     }

}