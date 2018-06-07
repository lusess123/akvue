var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseCom } from "ak-lib-sys/com/BaseCom";
import Vue from "vue";
import { ioc, vue } from "ak-lib-sys";
import cols from "ak-lib-comp/complex/col.vue";
let SearchForm = class SearchForm extends BaseCom {
    constructor(config) {
        super(config);
        this.Text = null;
        this.MesgList = {
            List: [
                "搜索表单组件",
                "分成搜索字段组和导航字段组"
            ]
        };
        this.SearchFormName = "1233";
        //  this.Columns = config.Columns;
        this.DataRow = {};
        this.colNaviChange = this.colNaviChange.bind(this);
        //  this.Text = config.Text = null ;
        // core.alert(this);
        // this.CodeTables = config.CodeTables;
        window["__search"] = this;
    }
    get CodeTables() {
        return this.PageView.CodeTables;
    }
    ;
    get Store() {
        return this.getModuleState();
    }
    get PageView() {
        return this.Store.PageView;
    }
    getItemList(item) {
        //const _store : pageViewFile.IPageView = this.$store.state.PageView;
        //this.CodeTables = this.Store.PageView.CodeTables;
        // debugger;
        const regName = item.Options ? item.Options.RegName : null;
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
    get getSearchColList() {
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
    get getNaviColList() {
        const gg = this.Store.PageView.Forms[this.PageView.ListFormName].Columns.filter(a => a.Search ? true : false);
        const _res = gg.filter(a => { return a.Search.IsNavi; });
        return _res;
    }
    search() {
        // core.alert(this.DataRow);
        // this.emitAppEvent("listpage-search", this.UniId, core.pureObj(this.DataRow));
        this.Store.asyncSearch(this.DataRow);
        // .then(a=>{
        //      // core.alert(a);
        //     // this.Store.PageView.Forms[this.Store.PageView.ListFormName].Columns[1].DisplayName = new Date().toString();
        // });
    }
    colChange(vueObj, val) {
        // debugger;
        this.DataRow[vueObj.ColName] = val;
        // console.log(vueObj.ColName + " = " + val);
        // core.alert(val);
    }
    colNaviChange(vueObj, val) {
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
};
SearchForm = __decorate([
    ioc.PlugIn({ BaseType: "ICom", RegName: "SearchForm" }),
    vue.com(`
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
`, {
        components: { cols }
    }),
    __metadata("design:paramtypes", [Object])
], SearchForm);
export { SearchForm };
