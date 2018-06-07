import { ISource } from "./isource";
import * as pageView from "./../contract/pageview";
import { ioc,core } from "ak-lib-sys";
//import { core } from "../../../ref/index";



export const DetaiComTrans = {

    DateTime: "DateTimeDetail",
    Date: "DateDetail",
    Hidden: "Hidden"
};


@ioc.PlugIn({ RegName: "BaseSource", BaseType: "ISource" })
export class BaseSource implements ISource {
    PageView: pageView.IPageView = {
        Title: "数据表",
        Data: {},
        ListFormName: "ListForm",
        SearchFormName: "SearchForm1",

        Forms: {
            ListForm: {
                Columns: [
                    { DisplayName: "主键", Name: "id", ControlType: "hidden" },
                    { DisplayName: "标题2", Name: "title", ControlType: "Text", Search: {} }
                ]
            }
        }

    };

    get fff() {
        return "123";
    }
    set fff(a) {
        this.fff = a;
    }

    get getListFormData() {
        return this.PageView.Data[this.PageView.ListFormName];
    }

    get getPagerData() {
        const _list = this.PageView.Data[this.PageView.ListFormName + "_PAGER"];
        if (_list && _list.length) {
            // core.alert(_list);
            return _list[0];
        }
        return {};
    }

    get getColumnGroupsByPageStyle():pageView.IColumnGroup[] {
        return  this.PageView.Forms[this.PageView.ListFormName].ColumnGroups;
    }


    get getSearchColumns(): pageView.IColumn[] {
        return this.PageView.Forms[this.PageView.ListFormName].Columns.filter(a => a.Search ? true : false);
    }

    get getListFormColumns(): pageView.IColumn[] {
        return this.PageView.Forms[this.PageView.ListFormName].Columns.filter(a => {
            const _sp = a.ShowPage;


            return _sp != "OnlyEdit"
                && a.ShowPage != "None"
                || (a.ShowPage == "List")
                || (a.ShowPage == "OnlyRead");


        }).map(a => {
            return { ...{}, ...a, ...{ ControlType: this.getDetailCol(a.ControlType) } };
        });
    }

    get getDataButtonsList(): pageView.IDataButton[] {
        let _res: pageView.IDataButton[] = [];
        const _dict = this.PageView.DataButtons;
        for (const n in _dict) {
            const _btn = _dict[n];
            _res.push({ Name: _btn.Name, Text: _btn.Text });
        }
        return _res;
    }

    getDetailCol(ctype: string) {
        if (DetaiComTrans[ctype])
            return DetaiComTrans[ctype];
        else
            return "Detail";
    }

    initData() {

    }

    asyncLoadData(): Promise<void> {
        return new Promise(a => {
            this.PageView.Data[this.PageView.ListFormName] = [
                { id: 123, title: "222q", file3: "3333" },
                { id: 123, title: "222a", file3: "3333" },
                { id: 123, title: "222s", file3: "3333" },
                { id: 123, title: "222d", file3: "3333" }
            ];
            a();
        });
    }




    asyncSearch(postData, page?: any): Promise<void> {
        return null;
    }

    decode(regName, val): string {
        return "";
    }

    get getDataRowKey(): string {
        return "id";
    }

    command(name: string, ids?: string[]) {
        core.alert({
            name: name,
            ids: ids
        });
    }
    setSource(pageStyle:string,obj:any){
        
    }
}