var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ioc } from "ak-lib-sys";
import { BaseReactPage, BaseDomReact } from "ak-lib-react-web/basereactpage";
import React from "react";
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css'; // 统一引入样式
import Result from 'ant-design-pro/lib/Result';
import Row from 'antd/lib/row';
import Col from "antd/lib/col";
export class AA extends React.Component {
    render() {
        return React.createElement("div", null, this.props.aaa1);
    }
}
export const component = (p) => {
    return React.createElement("div", null,
        p.pro1,
        "-",
        p.pro2);
};
function Custom(props) {
    // props以函数参数的形式传递
    return (React.createElement("div", null,
        "This is a functional component, ",
        props.name));
}
export class ReactDemo2PageReact extends BaseDomReact {
    render() {
        return React.createElement("div", null,
            "ReactDemoPage2React",
            new Date().toString(),
            this.Vm.Pro1,
            React.createElement(Result, { type: 'success', title: 'antdesigner' }),
            React.createElement("div", null,
                React.createElement(Row, null,
                    React.createElement(Col, { span: 12 },
                        " ",
                        React.createElement(LoginDemo, null)),
                    React.createElement(Col, { span: 12 })),
                React.createElement(Row, null,
                    React.createElement(Table, { columns: columns, dataSource: data, scroll: { x: 1500, y: 300 } })),
                React.createElement(AA, { aaa1: "aaaa" }),
                React.createElement(Custom, null)));
    }
}
let ReactDemo2Page = class ReactDemo2Page extends BaseReactPage {
    constructor() {
        super(...arguments);
        this.Title = "ReactDemoPage2";
        this.$ReactType = ReactDemo2PageReact;
        this.Pro1 = "rrfff1233222";
    }
    loadPage() {
    }
};
ReactDemo2Page = __decorate([
    ioc.PlugIn({ RegName: "ReactDemo2Page", BaseType: "IPage", CreateDate: "2018-04-07", Doc: "ReactDemoPage2页面插件" })
], ReactDemo2Page);
export { ReactDemo2Page };
import Login from 'ant-design-pro/lib/Login';
import { Alert, Checkbox } from 'antd';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;
class LoginDemo extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            notice: '',
            type: 'tab2',
            autoLogin: true,
        };
        this.onSubmit = (err, values) => {
            console.log('value collected ->', Object.assign({}, values, { autoLogin: this.state.autoLogin }));
            if (this.state.type === 'tab1') {
                this.setState({
                    notice: '',
                }, () => {
                    if (!err && (values.username !== 'admin' || values.password !== '888888')) {
                        setTimeout(() => {
                            this.setState({
                                notice: 'The combination of username and password is incorrect!',
                            });
                        }, 500);
                    }
                });
            }
        };
        this.onTabChange = (key) => {
            this.setState({
                type: key,
            });
        };
        this.changeAutoLogin = (e) => {
            this.setState({
                autoLogin: e.target.checked,
            });
        };
    }
    render() {
        return (React.createElement(Login, { defaultActiveKey: this.state.type, onTabChange: this.onTabChange, onSubmit: this.onSubmit },
            React.createElement(Tab, { key: "tab1", tab: "Account" },
                this.state.notice &&
                    React.createElement(Alert, { style: { marginBottom: 24 }, message: this.state.notice, type: "error", showIcon: true, closable: true }),
                React.createElement(UserName, { name: "username" }),
                React.createElement(Password, { name: "password" })),
            React.createElement(Tab, { key: "tab2", tab: "Mobile" },
                React.createElement(Mobile, { name: "mobile" }),
                React.createElement(Captcha, { onGetCaptcha: () => console.log('Get captcha!'), name: "captcha" })),
            React.createElement("div", null,
                React.createElement(Checkbox, { checked: this.state.autoLogin, onChange: this.changeAutoLogin }, "Keep me logged in"),
                React.createElement("a", { style: { float: 'right' }, href: "" }, "Forgot password")),
            React.createElement(Submit, null, "Login"),
            React.createElement("div", null,
                "Other login methods",
                React.createElement("span", { className: "icon icon-alipay" }),
                React.createElement("span", { className: "icon icon-taobao" }),
                React.createElement("span", { className: "icon icon-weibo" }),
                React.createElement("a", { style: { float: 'right' }, href: "" }, "Register"))));
    }
}
import Table from 'antd/lib/table';
const fixedvalue = "right";
const columns = [
    { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name' },
    { title: 'Age', width: 100, dataIndex: 'age', key: 'age' },
    { title: 'Column 1', dataIndex: 'address', key: '1', width: 150, fixed: fixedvalue },
    { title: 'Column 2', dataIndex: 'address', key: '2', width: 150, fixed: fixedvalue },
    { title: 'Column 3', dataIndex: 'address', key: '3', width: 150, fixed: fixedvalue },
    { title: 'Column 4', dataIndex: 'address', key: '4', width: 150, fixed: fixedvalue },
    { title: 'Column 5', dataIndex: 'address', key: '5', width: 150, fixed: fixedvalue },
    { title: 'Column 6', dataIndex: 'address', key: '6', width: 150, fixed: fixedvalue },
    { title: 'Column 7', dataIndex: 'address', key: '7', width: 150, fixed: fixedvalue },
    { title: 'Column 8', dataIndex: 'address', key: '8' },
    {
        title: 'Action',
        key: 'operation',
        fixed: fixedvalue,
        width: 100,
        render: () => React.createElement("a", { href: "#" }, "action"),
    },
];
const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}
//ReactDOM.render(<Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />, mountNode);
