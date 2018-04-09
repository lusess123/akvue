

import { core, ioc, vue, util } from "ak-lib-sys";
import { BasePage } from "ak-lib-web/BasePage";
import { BaseReactPage, BaseDomReact } from "ak-lib-react-web/basereactpage";
import React, { Component } from "react";
import 'antd/dist/antd.css'
import 'ant-design-pro/dist/ant-design-pro.css'; // 统一引入样式
import Result from 'ant-design-pro/lib/Result';
import Row from 'antd/lib/row';
import Col from "antd/lib/col";



export class ReactDemo2PageReact extends BaseDomReact<ReactDemo2Page>{
    render() {
        return <div>
            ReactDemoPage2React{new Date().toString()}
            {this.Vm.Pro1}
            <Result type='success' title='antdesigner'></Result>
            <div>
                <Row>
                    <Col span={12}> <LoginDemo /></Col>
                    <Col span={12}></Col>
                </Row>
                <Row>
                    <Table columns={columns}   dataSource={data} scroll={{ x: 1500, y: 300 }} />
                </Row>
            </div>

        </div>;
    }

}



@ioc.PlugIn({ RegName: "ReactDemo2Page", BaseType: "IPage", CreateDate: "2018-04-07", Doc: "ReactDemoPage2页面插件" })
export class ReactDemo2Page extends BaseReactPage {

    public Title: string = "ReactDemoPage2";
    $ReactType: any = ReactDemo2PageReact;
    Pro1: string = "rrfff1233222";
    protected loadPage() {

    }

}


import Login from 'ant-design-pro/lib/Login';
import { Alert, Checkbox } from 'antd';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

class LoginDemo extends React.Component {
    state = {
        notice: '',
        type: 'tab2',
        autoLogin: true,
    }
    onSubmit = (err, values) => {
        console.log('value collected ->', { ...values, autoLogin: this.state.autoLogin });
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
    }
    onTabChange = (key) => {
        this.setState({
            type: key,
        });
    }
    changeAutoLogin = (e) => {
        this.setState({
            autoLogin: e.target.checked,
        });
    }
    render() {
        return (
            <Login
                defaultActiveKey={this.state.type}
                onTabChange={this.onTabChange}
                onSubmit={this.onSubmit}
            >
                <Tab key="tab1" tab="Account">
                    {
                        this.state.notice &&
                        <Alert style={{ marginBottom: 24 }} message={this.state.notice} type="error" showIcon closable />
                    }
                    <UserName name="username" />
                    <Password name="password" />
                </Tab>
                <Tab key="tab2" tab="Mobile">
                    <Mobile name="mobile" />
                    <Captcha onGetCaptcha={() => console.log('Get captcha!')} name="captcha" />
                </Tab>
                <div>
                    <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>Keep me logged in</Checkbox>
                    <a style={{ float: 'right' }} href="">Forgot password</a>
                </div>
                <Submit>Login</Submit>
                <div>
                    Other login methods
          <span className="icon icon-alipay" />
                    <span className="icon icon-taobao" />
                    <span className="icon icon-weibo" />
                    <a style={{ float: 'right' }} href="">Register</a>
                </div>
            </Login>
        );
    }
}


import Table from 'antd/lib/table';

const fixedvalue :boolean | "left" | "right" = "right";

const columns  = [
    { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name' },
    { title: 'Age', width: 100, dataIndex: 'age', key: 'age' },
    { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 ,fixed:fixedvalue},
    { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 ,fixed:fixedvalue},
    { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 ,fixed:fixedvalue},
    { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 ,fixed:fixedvalue},
    { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 ,fixed:fixedvalue},
    { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 ,fixed:fixedvalue},
    { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 ,fixed:fixedvalue},
    { title: 'Column 8', dataIndex: 'address', key: '8' },
    {
        title: 'Action',
        key: 'operation',
         fixed: fixedvalue,
        width: 100,
        render: () => <a href="#">action</a>,
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

