import { IApp } from "./IApp";
import { IMenu } from "./IMenu";
import { ioc } from "ak-lib-sys";
export declare abstract class BaseApp implements IApp {
    Name: string;
    Title: string;
    Doc: string;
    Icon: string;
    protected MenuList: IMenu[];
    protected PlugDict: ioc.IClassList;
    getMenus(): IMenu[];
    getPlugs(): ioc.IClassList;
}
