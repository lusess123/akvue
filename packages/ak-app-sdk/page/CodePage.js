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
import { BasePage } from "ak-lib-web/basepage";
import { ioc, vue, util } from "ak-lib-sys";
var CodePage = /** @class */ (function (_super) {
    __extends(CodePage, _super);
    function CodePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Name = "";
        _this.Code = "";
        _this.CodeType = "";
        _this.Title = "代码生成";
        _this.MesgList = {
            List: [
                "code",
                "分成 分页，表格，按钮"
            ]
        };
        return _this;
    }
    CodePage.prototype.loadPage = function () {
        this.CodeType = this.P1 ? this.P1 : "com";
        this.Name = this.P2 ? this.P2 : "XXX";
        this.change();
    };
    CodePage.prototype.change = function () {
        this.Code = codeDict[this.CodeType.toLocaleLowerCase()](this.Name);
    };
    CodePage = __decorate([
        ioc.PlugIn({ BaseType: "IPage", RegName: "CodePage", Doc: "代码生成页面" }),
        vue.com("\n  <Card>\n     <row  slot=\"title\"> \n     <RadioGroup v-model=\"vm.CodeType\" size=\"large\"  @on-change=\"vm.change()\"  >\n     <Radio label=\"com\">\n         <Icon type=\"social-apple\"></Icon>\n         <span>\u7EC4\u4EF6</span>\n     </Radio>\n     <Radio label=\"col\">\n         <Icon type=\"social-android\"></Icon>\n         <span>\u63A7\u4EF6</span>\n     </Radio>\n     <Radio label=\"page\">\n         <Icon type=\"social-windows\"></Icon>\n         <span>\u9875\u9762</span>\n     </Radio>\n </RadioGroup>\n     <Input  v-model=\"vm.Name\"  @on-change=\"vm.change()\"   placeholder=\"Enter \u540D\u79F0...\" ></Input>\n     </row>\n     <Card>\n     <Input v-model=\"vm.Code\" type=\"textarea\" :rows=\"50\" placeholder=\"Enter \u4EE3\u7801...\"></Input>\n     </Card>\n  </Card>\n")
    ], CodePage);
    return CodePage;
}(BasePage));
export { CodePage };
var _comFun = function (XXX) {
    return "\n  \n    import { core ,ioc,vue } from \"ak-lib-sys\";\n    import {BaseCom,IBaseComConfig} from \"ak-lib-sys/com/BaseCom\";\n\n    export interface I" + XXX + "ComConfig extends IBaseComConfig{\n   \n    }\n\n    @ioc.PlugIn({RegName:\"" + XXX + "Col\",BaseType:\"BaseCom\",CreateDate:\"" + util.formatDate(new Date(), "yyyy-MM-dd") + "\",Doc:\"" + XXX + "\u7EC4\u4EF6\u63D2\u4EF6\"})\n\n    @vue.com(`<div>" + XXX + "Com</div>`)\n    export   class " + XXX + "Com extends BaseCom {\n\n      constructor (config?: I" + XXX + "ComConfig){\n          super(config);\n      }\n\n    }\n";
};
var _colFun = function (XXX) {
    return "\n    import { core ,ioc,vue } from \"ak-lib-sys\";\n    import {BaseCol,IBaseColConfig}  from \"./BaseCol\"\n    \n    export interface I" + XXX + "ColConfig extends IBaseColConfig{\n       \n    }\n     \n    @ioc.PlugIn({RegName:\"" + XXX + "Col\",BaseType:\"BaseCol\",Author:\"zhengyukun\",CreateDate:\"" + util.formatDate(new Date(), "yyyy-MM-dd") + "\",Doc:\"" + XXX + "Col\u63A7\u4EF6\u63D2\u4EF6\"})\n    @vue.com(`<div>" + XXX + "Col</div>`)\n    export   class " + XXX + "Col extends BaseCol {\n    \n          constructor (config?: I" + XXX + "ColConfig){\n              super(config);\n          }\n    \n    }\n";
};
var _pageFun = function (XXX) {
    return "  \n   \n    import { core, ioc, vue, util } from \"ak-lib-sys\";\n    import { BasePage } from \"ak-lib-web/BasePage\";\n\n    @vue.com(`<div>" + XXX + "Page</div>`)\n    @ioc.PlugIn({  RegName: \"" + XXX + "Page\", BaseType: \"IPage\", CreateDate:\"" + util.formatDate(new Date(), "yyyy-MM-dd") + "\", Doc: \"" + XXX + "\u9875\u9762\u63D2\u4EF6\" })\n    export class " + XXX + "Page extends BasePage {\n         \n        public Title :string = \"" + XXX + "\";\n        protected loadPage() {\n\n        }\n\n    }\n";
};
var codeDict = {
    com: _comFun,
    col: _colFun,
    page: _pageFun
};
