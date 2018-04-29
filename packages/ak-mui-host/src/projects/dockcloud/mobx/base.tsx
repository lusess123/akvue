import React, {Fragment} from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx'
import eventFile from 'ak-lib-sys/event'
import * as core from 'ak-lib-sys/Core'

export class BaseDom <T> extends React.Component < IPro < T >,
any > {
    get vm() {
        return this.props.vm;
    }

    render() {
        return this.pRender();

    }

    pRender() {
        return <h1> 
            <code>
                <pre>{core.json(this.vm)}</pre>
            </code>
        </h1>
    }
}

export interface IPro < T > {
    vm: T
}

export class BaseVm {
    ReactType : any;
    protected listenAppEvent(name : string, uniId : string, fun : Function) {
        eventFile
            .GetAppEvent()
            .addListener(name + uniId, fun)
    }
    protected emitAppEvent(name : string, sign : string, ...args : any[])
    {
        eventFile
            .GetAppEvent()
            .emit(name + sign, ...args);
    }

}

interface IBasePageConfig {
    P1 : string;
    P2 : string;
    P3 : string;
}

export class BasePage extends BaseVm {

    protected Title : string = "BasePage";
    protected Icon : string;
    protected P1 : string;
    protected P2 : string;
    protected P3 : string;

    constructor(config?: IBasePageConfig) {
        super();
        if (config) {
            this.P1 = config.P1;
            this.P2 = config.P2;
            this.P3 = config.P3;
        }
    }

    protected loadData() {}

    public sysLoadPage() {
        if (this.Title) 
            document.title = this.Title;
        
        // if(this.Icon) document.re
        this.loadData();
    }
}
