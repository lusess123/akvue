var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ioc, vue } from "ak-lib-sys";
import { BaseCom } from "ak-lib-sys/com/basecom";
let TabSelectorCom = class TabSelectorCom extends BaseCom {
    constructor(config) {
        super(config);
    }
};
TabSelectorCom = __decorate([
    ioc.PlugIn({ RegName: "TabSelectorCol", BaseType: "BaseCom", CreateDate: "2018-01-31", Doc: "TabSelector组件插件" }),
    vue.com(`<div>
<Tabs value="name1">
<TabPane label="标签一" name="name1">标签一的内容</TabPane>
<TabPane label="标签二" name="name2">标签二的内容</TabPane>
<TabPane label="标签三" name="name3">标签三的内容</TabPane>
</Tabs></div>`),
    __metadata("design:paramtypes", [Object])
], TabSelectorCom);
export { TabSelectorCom };
