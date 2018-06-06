var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BasePage } from "./basepage";
import { core, ioc, vue, util } from "ak-lib-sys";
//import { IAPP } from "../../mock/management/app";
//import { fail } from "assert";
debugger;
let DefultPage = class DefultPage extends BasePage {
    constructor() {
        super(...arguments);
        //_VueObj : any  = _vue;
        this.Title = "系统默认页面";
        this.IsNoAppList = false;
        this.Columns = [
            {
                title: "接口/契约", key: "BaseType"
            },
            { title: "插件注册名称", key: "RegName" },
            { title: "作者", key: "Author" },
            { title: "创建时间", key: "CreatDate" },
            { title: "注释", key: "Message" },
            {
                title: "操作", key: "opt",
                render: (h, params) => {
                    const _regName = params.row["RegName"].toLowerCase();
                    const _base = params.row["BaseType"];
                    const _vm = this.getPagePath(_base, _regName);
                    return vue.tpl(h)(`
              <div>
               <router-link :to="{path:vm.Path}"  ><Button  v-if='vm.Path != "" '>{{vm.Text}}</Button></router-link>
              </div>
         `, {
                        Val: _base,
                        RegName: _regName,
                        Path: _vm.Path,
                        Text: _vm.Text
                        // IsPage:  params.row[params.column.key] == "IPage"
                    });
                }
            },
        ];
    }
    pagesInfo() {
        const _mo = ioc.Ioc.Current().IocModel();
        return core.json(_mo);
    }
    pageList() {
        if (!this.fPlugList) {
            const _mo = ioc.Ioc.Current().IocModel();
            // core.log(_mo,{info:"插件信息 ： ",sign:"app"});
            let _res = [];
            for (const n in _mo) {
                _res.push(_mo[n]);
            }
            _res = _res.sort(util.sortBy("BaseType", 1));
            this.fPlugList = _res;
        }
        return this.fPlugList;
    }
    appList() {
        if (!this.fPlugList) {
            this.pageList();
        }
        const _res = this.fPlugList.filter(a => a.BaseType == "IApp");
        const _apps = _res.map(info => {
            return ioc.Ioc.Current().FetchInstance(info.RegName, "IApp");
        });
        // core.alert(_apps);
        return _apps;
    }
    getPageName() {
        // alert(this.PageName);
        return this.PageName ? this.PageName.toLowerCase() : "defaultpage";
    }
    getPagePath(name, regName) {
        switch (name) {
            case "IPage":
                return { Path: "/web/" + regName, Text: "页面跳转" };
            case "ISource":
                return { Path: "/web/listpage/" + regName, Text: "业务模块搜索" };
            case "vue":
                return { Path: "/web/vue/" + regName, Text: "vue无参数组件" };
            default:
                break;
        }
        return { Path: "", Text: "" };
    }
};
DefultPage = __decorate([
    ioc.PlugIn({ BaseType: "IPage", RegName: "defaultpage" }),
    vue.com(`
<div>
   <Card>
   <h1 v-if="vm.getPageName() != 'defaultpage'"><Icon type="sad-outline"></Icon> 找不到名称为：  <b>{{vm.PageName}}</b>  的页面</h1>
   
   <Card>
   <h1 slot="title">以下是所有的插件：</h1>
   <Table   size="large" stripe  :columns="vm.Columns" :data="vm.pageList()"></Table>
  </Card>
  </Card>
</div>
`)
], DefultPage);
export { DefultPage };
