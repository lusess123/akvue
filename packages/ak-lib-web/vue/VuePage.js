var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc, vue } from "ak-lib-sys";
import { BasePage } from "./../basepage";
import Vue from "vue";
let VuePage = class VuePage extends BasePage {
    constructor() {
        super(...arguments);
        this.Title = "Vue";
        this.VueName = "";
    }
    loadPage() {
        const _vueName = this.P1;
        if (_vueName) {
            // debugger;
            const _vueObj = ioc.getType("vue", _vueName);
            if (_vueObj) {
                this.VueName = vue.getTempVueName(_vueObj, _vueName);
                // alert(this.VueName);
                Vue.component(this.VueName, _vueObj);
            }
            //this.forceUpdate();
        }
    }
};
VuePage = __decorate([
    vue.com(`<div>
               <div  v-if="vm.VueName" :is="vm.VueName"></div>
               <div v-else>
               <Spin size="large"></Spin>
               找不到注册名为{{vm.P1}}的vue组件
               <Spin size="large"></Spin>
               </div>
               </div>`),
    ioc.PlugIn({ RegName: "vue", BaseType: "IPage", CreateDate: "2018-02-05", Doc: "Vue页面插件" })
], VuePage);
export { VuePage };
