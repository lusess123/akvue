import React from 'react';

import ui from './../../../common/baseui'
const {Form,InputNumber,Input} = ui;


const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
};


export default class Step3 extends React.Component {
  render() {
    return (
      <Form>
          <Form.Item  {...formItemLayout} label="主机名称">
            <Input placeholder="" />
          </Form.Item>
          <Form.Item  {...formItemLayout} label="主机数量">
            <InputNumber  />
          </Form.Item>
          <Form.Item  {...formItemLayout} label="ssh密码">
            <Input  />
          </Form.Item>
      </Form>
    )
  }
}
