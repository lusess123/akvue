import React from 'react';
import {observer} from 'mobx-react';
import {observable, computed} from 'mobx'

import * as base from './base'

import * as _detail from './../host/hostnew'

import * as main from './main'

const _table = _detail.InfoTable;

export class Detail {
    Main : main.Main;
    constructor(m : main.Main) {
        this.Main = m
    }

    get cpuAdd2() {
        return this.Main.Step2.cpu + 2;
    }
}
@observer
export class DetailReact extends base.BaseDom < Detail > {

    pRender() {
        // debugger; alert(this.vm.Main.Step2.cpu);
        return <_table
            cpu={this.vm.Main.Step2.cpu + "核"}
            os={this.vm.Main.Step1.OS + ""}
            sysDist={this.vm.Main.Step2.sysDist+""}
            hourCost={this.vm.cpuAdd2 + ""}/>
    }

}