var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc, core } from "ak-lib-sys";
//import { core } from "../../../ref/index";
export const DetaiComTrans = {
    DateTime: "DateTimeDetail",
    Date: "DateDetail",
    Hidden: "Hidden"
};
let BaseSource = class BaseSource {
    constructor() {
        this.PageView = {
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
    }
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
    get getColumnGroupsByPageStyle() {
        return this.PageView.Forms[this.PageView.ListFormName].ColumnGroups;
    }
    get getSearchColumns() {
        return this.PageView.Forms[this.PageView.ListFormName].Columns.filter(a => a.Search ? true : false);
    }
    get getListFormColumns() {
        return this.PageView.Forms[this.PageView.ListFormName].Columns.filter(a => {
            const _sp = a.ShowPage;
            return _sp != "OnlyEdit"
                && a.ShowPage != "None"
                || (a.ShowPage == "List")
                || (a.ShowPage == "OnlyRead");
        }).map(a => {
            return Object.assign({}, a, { ControlType: this.getDetailCol(a.ControlType) });
        });
    }
    get getDataButtonsList() {
        let _res = [];
        const _dict = this.PageView.DataButtons;
        for (const n in _dict) {
            const _btn = _dict[n];
            _res.push({ Name: _btn.Name, Text: _btn.Text });
        }
        return _res;
    }
    getDetailCol(ctype) {
        if (DetaiComTrans[ctype])
            return DetaiComTrans[ctype];
        else
            return "Detail";
    }
    initData() {
    }
    asyncLoadData() {
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
    asyncSearch(postData, page) {
        return null;
    }
    decode(regName, val) {
        return "";
    }
    get getDataRowKey() {
        return "id";
    }
    command(name, ids) {
        core.alert({
            name: name,
            ids: ids
        });
    }
};
BaseSource = __decorate([
    ioc.PlugIn({ RegName: "BaseSource", BaseType: "ISource" })
], BaseSource);
export { BaseSource };
