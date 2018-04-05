var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc, vue } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import { BaseCom } from "ak-lib-sys/com/BaseCom";
import BaseComVue from "ak-lib-sys/vuemixin/basecom.vue";
let mixintestPage = class mixintestPage extends BasePage {
    constructor() {
        super(...arguments);
        this.Title = "mixintest";
        this.BaseComObj = null;
    }
    loadPage() {
        //alert();
        this.BaseComObj = new BaseCom({
            UniId: this.UniId
        });
    }
};
mixintestPage = __decorate([
    vue.com(`<div>  
          <h1>mixintestPage</h1>
          <Card>
             <BaseComVue v-if="vm.BaseComObj" :vm="vm.BaseComObj"></BaseComVue>
          </Card>
          
          </div>`, {
        components: {
            BaseComVue
        }
    }),
    ioc.PlugIn({ RegName: "mixintestPage", BaseType: "IPage", CreateDate: "2018-02-27", Doc: "mixintest页面插件" })
], mixintestPage);
export { mixintestPage };
