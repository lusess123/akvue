var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc, vue } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
let BizPage = class BizPage extends BasePage {
    constructor() {
        super(...arguments);
        this.Title = "ak-lib-biz";
        this.Source = null;
    }
    loadPage() {
        let _sourceName = this.P1;
        _sourceName = _sourceName ? _sourceName : "BaseSource";
        const _source = ioc.Ioc.Current().FetchInstance(_sourceName, "ISource");
        _source.initData();
        this.Source = _source;
        // alert("load page after");
    }
    loadModule() {
        this.pRegisterModule(_getNewModule(this.Source));
        //window["ss"] = this ;
    }
    get getVuexSource() {
        return this.getModuleState();
    }
    get Store() {
        return this.getModuleState();
    }
};
BizPage = __decorate([
    vue.com(`<div>BizPage</div>`),
    ioc.PlugIn({ RegName: "ak-lib-bizPage", BaseType: "IPage", CreateDate: "2018-02-05", Doc: "ak-lib-biz页面插件" })
], BizPage);
export { BizPage };
const _getNewModule = (source) => {
    return {
        state: source
    };
};
