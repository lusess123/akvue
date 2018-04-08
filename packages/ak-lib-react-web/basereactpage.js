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
export class BaseDomReact extends React.Component {
    get Vm() {
        // alert(123);
        return this.props.Vm;
    }
    render() {
        return React.createElement("div", null);
    }
}
let BaseReactPage = class BaseReactPage extends BasePage {
    constructor() {
        super(...arguments);
        this.Title = "reactv";
        this.$ReactType = BasePageReact;
    }
    loadPage() {
    }
};
BaseReactPage = __decorate([
    vue.com(`<div>reactPage</div>`, {
        data: function () {
            return {
                reactNode: undefined
            };
        },
        mounted() {
            this.reactNode = this.getReactType();
            render(React.createElement(this.reactNode, { Vm: this.vm }), this.$el);
        },
        methods: {
            getReactType() {
                return this.vm.$ReactType;
            }
        },
        beforeDestroy() {
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
export { BaseReactPage };
export class BasePageReact extends BaseDomReact {
}
