/// <reference types="react" />
import { BasePage } from "ak-lib-web/basepage";
import React from "react";
export declare class BaseDomReact<T> extends React.Component<IProps<T>, any> {
    readonly Vm: T;
    render(): JSX.Element;
}
export interface IProps<T> {
    Vm: T;
}
export declare class BaseReactPage extends BasePage {
    Title: string;
    $ReactType: any;
    protected loadPage(): void;
}
export declare class BasePageReact extends BaseDomReact<BaseReactPage> {
}
