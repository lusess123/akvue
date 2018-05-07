import {BasePage, BaseDom} from './../dockcloud/mobx/base'
import * as ioc from 'ak-lib-sys/Ioc'
import React from 'react'
import ui from './../../common/baseui'
const {Button, Col, Row, Input} = ui;
import * as Rx from 'rxjs'

export class RxJsPageReact extends BaseDom < RxJsPage > {
    pRender() {
        return <div>
            <Row>
                <Col>RxJs</Col>
                <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                    this._click()
                }}>
                    点击触发事件</Button>
            </Row>

        </div>
    }

    _click() {
        this
            .vm
            .emit();
    }
}

@ioc.PlugIn({RegName: "RxJsPage", BaseType: "BasePage"})
export class RxJsPage extends BasePage {
    ReactType = RxJsPageReact;
   // ObserverObj : any;
   // ObserableObj : any;
    SubjectObj : Rx.Subject<any>; 
    // = new Rx.Subject();

    loadData() {
        alert();

        this.SubjectObj = new Rx.Subject<any>();

       const _a = this.SubjectObj.subscribe(x => alert(x.obj));

        this.SubjectObj.filter(a=>a.subject == "click1").subscribe(x => alert(x.obj));
        _a.unsubscribe();
        // this.ObserableObj = Rx
        //     .Observable
        //     .create((observer) => {
        //         this.ObserverObj = observer;
        //     });
        // this
        //     .ObserableObj
        //     .filter(a => a.subject == "click")
        //     .subscribe(x => alert(x.obj));


    }

    emit() {
        this
            .SubjectObj
            .next({subject: "click1", obj: new Date()});
    }

}
