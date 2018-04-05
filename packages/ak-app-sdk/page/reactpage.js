var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc, vue } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import { renderTest } from "ak-lib-react/testdom";
let ReactPage = class ReactPage extends BasePage {
    constructor() {
        super(...arguments);
        this.Title = "React";
    }
    loadPage() {
    }
};
ReactPage = __decorate([
    vue.com(`<div>ReactPage</div>`, {
        mounted() {
            // alert("ddddd123");
            renderTest(this.$el, { compiler: "tsc", framework: "react" });
        }
    }),
    ioc.PlugIn({ RegName: "ReactPage", BaseType: "IPage", CreateDate: "2018-04-05", Doc: "React页面插件" })
], ReactPage);
export { ReactPage };
