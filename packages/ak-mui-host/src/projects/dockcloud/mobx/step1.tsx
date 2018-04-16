import React, {Fragment} from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx'
import * as base from './base'



export class Step1 {
    @observable  OS = -1 
}

import styleless from './style.less'
@observer
export  class StepReact extends  base.BaseDom < Step1 > {


  private data ;

  constructor(props){

    super(props);
    this.data =[
      {id:1,title:"CentOS 6.8 64bit"},
      {id:2,title:"CentOS 7.3 64bitpub"},
      {id:3,title:"Debian Jessie 8.7 64bit"},
      {id:4,title:"Debian Stretch 9.3 64bits"},
      {id:5,title:"Ubuntu Server 14.04.5 LTS 64bit"},
      {id:6,title:"Ubuntu Server 16.04.4 LTS 64bit"},
    ]
    
  }
  private onItemClick (id){
   // this.setState({select:id})

    this.vm.OS = id ;
    // if(this.props.osSelect){
    // this.props.osSelect(id);
    // }
  } 

  private _setRed(item){
    return item.id === this.vm.OS ? styleless.red:"";
  }

  pRender(){
    return (<ul>
        { this.data.map(item=>
          <li key={item.id} onClick={()=>{this.onItemClick(item.id)}} className={this._setRed(item)} >
            {item.title}
          </li>)
        }
      </ul>
    )
  }
}