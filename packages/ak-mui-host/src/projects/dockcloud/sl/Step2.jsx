import React from 'react';
import IntegerSlider from './IntegerSlider'

import ui from './../../../common/baseui'
const {Radio} = ui;

const RadioGroup = Radio.Group;

export default class Step2 extends  React.Component{
  constructor(props){
    super(props);
    this.data={
      cpu:[
        {id:1,title:"1核"},
        {id:2,title:"2核"},
        {id:3,title:"3核"},
        {id:4,title:"4核"}
      ],
      memory:[
        {id:1,title:"1G"},
        {id:2,title:"2G"},
        {id:3,title:"4G"},
        {id:4,title:"6G"},
        {id:5,title:"8G"},
        {id:6,title:"10G"},
      ]
    }
    this.state={
      select:-1
    }
  }
  onItemClick (id){
    this.setState({select:id})
  }

  render(){
    return (<div>
      <h4>CPU</h4>
      <div>
      <RadioGroup >
        {this.data.cpu.map(item=>(<Radio.Button key={item.id} value={item.id}>{item.title}</Radio.Button>))}
      </RadioGroup>
      </div>
      <h4>内存</h4>
      <div>
      <RadioGroup  >
        {this.data.memory.map(item=>(<Radio.Button key={item.id} value={item.id}>{item.title}</Radio.Button>))}
      </RadioGroup>
      </div>
      <h4>系统盘</h4>
      <div>
        <IntegerSlider
            min={20}
            max={40}
          />
      </div>
    </div>
    )
  }
}
