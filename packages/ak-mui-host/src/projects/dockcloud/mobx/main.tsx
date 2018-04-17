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
const {Button, Row, Col} = ui;
import * as _detail from './../host/hostnew'

export class BaseMain {
    @observable Title : string = "gggggg";
}

export class Main extends BaseMain {

    Detail : detail.Detail;
    Navi : navi.Navi;
    Step1 : step1.Step1;
    Step2 : step2.Step2;
    Step3 : step3.Step3;
    Step4 : step4.Step4;

    constructor() {
        super();
        this.Navi = new navi.Navi();
        this.Step1 = new step1.Step1();
        this.Step2 = new step2.Step2();
        this.Detail = new detail.Detail(this);
    }

    changeTitle() {
        this.Title = new Date().toString();
        this.Step1 = new step1.Step1();
        this.Step1.OS = 3 ;

    }

    next() {
        // debugger ;
        this.Navi.Index++;
        // alert(this.Navi.Index); this.forceUpdate();
    }
    last() {
        this.Navi.Index--;
        // this.forceUpdate();
    }
    create() {}
    step1(id) {
        alert(id);
    }

}

@observer
export class MainReact extends base.BaseDom < Main > {
    pRender() {

        const index : number = this.vm.Navi.Index;
        // alert(index);

        return <div>
            <h1>{this.vm.Title}</h1>

            <div>
                <Button
                    onClick={this
                    .vm
                    .changeTitle
                    .bind(this.vm)}>aaa</Button>
            </div>
            <Row>
                <Col md={10}>
                    <div>
                        <navi.NaviReact vm={this.vm.Navi}/>
                        <div>
                            {index == 0
                                ? <step1.StepReact vm={this.vm.Step1}/>
                                : null}
                            {index == 1
                                ? <step2.Step2React vm={this.vm.Step2}/>
                                : null}
                        </div>
                        <Row>
                            {index > 0
                                ? <Button
                                        type="primary"
                                        onClick={this
                                        .vm
                                        .last
                                        .bind(this.vm)}>上一步</Button>
                                : null}
                            {index < 3
                                ? <Button
                                        type="primary"
                                        onClick={this
                                        .vm
                                        .next
                                        .bind(this.vm)}>下一步</Button>
                                : null}
                            {index === 3
                                ? <Button
                                        type="primary"
                                        onClick={this
                                        .vm
                                        .create
                                        .bind(this.vm)}>创建</Button>
                                : null}
                        </Row>
                    </div>
                </Col>
                <Col md={2}></Col>
                <Col md={10}>
                    <detail.DetailReact vm={this.vm.Detail}/>

                </Col>
            </Row>
        </div>;
    }
}

export default() => {
    return <MainReact vm={new Main()}/>
}