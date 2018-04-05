/// <reference types="react" />
import * as React from "react";
export interface HelloProps {
    compiler: string;
    framework: string;
}
export declare class Hello extends React.Component<HelloProps, {}> {
    render(): JSX.Element;
}
export declare const renderTest: (dom: HTMLElement, pops: HelloProps) => void;
