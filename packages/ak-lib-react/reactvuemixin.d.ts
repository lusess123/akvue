/// <reference types="react" />
import * as React from "react";
declare const _default: {
    props: string[];
    data: () => {
        aa: number;
        bb: string;
        reactNode: any;
    };
    methods: {
        reactrender(): {
            new (props: any, context?: any): {
                render(): JSX.Element;
                componentDidMount(): void;
                setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: any) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
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
    };
    mounted: () => void;
    beforeDestroy(): void;
    updated: () => void;
    watch: {
        compiler: (a: any, b: any) => void;
    };
};
export default _default;
