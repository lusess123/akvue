import React, {Fragment} from 'react';
import * as hostnew from './../../projects/dockcloud/host/hostnew'

import {observer} from 'mobx-react';
import {observable} from 'mobx'

const HostNew = hostnew.HostNew;

export class HostData {
    @observable stepIndex = 0;
    next() {
        // debugger ;
        this.stepIndex++;
        // this.forceUpdate();
    }
    last() {
        this.stepIndex--;
        // this.forceUpdate();
    }
    create() {}
    step1(id) {
        alert(id);
    }
}

export default() => {
    return <HostNewCom vm={new HostData()}></HostNewCom>
}

interface IPro < T > {
    vm: T
}

@observer
class HostNewCom extends React.Component < IPro < HostData >,
any > {

    // state =  new HostData()

    get vm() {
        return this.props.vm;
    }

    render() {
        return <div>

            <HostNew
                index={this.vm.stepIndex}
                nextStepFun={() => {
                this
                    .vm
                    .next()
            }}
                lastStepFun={() => {
                this
                    .vm
                    .last()
            }}
                createFun={() => {
                this
                    .vm
                    .create()
            }}
                osSelect={(id) => {
                this
                    .vm
                    .step1(id)
            }}></HostNew>

        </div>
    }
}