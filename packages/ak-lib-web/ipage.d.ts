import { ICom } from "ak-lib-sys/com/icom";
export interface IPage extends ICom {
    Title: string;
    PageName: string;
    P1: string;
    P2: string;
    P3: string;
    sysloadPage(): any;
    reset(pagename: string, p1: string, p2: string, p3: string): any;
}
