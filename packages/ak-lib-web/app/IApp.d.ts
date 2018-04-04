import { IMenu } from "./IMenu";
import { ioc } from "ak-lib-sys";
export interface IApp {
    Name: string;
    Title: string;
    Doc: string;
    Icon: string;
    getMenus(): IMenu[];
    getPlugs(): ioc.IClassList;
}
