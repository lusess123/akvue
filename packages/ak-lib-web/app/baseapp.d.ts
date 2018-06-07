import { IApp } from "./iapp";
import { IMenu } from "./imenu";
import { ioc } from "ak-lib-sys";
export declare abstract class BaseApp implements IApp {
    Name: string;
    Title: string;
    Doc: string;
    Icon: string;
    protected MenuList: IMenu[];
    protected PlugDict: ioc.IClassList;
    Order: number;
    getMenus(): IMenu[];
    getPlugs(): ioc.IClassList;
}
