import React, {Fragment} from 'react';
import * as hostnew from './../../projects/dockcloud/host/hostnew'

const HostNew = hostnew.HostNew;

export default class HostNewCom extends React.Component {

    state = {
        stepIndex: 0
    };

    next(){
             this.state.stepIndex ++ ;
             this.forceUpdate();
    }
    last(){
        this.state.stepIndex --;
        this.forceUpdate();
    }
    create(){
             
    }
    step1(id){
               alert(id);
    }

    render() {
        return <div>

            <HostNew 
            index={this.state.stepIndex}
            nextStepFun={()=>{this.next()}}
            lastStepFun={()=>{this.last()}}
            createFun={()=>{this.create()}}
            osSelect={(id)=>{this.step1(id)}}
            ></HostNew>

        </div>
    }
}