var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseSource } from "ak-lib-biz/source/BaseSource";
import { net } from "ak-lib-sys";
import { TableMetaDict } from "ak-lib-biz/contract/TableMeta";
//import { timeout } from "_rxjs@5.5.6@rxjs/operator/timeout";
import * as codeTables from "./DwhCodeTable";
export class dwhBaseSource extends BaseSource {
    constructor() {
        super(...arguments);
        this.Title = "标题";
        this.ListFormName = "ListForm";
        this.SearchFormName = "SearchForm";
        this.ModelName = "dwh_search_tables";
        this.Url = "/dwh/data/tables";
        this.TableName = "tables";
    }
    initData() {
        this.setFormConfig();
    }
    asyncLoadData() {
        return __awaiter(this, void 0, void 0, function* () {
            const _data = yield _$searchTable(this.Url, {});
            // debugger ;
            this.setData(_data);
        });
    }
    setData(data) {
        this.PageView.Data[this.ListFormName] = data[this.TableName];
        this.PageView.Data[this.ListFormName + "_PAGER"] = [{
                order: data.order,
                page: data.page,
                size: data.size,
                total: data.total
            }];
    }
    setFormConfig() {
        // core.alert(codeTables);
        this.PageView = {
            Title: this.Title,
            Data: {
                ListForm: []
            },
            ListFormName: this.ListFormName,
            SearchFormName: this.SearchFormName,
            CodeTables: Object.assign({}, codeTables),
            Forms: {
                ListForm: {
                    Columns: [],
                    ColumnGroups: []
                }
            }
        };
        const _tm = TableMetaDict;
        this.PageView.Forms.ListForm.Columns = _tm[this.ModelName].Columns;
    }
    asyncSearch(postData) {
        return __awaiter(this, void 0, void 0, function* () {
            const _param = this.setPostData(postData);
            const _data = yield _$searchTable(this.Url, _param);
            this.setData(_data);
        });
    }
    setPostData(postData) {
        let query = [];
        if (postData) {
            for (const n in postData) {
                query.push(n + ":" + postData[n]);
            }
        }
        const _param = { query: query.join(',') };
        return _param;
    }
}
const _$searchTable = function (url, params) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield _$get(url, { params: params });
    });
};
const _$get = function (url, params) {
    return __awaiter(this, void 0, void 0, function* () {
        return net.get({ url, params });
    });
};
const _$post = function (url, params) {
    return __awaiter(this, void 0, void 0, function* () {
        return net.post({ url, params });
    });
};
