import React, {Fragment} from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx'
import  eventFile from 'ak-lib-sys/event'



export class BaseDom<T> extends React.Component<IPro<T>,any>{
       get vm(){
           return this.props.vm ;
       }

       render(){
          return this.pRender();
       }

       pRender(){
        return <div>基类</div>
       }
}


export interface IPro<T>{
    vm:T
}


export class BaseVm {
    protected listenAppEvent(name : string, uniId : string, fun : Function) {
        eventFile.GetAppEvent().addListener(name + uniId ,fun)
    }
    protected emitAppEvent(name : string, sign : string, ...args : any[])
        {
            eventFile
                .GetAppEvent()
                .emit(name + sign, ...args);
        }

}
