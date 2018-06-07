var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseCom } from "ak-lib-sys/com/basecom";
import { vue, core } from "ak-lib-sys";
let BasePage = class BasePage extends BaseCom {
    constructor(config) {
        super(config);
        this.PageName = "";
        // public _VueObj : any ;
        this.IsSingle$ = true;
        if (config && config.UniId) {
            this.UniId = config.UniId;
        }
        else {
            this.UniId = "BasePage" + core.getUniId();
        }
    }
    loadPage() {
    }
    sysloadPage() {
        this.loadPage();
    }
    reset(pagename, p1, p2, p3) {
        this.PageName = pagename,
            this.P1 = p1,
            this.P2 = p2,
            this.P3 = p3;
        //alert(this.PageName); 
    }
};
BasePage = __decorate([
    vue.com(`
      <div>页面组件：{{vm.PageName}}</div>
`),
    __metadata("design:paramtypes", [Object])
], BasePage);
export { BasePage };
