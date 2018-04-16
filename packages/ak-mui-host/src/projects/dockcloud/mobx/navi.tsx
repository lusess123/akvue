import React, {Fragment} from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx'

import * as base from './base'
import ui from './../../../common/baseui'
import * as stepNavi from './../host/hostnew'
const {Button} = ui;


export class Navi {
    @observable  Index = 0;
}


@observer
export class NaviReact extends base.BaseDom < Navi > {
         pRender(){
             return <stepNavi.StepNavi    index={this.vm.Index} />
         }

}