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
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
var BaseDomReact = /** @class */ (function (_super) {
    __extends(BaseDomReact, _super);
    function BaseDomReact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BaseDomReact.prototype, "Vm", {
        get: function () {
            return this.props.Vm;
        },
        enumerable: true,
        configurable: true
    });
    BaseDomReact.prototype.render = function () {
        return React.createElement("div", null);
    };
    return BaseDomReact;
}(React.Component));
export { BaseDomReact };
var BaseReactPage = /** @class */ (function (_super) {
    __extends(BaseReactPage, _super);
    function BaseReactPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Title = "reactv";
        _this.$ReactType = BasePageReact;
        return _this;
    }
    BaseReactPage.prototype.loadPage = function () {
    };
    BaseReactPage = __decorate([
        vue.com("<div>reactPage</div>", {
            data: function () {
                return {
                    reactNode: undefined
                };
            },
            mounted: function () {
                this.reactNode = this.getReactType();
                render(React.createElement(this.reactNode, { vm: this.vm }), this.$el);
            },
            methods: {
                getReactType: function () {
                    return this.vm.$ReactType;
                }
            },
            beforeDestroy: function () {
                this.reactNode = undefined;
                unmountComponentAtNode(this.$el);
            },
            updated: function () {
                if (this.reactNode) {
                    this.reactNode.forceUpdate();
                }
            }
        }),
        ioc.PlugIn({ RegName: "reactpage", BaseType: "IPage", CreateDate: "2018-04-06", Doc: "reactv页面插件" })
    ], BaseReactPage);
    return BaseReactPage;
}(BasePage));
export { BaseReactPage };
var BasePageReact = /** @class */ (function (_super) {
    __extends(BasePageReact, _super);
    function BasePageReact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BasePageReact;
}(BaseDomReact));
export { BasePageReact };
