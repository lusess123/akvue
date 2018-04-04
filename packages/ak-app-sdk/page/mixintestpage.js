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
import { BasePage } from "ak-lib-web/basepage";
import { BaseCom } from "ak-lib-sys/com/BaseCom";
import BaseComVue from "ak-lib-sys/vuemixin/basecom.vue";
var mixintestPage = /** @class */ (function (_super) {
    __extends(mixintestPage, _super);
    function mixintestPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Title = "mixintest";
        _this.BaseComObj = null;
        return _this;
    }
    mixintestPage.prototype.loadPage = function () {
        //alert();
        this.BaseComObj = new BaseCom({
            UniId: this.UniId
        });
    };
    mixintestPage = __decorate([
        vue.com("<div>  \n          <h1>mixintestPage</h1>\n          <Card>\n             <BaseComVue v-if=\"vm.BaseComObj\" :vm=\"vm.BaseComObj\"></BaseComVue>\n          </Card>\n          \n          </div>", {
            components: {
                BaseComVue: BaseComVue
            }
        }),
        ioc.PlugIn({ RegName: "mixintestPage", BaseType: "IPage", CreateDate: "2018-02-27", Doc: "mixintest页面插件" })
    ], mixintestPage);
    return mixintestPage;
}(BasePage));
export { mixintestPage };
