import { BizPage } from "./../BizPage";
import * as vmform from "./vmform/vmform";
import { IColumnGroup } from "../contract/PageView";
export declare class InsertPage extends BizPage {
    Title: string;
    GroupIndex: number;
    DataRow: {};
    FormVMObj: vmform.VmFormCom;
    PageStyle: string;
    protected loadPage(): void;
    private getColumnByName(name);
    createFormVm(group: IColumnGroup): vmform.VmFormCom;
    private getSelectList(col);
    readonly SourceString: string;
    readonly getName: string;
    readonly NaviColumnGroups: IColumnGroup[];
    getNaviColGroupByCOlName(index: number): void;
    next(): void;
}
