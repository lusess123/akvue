var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { BaseSource } from "ak-lib-biz/source/BaseSource";
import { net } from "ak-lib-sys";
import { TableMetaDict } from "ak-lib-biz/contract/TableMeta";
//import { timeout } from "_rxjs@5.5.6@rxjs/operator/timeout";
import * as codeTables from "./DwhCodeTable";
var dwhBaseSource = /** @class */ (function (_super) {
    __extends(dwhBaseSource, _super);
    function dwhBaseSource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Title = "标题";
        _this.ListFormName = "ListForm";
        _this.SearchFormName = "SearchForm";
        _this.ModelName = "dwh_search_tables";
        _this.Url = "/dwh/data/tables";
        _this.TableName = "tables";
        return _this;
    }
    dwhBaseSource.prototype.initData = function () {
        this.setFormConfig();
    };
    dwhBaseSource.prototype.asyncLoadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _$searchTable(this.Url, {})];
                    case 1:
                        _data = _a.sent();
                        // debugger ;
                        this.setData(_data);
                        return [2 /*return*/];
                }
            });
        });
    };
    dwhBaseSource.prototype.setData = function (data) {
        this.PageView.Data[this.ListFormName] = data[this.TableName];
        this.PageView.Data[this.ListFormName + "_PAGER"] = [{
                order: data.order,
                page: data.page,
                size: data.size,
                total: data.total
            }];
    };
    dwhBaseSource.prototype.setFormConfig = function () {
        // core.alert(codeTables);
        this.PageView = {
            Title: this.Title,
            Data: {
                ListForm: []
            },
            ListFormName: this.ListFormName,
            SearchFormName: this.SearchFormName,
            CodeTables: __assign({}, codeTables),
            Forms: {
                ListForm: {
                    Columns: [],
                    ColumnGroups: []
                }
            }
        };
        var _tm = TableMetaDict;
        this.PageView.Forms.ListForm.Columns = _tm[this.ModelName].Columns;
    };
    dwhBaseSource.prototype.asyncSearch = function (postData) {
        return __awaiter(this, void 0, void 0, function () {
            var _param, _data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _param = this.setPostData(postData);
                        return [4 /*yield*/, _$searchTable(this.Url, _param)];
                    case 1:
                        _data = _a.sent();
                        this.setData(_data);
                        return [2 /*return*/];
                }
            });
        });
    };
    dwhBaseSource.prototype.setPostData = function (postData) {
        var query = [];
        if (postData) {
            for (var n in postData) {
                query.push(n + ":" + postData[n]);
            }
        }
        var _param = { query: query.join(',') };
        return _param;
    };
    return dwhBaseSource;
}(BaseSource));
export { dwhBaseSource };
var _$searchTable = function (url, params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _$get(url, { params: params })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
var _$get = function (url, params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, net.get({ url: url, params: params })];
        });
    });
};
var _$post = function (url, params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, net.post({ url: url, params: params })];
        });
    });
};
