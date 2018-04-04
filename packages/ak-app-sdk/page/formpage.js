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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
import lvForm from "ak-lib-comp/complex/form.vue";
//import JsonEditor from 'vue-json-edit'
//Vue.use(JsonEditor)
var FormPage = /** @class */ (function (_super) {
    __extends(FormPage, _super);
    function FormPage(a) {
        var _this = _super.call(this, a) || this;
        _this.Title = "Form";
        _this.DataRowJson = null;
        _this.OptionJson = null;
        _this.DataRow = { text: "文本默认值", cascader: {}, apps: {} };
        _this.FormOpt = [
            {
                key: "text",
                title: "文本框",
                type: "text"
            }
        ];
        _this.IsAction = true;
        _this.actionChange.bind(_this);
        return _this;
        //this.createOptData();
    }
    FormPage.prototype.loadPage = function () {
        this.createOptData();
    };
    FormPage.prototype.createOptData = function () {
        var _opts = [];
        for (var _col in ColTypeDict) {
            var col = ColTypeDict[_col];
            var _opt = {
                key: col[0],
                title: (col[1] ? col[1] : col[0]) + 1,
                type: col[0],
            };
            var _opt2 = __assign({}, _opt, col[2]);
            _opts.push(_opt2);
        }
        // core.alert(_opts);
        this.FormOpt = _opts.slice();
        this.OptionJson = core.json(this.FormOpt, null, 2);
    };
    FormPage.prototype.actionChange = function () {
        core.alert(this.IsAction);
    };
    FormPage = __decorate([
        vue.com("<div>\n<Row>\n<Col span=\"8\">\n<Card style=\"height:700px;overflow-y: auto;\">\n<h2 slot=\"title\">\u52A8\u6001\u8868\u5355demo</h2>\n<lvForm :value=\"vm.DataRow\"  :options=\"vm.FormOpt\"  :action=\"vm.IsAction\" ></lvForm>\n</Card>\n</Col>\n<Col span=\"6\" style=\"height:700px;overflow-y: auto;\">\n<h2>\n\u6570\u636E\n<Card>\n<h2 slot=\"title\">\u53C2\u6570\u8BBE\u7F6E</h2>\n<div>\n   \u662F\u5426\u6709\u6309\u94AE\uFF1A <i-switch v-model=\"vm.IsAction\" ></i-switch>\n</div>\n</Card>\n<Card >\n   <h2 slot=\"title\">DataRow</h2>\n   <JsonEditor  :objData=\"vm.DataRow\" v-model=\"vm.DataRow\" ></JsonEditor>\n</Card>\n\n</h2>\n</Col>\n<Col span=\"10\" style=\"height:700px;overflow-y: auto;\">\n<Card>\n   <h2 slot=\"title\">Options</h2>\n   \n  \n</Card>\n</Col>\n</Row>\n  \n\n</div>", {
            components: {
                lvForm: lvForm
            },
            created: function () {
                this.$watch(function () {
                    return core.json(this.vm.DataRow, null, 2);
                }, function (a, b) {
                    // alert(b  + " 变成了 " + a);
                    this.vm.DataRowJson = a;
                });
            }
        }),
        ioc.PlugIn({ RegName: "FormPage", BaseType: "IPage", CreateDate: "2018-02-22", Doc: "Form页面插件" }),
        __metadata("design:paramtypes", [Object])
    ], FormPage);
    return FormPage;
}(BasePage));
export { FormPage };
var ColTypeDict = {
    Text: ["text", "文本框"],
    select: ["select", ""],
    mutiselect: ["mutiselect", ""],
    datetime: ["datetime", ""],
    checkbox: ["checkbox", ""],
    radio: ["radio", ""],
    number: ["number", ""],
    textarea: ["textarea", ""],
    select2: ["select2", ""],
    date: ["date", ""],
    markdown: ["markdown", ""],
    cascader: ["cascader", ""],
    apps: ["apps", ""],
    switch: ["switch", "", {
            trueOpt: {},
            falseOpt: {}
        }],
    "switch-tag": ["switch-tag", ""],
    user: ["user", ""],
    users: ["users", ""],
    devices: ["devices", ""],
    label: ["label", ""],
    TableData: ["TableData", ""]
};
