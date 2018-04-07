/// <reference types="react" />
import { BasePage } from "ak-lib-web/basepage";
import React from "react";
export declare const testreactvue: {
    mixins: {
        props: string[];
        data: () => {
            aa: number;
            bb: string;
            reactNode: any;
        };
        methods: {
            reactrender(): new (props: any, context?: any) => {
                render(): JSX.Element;
                componentDidMount(): void;
                setState<K extends never>(state: {} | Pick<{}, K> | ((prevState: Readonly<{}>, props: any) => {} | Pick<{}, K>), callback?: () => void): void;
                forceUpdate(callBack?: () => void): void;
                props: Readonly<{
                    children?: React.ReactNode;
                }> & Readonly<any>;
                state: Readonly<{}>;
                context: any;
                refs: {
                    [key: string]: React.ReactInstance;
                };
                shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<{}>, nextContext: any): boolean;
                componentWillUnmount?(): void;
                componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
                getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<{}>): never;
                componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: never): void;
                componentWillMount?(): void;
                UNSAFE_componentWillMount?(): void;
                componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
                UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
                componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<{}>, nextContext: any): void;
                UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<{}>, nextContext: any): void;
            };
        };
        mounted: () => void;
        beforeDestroy(): void;
        updated: () => void;
        watch: {
            compiler: (a: any, b: any) => void;
        };
    }[];
    template: string;
};
export declare class ReactDemoPage extends BasePage {
    Title: string;
    framework: string;
    compiler: string;
    protected loadPage(): void;
    changeTitle(): void;
}
