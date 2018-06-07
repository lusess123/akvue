var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc, vue, util } from "ak-lib-sys";
import { BizPage } from "../bizpage";
import NaviVue from "./Navi.vue";
import * as vmform from "./vmform/vmform";
//import DragableTable from './../../views/tables/components/dragableTable.vue';
// import tableCol from "./../multi/TableDataCol.vue";
// import  lvForm , {registComponent } from "./../form/form.vue";
let InsertPage = class InsertPage extends BizPage {
    //import DragableTable from './../../views/tables/components/dragableTable.vue';
    // import tableCol from "./../multi/TableDataCol.vue";
    // import  lvForm , {registComponent } from "./../form/form.vue";
    constructor() {
        super(...arguments);
        this.Title = "Insert";
        this.GroupIndex = 0;
        this.DataRow = {};
        this.FormVMObj = null;
        //public vmFormObjList:vmform.VmFormCom[] = [] ;
        this.PageStyle = "insert";
    }
    loadPage() {
        //------------
        super.loadPage();
        this.Title = this.Source.PageView.Title + "  新增";
        this.loadModule();
        // this.vmFormObjList = new vmform.VmFormCom({
        //     UniId:this.UniId ,
        //     action:false,
        //     value:{},
        //     options:[
        //         {
        //             key:"key1",
        //             type:"text",
        //             title:"字段1"
        //         }
        //     ]
        // });
    }
    getColumnByName(name) {
        return this.Store.PageView.Forms[this.Store.PageView.ListFormName].Columns.find(a => a.Name == name);
    }
    createFormVm(group) {
        const _opts = (group.Columns && group.Columns.length) ? group.Columns.map(a => {
            const _col = this.Store.PageView.Forms[this.Store.PageView.ListFormName].Columns.find(c => c.Name == a);
            const _res = {
                key: a,
                type: _col.ControlType,
                title: _col.DisplayName,
                tooltip: _col.DisplayName,
                radioList: this.getSelectList(_col),
                selectList: this.getSelectList(_col)
            };
            return _res;
        }) : [];
        const _rules = {};
        _opts.forEach(p => {
            _rules[p.key] = {
                required: true,
                message: p.title + "不能为空"
            };
        });
        const _res = new vmform.VmFormCom({
            UniId: this.UniId,
            action: false,
            value: this.DataRow,
            options: _opts,
            rules: _rules
        });
        this.FormVMObj = _res;
        return _res;
    }
    getSelectList(col) {
        const _res = [];
        if (col && col.Options && col.Options.RegName) {
            const _table = this.Store.PageView.CodeTables[col.Options.RegName];
            if (_table) {
                for (const n in _table) {
                    _res.push({
                        label: _table[n],
                        value: n
                    });
                }
            }
        }
        return _res;
    }
    get SourceString() {
        // alert();
        // const _a: any = this;
        return util.safeJson(Object.assign({}, this.Source), null, 2);
    }
    get getName() {
        return "123";
    }
    get NaviColumnGroups() {
        // alert("获取");
        return this.Store.getColumnGroupsByPageStyle;
    }
    getNaviColGroupByCOlName(index) {
    }
    next() {
        const _len = this.Store.getColumnGroupsByPageStyle.length;
        this.GroupIndex++;
        if (_len == this.GroupIndex) {
            this.GroupIndex = 0;
        }
    }
};
InsertPage = __decorate([
    vue.com(`<div style="max-width:200rem">
<Card>
<NaviVue :ColumnGroups="vm.NaviColumnGroups"  :GroupIndex="vm.GroupIndex"></NaviVue>

<div style="padding-top:1rem;">
          <Card     v-if="index == vm.GroupIndex"    v-for="(group,index) in  vm.NaviColumnGroups"  >
             <div style="margin:2rem" >${vue.vm("createFormVm(group)")}</div>
          </Card>
</div>
<div  style="text-align: center; padding-top:1rem;">
<Button  @click="vm.next()">下一步</Button>
</div>




</Card>
</div>`, {
        components: {
            // lvForm,
            // DragableTable,
            // tableCol
            NaviVue
        }
    }),
    ioc.PlugIn({ RegName: "InsertPage", BaseType: "IPage", CreateDate: "2018-02-05", Doc: "Insert页面插件" })
], InsertPage);
export { InsertPage };
