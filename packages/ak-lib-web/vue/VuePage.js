var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc, vue } from "ak-lib-sys";
import { BasePage } from "./../basepage";
import Vue from "vue";
var VuePage = /** @class */ (function (_super) {
    __extends(VuePage, _super);
    function VuePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Title = "Vue";
        _this.VueName = "";
        return _this;
    }
    VuePage.prototype.loadPage = function () {
        var _vueName = this.P1;
        if (_vueName) {
            // debugger;
            var _vueObj = ioc.getType("vue", _vueName);
            if (_vueObj) {
                this.VueName = vue.getTempVueName(_vueObj, _vueName);
                // alert(this.VueName);
                Vue.component(this.VueName, _vueObj);
            }
            //this.forceUpdate();
        }
    };
    VuePage = __decorate([
        vue.com("<div>\n               <div  v-if=\"vm.VueName\" :is=\"vm.VueName\"></div>\n               <div v-else>\n               <Spin size=\"large\"></Spin>\n               \u627E\u4E0D\u5230\u6CE8\u518C\u540D\u4E3A{{vm.P1}}\u7684vue\u7EC4\u4EF6\n               <Spin size=\"large\"></Spin>\n               </div>\n               </div>"),
        ioc.PlugIn({ RegName: "vue", BaseType: "IPage", CreateDate: "2018-02-05", Doc: "Vue页面插件" })
    ], VuePage);
    return VuePage;
}(BasePage));
export { VuePage };
