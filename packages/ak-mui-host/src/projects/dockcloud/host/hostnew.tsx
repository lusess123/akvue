import React from 'react'
import {Steps} from 'antd'
import ui from './../../../common/baseui'
const {Button, Row, Col} = ui;
const Step = Steps.Step;
import hostless  from './host.less'

import Step1 from  './../sl/Step1'
import Step2 from './../sl/Step2'
import Step3 from './../sl/Step3'



const StepContent = ({index,osSelect})=>{
      switch(index)
      {
          case 1:
          return <Step2 />
          case 2:
          return <Step3/>
          default:
          return <Step1   osSelect={osSelect} />
      }

}


export const HostNew = ({
    index = 0,
    lastStepFun = ()=>{},
    nextStepFun = ()=>{},
    createFun = ()=>{},
    osSelect= (id:string)=>{}
}) => {
    return <div>
        <Row>
            <Col md={10}>
                <Row>
                    <StepNavi index={index}></StepNavi>
                </Row>
                <Row>
               <StepContent  index={index}  osSelect={osSelect}  />
                </Row>
                <Row>
                     {index>0?<Button type="primary" onClick={lastStepFun} >上一步</Button>:null}
                     {index<3?<Button type="primary" onClick={nextStepFun}>下一步</Button>:null}
                     {index==3?<Button type="primary" onClick={createFun}>创建</Button>:null}
                </Row>
            </Col>
            <Col md={1}></Col>
            <Col md={10}>
            <InfoTable/>
            </Col>
        </Row>
    </div>
}

export const StepNavi = ({
    index = 0
}) => {
    return <Steps current={index}>
        <Step title="选择映像"/>
        <Step title="配置选择"/>
        <Step title="网络设置"/>
        <Step title="基本信息"/>
    </Steps>
}

export const InfoTable = ({
    os="CentOS 6.5 64bit",
    isPyth="是",
    hostKind="性能型",
    cpu="1 核",
    momery="1 G",
    gpu="0",
    sysDist="20 GB",
    copyStategy="同数据中心多副本",
    name="",
    hostName = "",
    count=1,
    hourCost="¥0.10",
    
    monthCost="72.00"

}) => {

    return <div>
        <h4>配置详情</h4>
        <table className="table table-bordered">
            <tbody>
                <tr>
                    <td data-width={70}>映像</td>
                    <td>{os}</td>
                </tr>
                <tr>
                    <td data-width={70}>支持物理机</td>
                    <td>{isPyth}</td>
                </tr>
                <tr>
                    <td>主机类型</td>
                    <td>{hostKind}</td>
                </tr>
                <tr>
                    <td>CPU</td>
                    <td>{cpu}</td>
                </tr>
                <tr>
                    <td>内存</td>
                    <td>{momery}</td>
                </tr>
                <tr>
                    <td>GPU</td>
                    <td>{gpu}</td>
                </tr>
                <tr>
                    <td>系统盘</td>
                    <td>{sysDist}</td>
                </tr>
                <tr>
                    <td>副本策略</td>
                    <td>{copyStategy}</td>
                </tr>
                <tr>
                    <td>名称</td><td>{name}</td></tr>
                <tr>
                    <td>Hostname</td><td>{hostName}</td></tr>
                <tr>
                    <td>数量</td>
                    <td>{count}</td>
                </tr>
            </tbody>
        </table>
        <div>
            <h4>
                <span>总价格:&nbsp;</span>
                <span>{hourCost}</span>
                <span>每小时</span>
                <span >(合<span >
                        <span >¥</span>{monthCost}</span>每月</span>
                <span>)</span>
            </h4>
        </div>
    </div>
}
