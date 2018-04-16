import React, {Fragment} from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx'

import * as detail from './detail'
import * as navi from './navi'
import * as step1 from './step1'
import * as step2 from './step2'
import * as step3 from './step3'
import * as step4 from './step4'

import * as base from './base'
import ui from './../../../common/baseui'
const {Button} = ui;

export class Main {

    Detail : detail.Detail;
    Navi : navi.Navi;
    Step1 : step1.Step1;
    Step2 : step2.Step2;
    Step3 : step3.Step3;
    Step4 : step4.Step4;

    

    @observable Title : string = "gggggg";

    changeTitle() {
        this.Title = new Date().toString();
    }

}

@observer
export class MainReact extends base.BaseDom < Main > {
    pRender() {
        return <div>
            <h1>{this.vm.Title}</h1>
           
            <div>
                <Button
                    onClick={() => {
                    this
                        .vm
                        .changeTitle()
                }}>aaa</Button>
            </div>
            {super.pRender()}
        </div>;
    }
}

export default() => {
    return <MainReact vm={new Main()}/>
}