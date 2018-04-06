var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc, vue } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/basepage";
import React from "react";
import { render } from "react-dom";
import Form from "react-jsonschema-form";
const schema = {
    "title": "一个注册表单",
    "type": "object",
    "required": [
        "firstName",
        "lastName"
    ],
    "properties": {
        "password": {
            "type": "string",
            "title": "密码"
        },
        "lastName": {
            "type": "string",
            "title": "名字"
        },
        "bio": {
            "type": "string",
            "title": "性别"
        },
        "firstName": {
            "type": "string",
            "title": "姓"
        },
        "age": {
            "type": "integer",
            "title": "年龄"
        }
    }
};
const log = (type) => console.log.bind(console, type);
function getElementsByClass(oParent, target) {
    var aEle = oParent.getElementsByTagName('*');
    var aResult = [];
    var reg = new RegExp('\\b' + target + '\\b', 'i');
    var i = 0;
    for (i = 0; i < aEle.length; i++) {
        if (reg.test(aEle[i].className)) {
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}
import reactvue from "ak-lib-react/reactvuemixin";
export const testreactvue = {
    mixins: [reactvue],
    template: '<div></div>'
};
let ReactPage = class ReactPage extends BasePage {
    constructor() {
        super(...arguments);
        this.Title = "ReactPage页面标题";
        this.framework = "fff123";
        this.compiler = "tttt444";
    }
    loadPage() {
    }
    changeTitle() {
        this.Title = new Date().toString();
    }
};
ReactPage = __decorate([
    vue.com(`<div><Card>
vue:<h2>{{vm.Title}}</h2>
react:
<testreactvue :framework="vm.framework"  :compiler="vm.Title"></testreactvue>
react:
<div class="act-react" style="padding:auto;margin:auto;"></div>
</Card></div>`, {
        components: { testreactvue },
        mounted() {
            // alert("ddddd123"); 
            //renderTest(this.$el,{compiler:"tsc",framework:"react"});
            const _dom = getElementsByClass(this.$el, "act-react");
            const _node = () => {
                render((React.createElement("div", null,
                    React.createElement("h2", null, this.vm.Title),
                    React.createElement(Form, { schema: schema, onChange: log("changed"), onSubmit: log("submitted"), onError: log("errors") }),
                    React.createElement("button", { onClick: () => { this.vm.changeTitle(); _node(); } }, "\u4FEE\u6539\u6807\u9898"))), _dom[0]);
            };
            _node();
            //console.log(_node);
        }
    }),
    ioc.PlugIn({ RegName: "ReactPage", BaseType: "IPage", CreateDate: "2018-04-05", Doc: "React页面插件" })
], ReactPage);
export { ReactPage };
