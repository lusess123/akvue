import { BasePage } from "ak-lib-web/basepage";
import * as table from "ak-lib-comp/iview/table";
export declare class TestVmBasePage extends BasePage {
    pageMethod1(d: Date): void;
}
export declare class testvmPage extends TestVmBasePage {
    Title: string;
    TableObj: table.TableCom;
    setTableObj(): void;
    protected loadPage(): void;
    pageMethod1(d: Date): void;
    callUpdate(): void;
    getThisStr(): string;
}
