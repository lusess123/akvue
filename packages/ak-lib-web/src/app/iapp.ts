import { IMenu } from "./imenu"
import { ioc } from "ak-lib-sys"

export interface IApp 
{
    Name :string ;
    Title:string ;
    Doc:string ;
    Icon:string ;
    Order?:number;

    getMenus():IMenu[];
    getPlugs():ioc.IClassList;
   
}