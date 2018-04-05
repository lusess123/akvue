var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc, vue } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
//import {Container} from "typedi";
let DiPage = class DiPage extends BasePage {
    //import {Container} from "typedi";
    constructor() {
        super(...arguments);
        this.Title = "Di";
        this.IsPage = "";
    }
    loadPage() {
        // core
        // let someClass1 = Container.get(SomeClass);
        // someClass1.someMethod();
        // let someClass2 = Container.get(SomeClass);
        // this.IsPage = someClass1 === someClass2 ? "同一个":"不同个"
    }
};
DiPage = __decorate([
    vue.com(`<div>DiPage{{vm.IsPage}}</div>`),
    ioc.PlugIn({ RegName: "DiPage", BaseType: "IPage", CreateDate: "2018-02-04", Doc: "Di页面插件" })
], DiPage);
export { DiPage };
class SomeClass {
    someMethod() {
        // alert(123);
    }
}
//someClass.someMethod();
