import { BaseCom, IBaseComConfig } from "ak-lib-sys/com/basecom";
import Vue from "vue";
import { core, ioc, vue } from "ak-lib-sys";
import cols from "ak-lib-comp/complex/col.vue";
import { IBasePageConfig } from "ak-lib-web/basepage";
import * as data from "./../contract/pageview";

import { ISource } from "../source/isource";
import { IPageView } from "./../contract/pageview";


export interface ISearchFormConfig extends IBasePageConfig {
      Columns?: data.IColumn[];
      DataRow?: any;
      CodeTables?: any;
      Text?: string;
}



@ioc.PlugIn({ BaseType: "ICom", RegName: "SearchForm" })
@vue.com(`
<div class="ivu-form ivu-form-label-right">
<Card>
  <template v-for=" item   in  vm.getSearchColList">
    <Row  :gutter="16" :key="item.Name"  >
       <cols :ColName="item.Name"  :ItemList="vm.getItemList(item)" :key="item.Name"  :onChange="(a,b)=>vm.colChange(a,b)"      :displayName="item.DisplayName"  :ControlType="item.ControlType"  ></cols>
    </Row>
  </template>
  <div style="text-align: center;margin-top: 10px;">
           <i-button type="primary" icon="ios-search" @click="vm.search()">搜索</i-button>
  </div>
 
</Card>
<template v-for=" item   in  vm.getNaviColList">
<Row  :gutter="16" :key="item.Name"  >
       <cols :ColName="item.Name"   :val="vm.DataRow[item.Name]"   :ItemList="vm.getItemList(item)" :key="item.Name"  :onChange="vm.colNaviChange"      :displayName="item.DisplayName"  :ControlType="item.ControlType"  ></cols>
</Row>
</template>
</div>
`,
      {
            components:
                  { cols }
      }
)
export class SearchForm extends BaseCom {clear
      // public SearchFormObj : 

      public DataRow: any
      public get CodeTables(): any {
            return this.PageView.CodeTables;
      };
      public Text: string = null;

      public MesgList = {
            List: [
                  "搜索表单组件",
                  "分成搜索字段组和导航字段组"
            ]
      }

      public SearchFormName = "1233";
      public constructor(config?: ISearchFormConfig) {
            super(config);
            //  this.Columns = config.Columns;
            this.DataRow = {};
            this.colNaviChange = this.colNaviChange.bind(this);
            //  this.Text = config.Text = null ;
            // core.alert(this);
            // this.CodeTables = config.CodeTables;
            window["__search"] = this ;
      }

      public get Store(): ISource {
            return this.getModuleState();
      }

      public get PageView(): IPageView {
            return this.Store.PageView;
      }


      public getItemList(item) {
            //const _store : pageViewFile.IPageView = this.$store.state.PageView;
            //this.CodeTables = this.Store.PageView.CodeTables;
           // debugger;
             const regName = item.Options?item.Options.RegName:null ; 
            if (regName && this.CodeTables) {
                  const _dt = this.CodeTables[regName];
                  if (_dt) {
                        let _res = [];
                        for (const _n in _dt) {
                              _res.push({ id: _n, cnname: _dt[_n] });
                        }
                        return _res;
                  }
            }
            return [];
      }

      // @vue.compute()
      public get getSearchColList() {
            //debugger;
            //  this.Store.
            // alert(window["xxx"] == this );
            //  window["xxx"] = this ;
            // core. alert(this.Store);
            // core.alert(this.Store.getSearchColumns);
            if (this.Store.getSearchColumns) {
                  const gg = this.Store.PageView.Forms[this.PageView.ListFormName].Columns.filter(a => a.Search ? true : false);
                  const _res = gg.filter(a => { return a.Search && !a.Search.IsNavi; });



                  return _res;
            }
            else
                  return [];
      }
      //@vue.compute()
      public get getNaviColList() {

            const gg = this.Store.PageView.Forms[this.PageView.ListFormName].Columns.filter(a => a.Search ? true : false);
            const _res = gg.filter(a => { return a.Search.IsNavi; });
            return _res;
      }

      public search() {
            // core.alert(this.DataRow);
            // this.emitAppEvent("listpage-search", this.UniId, core.pureObj(this.DataRow));
            this.Store.asyncSearch(this.DataRow);
            // .then(a=>{
            //      // core.alert(a);
            //     // this.Store.PageView.Forms[this.Store.PageView.ListFormName].Columns[1].DisplayName = new Date().toString();
            // });
      }

      colChange(vueObj, val: string) {
            // debugger;
            this.DataRow[vueObj.ColName] = val;
            // console.log(vueObj.ColName + " = " + val);
            // core.alert(val);
      }

      colNaviChange(vueObj, val: string) {

            // core.alert(this.DataRow);
            // core.alert("dddd:"+val);
            //debugger;
            this.DataRow[vueObj.ColName] = val;

            Vue.set(this.DataRow, vueObj.ColName, val);

            // this._VueObj.$forceupdate();

            // this.forceUpdate();
            // this.setRx("DataRow",this.DataRow);

            // core.alert(this.DataRow);
            this.search();
            // this.emitAppEvent("listpage-search", this.UniId, core.pureObj(this.DataRow));
      }


}
