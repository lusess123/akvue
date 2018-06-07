var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseCom } from "ak-lib-sys/com/basecom";
import { ioc, vue } from "ak-lib-sys";
import { DetailCol } from "ak-lib-col/single/detailcol";
DetailCol;
import * as col from "ak-lib-col";
col;
import { TeamButtonCom } from "ak-lib-comp/buttons/teambutton";
let ListForm = class ListForm extends BaseCom {
    // public SearchFormObj : 
    //     public MesgList = {
    //         List :[
    //               "列表组件",
    //               "分成 分页，表格，按钮"
    //         ]
    //   }
    constructor(config) {
        super(config);
        this.Text = null;
        this.PagerData = { page: 0, size: 10, total: 0 };
        this.Text = config.Text;
        //  window["rrr"] = this ;
    }
    // public  ddd :string = "dddd";
    get Columns() {
        const _colums = this.Store.getListFormColumns;
        const _res = this.getColumnConfigList(_colums);
        // core.alert(_res);
        return _res;
    }
    get Store() {
        return this.getModuleState();
    }
    get PageView() {
        return this.getModuleState().PageView;
    }
    get Datasource() {
        return this.Store.getListFormData;
    }
    //Data:any ;
    get fDataSet() {
        return this.Store.PageView.CodeTables;
    }
    get DataButtons() {
        return this.Store.getDataButtonsList;
    }
    sendMesg(msg) {
        this.emitAppEvent("test", this.UniId, msg);
    }
    getColWidth(col) {
        if (col.Width)
            return col.Width;
        else {
            let _res = "";
            switch (col.ControlType) {
                case "DateTime":
                case "DateTimeDetail":
                    _res = "190";
                    break;
                default:
                    break;
            }
            return _res;
        }
    }
    pageChange(current) {
        alert(current);
    }
    getColumnConfigList(configColumns) {
        if (!configColumns)
            return [];
        const _Configcolumns = configColumns.filter(col => {
            return col.ControlType != "Hidden";
        });
        // core.alert(_columns);
        let _Columns = _Configcolumns.map((col) => {
            //  this.getColumnCol(col.ControlType,);
            return {
                title: col.DisplayName,
                key: col.Name,
                width: this.getColWidth(col),
                render: (h, params) => {
                    const _val = params.row[params.column.key];
                    const _regname = col.Options ? col.Options.RegName : "";
                    const _colObj = this.getColumnCol(col.ControlType, _val, _regname);
                    return vue.tpl(h)(`

                                  <div>${vue.vm("vm.ColObj")}</div>
                               `, {
                        vm: {
                            ColObj: _colObj
                        }
                    });
                }
                // width :100 
            };
        });
        _Columns = [
            // _cols.push(
            {
                type: 'selection',
                width: 55,
                align: 'center'
            },
            ..._Columns,
            {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 120,
                render: (h, params) => {
                    const _btn = new TeamButtonCom({
                        UniId: this.UniId,
                        Buttons: this.DataButtons,
                        Data: params.row
                    });
                    // alert(_btn.IsDown);
                    return vue.tpl(h)(`

                    <div>${vue.vm("vm.teamBtn")}</div>
                 
                 `, {
                        vm: {
                            teamBtn: _btn
                        }
                    });
                }
            }
            // );
        ];
        return _Columns;
    }
    getColumnCol(colTypename, val, colRegName) {
        colTypename = colTypename ? colTypename : "Detail";
        const _colConfig = {
            UniId: this.UniId,
            DataValue: val,
            DataSet: this.fDataSet,
            RegName: colRegName
        };
        // debugger;
        // core.alert(colTypename + "  ===== "+_colConfig);
        const _col = ioc.Ioc.Current().FetchInstance(colTypename + "Col", "BaseCol", {
            Args: [_colConfig]
        });
        if (!_col)
            return new DetailCol(_colConfig);
        return _col;
    }
};
ListForm = __decorate([
    ioc.PlugIn({ BaseType: "ICom", RegName: "ListForm" }),
    vue.com(`
        <div>
     
        <Table  @on-selection-change stripe border  :columns="vm.Columns" :data="vm.Datasource"  size="large"></Table>
        <Card v-if="vm.Datasource && vm.Datasource.length"  > 
        <Page :total="vm.PagerData.total"  :page-size-opts="[5,10, 20, 30, 40]"  @on-change="vm.pageChange"
         :page-size="vm.PagerData.size"   :current="vm.PagerData.page+1"  
          size="small" show-elevator show-sizer show-total  >
          </Page></Card>
         
        </div>
`),
    __metadata("design:paramtypes", [Object])
], ListForm);
export { ListForm };
