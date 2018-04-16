import React from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx'

import * as base from './base'

import  * as _detail from './../host/hostnew'

import  * as main from './main'

const _table =observer(_detail.InfoTable);

export class Detail {

}

export class DetailReact extends base.BaseDom < main.Main> {

    pRender(){
             return <_table  cpu={this.vm.Step2.cpu+ ""} os ={this.vm.Step1.OS+""} />
    }

}