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
import Vue from 'vue';
import Component from 'vue-class-component';
import { ioc } from "ak-lib-sys";
import normalvue from "./view/normalvue.vue";
var BaseVueDom = /** @class */ (function (_super) {
    __extends(BaseVueDom, _super);
    function BaseVueDom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BaseVueDom.prototype, "computedMsg", {
        get: function () {
            return new Date().toString();
        },
        enumerable: true,
        configurable: true
    });
    BaseVueDom = __decorate([
        Component
    ], BaseVueDom);
    return BaseVueDom;
}(Vue));
export { BaseVueDom };
var VuePage = /** @class */ (function (_super) {
    __extends(VuePage, _super);
    function VuePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // initial data
        _this.msg = 123;
        // use prop values for initial data
        _this.helloMsg = 'Hello, ' + _this["propMessage"];
        _this.NormalVueVm = { aaa: "NormalVueVm" };
        return _this;
    }
    // lifecycle hook
    VuePage.prototype.mounted = function () {
        // this.greet()
    };
    // computed
    // method
    VuePage.prototype.greet = function () {
        alert('greeting: ' + this.msg);
        this.NormalVueVm.aaa = "123";
    };
    Object.defineProperty(VuePage.prototype, "computedMsg1", {
        get: function () {
            return new Date().toString();
        },
        enumerable: true,
        configurable: true
    });
    VuePage = __decorate([
        ioc.PlugIn({ RegName: "VuePage", BaseType: "vue", CreateDate: "2018-02-01", Doc: "VuePage" }),
        Component({
            template: "\n   \n    <div>\n      <input v-model=\"msg\">\n      <p>prop: {{propMessage}}</p>\n      <p>msg: {{msg}}</p>\n      <p>helloMsg: {{helloMsg}}</p>\n      <p>computed msg: {{computedMsg}}</p>\n      <p>computed msg1: {{computedMsg1}}</p>\n      <button @click=\"greet\">Greet</button>\n      <hr/>\n       <Card><div  :is=\"'normalvue'\" :vm=\"NormalVueVm\"></div></Card>\n    </div>\n \n    ",
            props: {
                propMessage: String
            },
            components: {
                normalvue: normalvue
            }
        })
    ], VuePage);
    return VuePage;
}(BaseVueDom));
export { VuePage };
