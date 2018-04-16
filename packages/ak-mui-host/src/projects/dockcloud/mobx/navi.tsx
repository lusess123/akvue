import React, {Fragment} from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx'

import * as base from './base'
import ui from './../../../common/baseui'
const {Button} = ui;


export class Navi {
    Index : 0 ;
}


@observer
export class MainReact extends base.BaseDom < Navi > {
         

}