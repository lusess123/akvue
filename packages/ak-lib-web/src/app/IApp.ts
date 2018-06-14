import { IMenu } from "./imenu"
import { ioc,vue } from "ak-lib-sys/src"
import { promises } from "fs";

export interface IApp 
{
    Name :string ;
    Title:string ;
    Doc:string ;
    Icon:string ;
    Order?:number;
    TagName?:string;

    getMenus():IMenu[];
    getPlugs():ioc.IClassList;

    RootRoute?: vue.IRouteConfig[];
    MainRoute?: vue.IRouteConfig[];
    useContext(pre:any):Promise<any> ;
    afterUseContext(pre:any):Promise<any> ;
}