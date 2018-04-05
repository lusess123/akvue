var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc, vue } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import { eventShowComFactory } from "./eventbuspage";
export class TestVmBasePage extends BasePage {
    pageMethod1(d) {
        alert("父类  TestVmBasePage.pageMethod1" + d.toString());
    }
}
let testvmPage = class testvmPage extends TestVmBasePage {
    constructor() {
        super(...arguments);
        this.Title = "testvm";
        this.TableObj = null;
    }
    setTableObj() {
        this.TableObj = eventShowComFactory(this.getEvent().showAllEvent(), this.UniId, "<p>消息总线</p>");
    }
    loadPage() {
        this.setTableObj();
    }
    pageMethod1(d) {
        //  alert(d);
        super.pageMethod1(d);
        alert("子类   testvmPage.pageMethod1" + d.toString());
        this.callUpdate();
    }
    callUpdate() {
        const _this = this;
        // window["xxx"] =eventBus.GetAppEvent();
        // alert("更新组件");
        //  this.forceUpdate();
        // const _ff =  this.getEvent().showAllEvent();
        // core.alert(_ff);
        // core.alert(this.renderString());
    }
    getThisStr() {
        const _vm = this;
        const _obj = Object.assign({}, _vm, { $store: null }, { fLoacalEventBus: null });
        return "";
        // return util2.inspect(_obj);
        //return getPropertyNames(_obj);
    }
};
testvmPage = __decorate([
    vue.com(`<div>

<h1>{{vm.Title}}</h1>
<h2>{{new Date()}}</h2>
<Button @click='vm.pageMethod1(new Date())'>com调用vm的函数</Button>
${vue.vm("TableObj")}
<pre>
<code>{{vm.getThisStr()}}</code>
</pre>
</div>`, {
        mounted() {
            this.vm.setTableObj();
        }
    }),
    ioc.PlugIn({ RegName: "testvmPage", BaseType: "IPage", CreateDate: "2018-03-02", Doc: "testvm页面插件" })
], testvmPage);
export { testvmPage };
