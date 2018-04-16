import React, {Fragment} from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx'



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
