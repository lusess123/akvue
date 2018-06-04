/// <reference types="react" />
import { BaseReactPage, BaseDomReact } from "ak-lib-react-web/basereactpage";
import React from "react";
import 'antd/dist/antd.css';
import 'ant-design-pro/dist/ant-design-pro.css';
export interface Iaa {
    aaa1: string;
}
export declare class AA extends React.Component<Iaa, any> {
    render(): JSX.Element;
}
export declare const component: React.SFC<{
    pro1: string;
    pro2: number;
}>;
export declare class ReactDemo2PageReact extends BaseDomReact<ReactDemo2Page> {
    render(): JSX.Element;
}
export declare class ReactDemo2Page extends BaseReactPage {
    Title: string;
    $ReactType: any;
    Pro1: string;
    protected loadPage(): void;
}
