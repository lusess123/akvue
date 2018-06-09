import { BasePage } from "ak-lib-web/basepage";
import React from "react";
import { Hello } from "ak-lib-react/testdom";
export declare const testreactvue: {
    mixins: {
        data: () => {
            reactNode: any;
        };
        template: string;
        methods: {
            getReactProps(): any;
            getReactType(): new (props: any, context?: any) => {
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
            reactrender(): void;
        };
        mounted: () => void;
        beforeDestroy(): void;
        updated: () => void;
        watch: {
            compiler: (a: any, b: any) => void;
        };
    }[];
    props: string[];
    methods: {
        getReactType(): typeof Hello;
    };
};
export declare class ReactDemoPage extends BasePage {
    Title: string;
    framework: string;
    compiler: string;
    protected loadPage(): void;
    changeTitle(): void;
}
