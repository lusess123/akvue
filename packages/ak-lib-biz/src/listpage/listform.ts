import { BaseCom, IBaseComConfig } from "ak-lib-sys/com/basecom";
import Vue from "vue";
import { core, ioc, vue } from "ak-lib-sys";

import * as data from "../contract/pageview";
import * as baseColFile from "ak-lib-col/baseCol";
import { DetailCol } from "ak-lib-col/single/detailcol"; DetailCol;
import * as col from "ak-lib-col"; col;
import { TeamButtonCom } from "ak-lib-comp/buttons/teambutton";
import { IPage } from "./../contract/net";


import { ISource } from "./../source/isource";
import { IPageView } from "../contract/pageview";


export interface IListFormConfig extends IBaseComConfig {
    Columns?: data.IColumn[];
    Datasource?: any[];
    DataSet?: any;
    PageButtons?: data.IDataButton[];
    PagerData?: IPage;
    Text?:string ;
}


@ioc.PlugIn({ BaseType: "ICom", RegName: "ListForm" })
@vue.com(`
        <div>
     
        <Table  @on-selection-change stripe border  :columns="vm.Columns" :data="vm.Datasource"  size="large"></Table>
        <Card v-if="vm.Datasource && vm.Datasource.length"  > 
        <Page :total="vm.PagerData.total"  :page-size-opts="[5,10, 20, 30, 40]"  @on-change="vm.pageChange"
         :page-size="vm.PagerData.size"   :current="vm.PagerData.page+1"  
          size="small" show-elevator show-sizer show-total  >
          </Page></Card>
         
        </div>
`)
export class ListForm extends BaseCom {
    // public SearchFormObj : 
//     public MesgList = {
//         List :[
//               "列表组件",
//               "分成 分页，表格，按钮"
//         ]
//   }

    public constructor(config?:any){
        super(config);
        this.Text = config.Text ;
      //  window["rrr"] = this ;
    }

   // public  ddd :string = "dddd";
    public get Columns(): any {
        const _colums = this.Store.getListFormColumns;
        const _res = this.getColumnConfigList(_colums);
        // core.alert(_res);
        return _res;
    }

    public Text :string = null;


    public get Store(): ISource {
        return this.getModuleState();
    }

    public get PageView(): IPageView {
        return this.getModuleState().PageView;
    }



    get Datasource(): any[] {
        return this.Store.getListFormData;
    }
    //Data:any ;
    get fDataSet(): any {
        return this.Store.PageView.CodeTables;
    }
    get DataButtons(): data.IDataButton[]{
        return this.Store.getDataButtonsList ;
    }
    PagerData: IPage = { page: 0, size: 10, total: 0 };



    sendMesg(msg: string) {
        this.emitAppEvent("test", this.UniId, msg);
    }

    private getColWidth(col: data.IColumn): string {
        if (col.Width) return col.Width;
        else {
            let _res: string = "";
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

    public pageChange(current: number) {
        alert(current);
    }



    private getColumnConfigList(configColumns) {
        if(!configColumns) return [] ;
        const _Configcolumns = configColumns.filter(col => {

            return col.ControlType != "Hidden"

        })

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
                               ` ,
                        {
                            vm: {
                                ColObj: _colObj
                            }
                        }
                    );
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
        ]
        return _Columns;
    }

    private getColumnCol(colTypename: string, val: string, colRegName: string): baseColFile.BaseCol {
        colTypename = colTypename ? colTypename : "Detail";
        const _colConfig: baseColFile.IBaseColConfig = {
            UniId: this.UniId,
            DataValue: val,
            DataSet: this.fDataSet,
            RegName: colRegName
        };
        // debugger;
        // core.alert(colTypename + "  ===== "+_colConfig);
        const _col = ioc.Ioc.Current().FetchInstance<baseColFile.BaseCol>(colTypename + "Col", "BaseCol", {
            Args: [_colConfig]
        });

        if (!_col) return new DetailCol(_colConfig);

        return _col;
    }


}
