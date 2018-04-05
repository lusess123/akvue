var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { core, ioc, vue } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import Vue from "vue";
let DymicPage = class DymicPage extends BasePage {
    constructor() {
        super(...arguments);
        this.Title = "Dymic";
        this.Tpl1 = vue.cvue({ a: 123456 })("<a >{{vm.a}}</a>");
        this.Tpl2 = Tpl_1({ Name: "dd", fun: () => { alert(123); core.alert(this.Title); } });
        this.Tpl3 = vue.cvue({ a: 123456, b: this })("<a >{{vm.a}}{{vm.b.Title}}</a>");
        this.cc = undefined;
    }
    loadPage() {
        this.cc = new View("1", "2");
        const fff = this.ggg `123`;
        console.log(fff);
        core.alert(fff);
    }
    ggg(placeholders) {
        return placeholders;
    }
    fff() {
        return new Date().toString();
    }
    gg() {
        return new View("1", "2");
    }
    get getcc() {
        return this.cc.Title;
    }
};
__decorate([
    vue.compute(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DymicPage.prototype, "getcc", null);
DymicPage = __decorate([
    vue.com(`<div>
<Card>
<h3  slot="title">
Tpl1{{vm.fff()}}|
{{getcc}}
</h3>
${vue.vm("Tpl1")}
${vue.vm("Tpl2")}
${vue.vm("Tpl3")}
view1:
<View1 :vm="{Title:'aaa',DemoName:'bbb'}" Pro="terterter123"></View1>
<View2 :vm="{Title:'aaa',DemoName:'bbb'}" Pro="vbvbvb"></View2>
<View2 :vm="vm.cc" Pro="vbvbvb"></View2>
<View2 :vm="vm.gg()" Pro="cc"></View2>
</Card>
</div>`, {
        data() {
            return {
                vf: new View("aaa", "bbb")
            };
        }
    }),
    ioc.PlugIn({ RegName: "DymicPage", BaseType: "IPage", CreateDate: "2018-02-06", Doc: "Dymic页面插件" })
], DymicPage);
export { DymicPage };
import view1 from "./view/demoView.vue";
Vue.component("View1", view1);
import view2 from "./view/demoView2.vue";
Vue.component("View2", view2);
const Tpl_1 = (vm) => {
    return vue.cvue(vm)(`
          <Button @click.prevent="vm.fun.call(vm)">{{vm.Name}}</Button>
    `);
    ;
};
let res;
let _params = [];
const fun1 = (a) => {
    _params.push(a);
    // const _fun = _params.push.bind(_params);
    return fun1;
};
fun1("a")("b")("c");
if (_params.length == 1) {
    res = "a";
}
if (_params.length == 2) {
    res = "a" + "b";
}
class View {
    constructor(Title, DemoName) {
        this.Title = Title;
        this.DemoName = DemoName;
    }
    change() {
        this.Title = new Date().toString() + "title";
    }
}
//core.alert(res);
