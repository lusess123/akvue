import React from 'react';

import  * as ioc from 'ak-lib-sys/Ioc'
import { BasePage } from './../projects/dockcloud/mobx/base'

import * as sdkapp from './../projects/sdk/sdkapp';sdkapp;



export interface IHull {
    Page: string;
    P1?: string;
    P2?: string;
    P3?: string;
}

export default (props: IHull) => {
    const { Page } = props;
    if (props.Page) {
        const _pageObj = ioc.Ioc.Current().FetchInstance<BasePage>(Page, "BasePage", {
            Args: [props]
        })
        if (_pageObj) {
            _pageObj.sysLoadPage();
            return <_pageObj.ReactType   vm={_pageObj}  />
        }
        else {
            return <div><h1>页面 　{Page}  未注册</h1></div>
        }
    }
}


