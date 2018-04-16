import React from 'react'
import styleless from './style.less'

//import ui from './../../../common/baseui'
//const {Radio} = ui;

//const Step = Steps.Step;
//const RadioGroup = Radio.Group;

interface IStep1{
  osSelect?: (id:string)=>void
}


export default class Step1 extends  React.Component<IStep1,any>{


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
    this.state={
      select:-1
    }
  }
  private onItemClick (id){
    this.setState({select:id})
    if(this.props.osSelect){
    this.props.osSelect(id);
    }
  } 

  private _setRed(item){
    return item.id === this.state.select ? styleless.red:"";
  }

  render(){
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