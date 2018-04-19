import React, { Fragment } from 'react';
import Link from 'umi/link';
import router from 'umi/router'
import Button from 'antd/lib/button'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import TagSelect from 'ant-design-pro/lib/TagSelect';
import 'antd/dist/antd.less'
import 'ant-design-pro/dist/ant-design-pro.less'


function handleFormSubmit(checkedValue) {
    console.log(checkedValue);
  }

export default () => <div>
    
    <Row>
        <Col span={8}>
            <Link to="login">
                <Button type="primary">
                    登陆
            </Button>
            </Link>
        </Col>
        <Col span={8}>
            <Link to="door"><Button type="primary" icon="search" >页面</Button></Link>
        </Col>
        <Row>
        <TagSelect onChange={handleFormSubmit} expandable>
      <TagSelect.Option value="cat1">类目一</TagSelect.Option>
      <TagSelect.Option value="cat2">类目二</TagSelect.Option>
      <TagSelect.Option value="cat3">类目三</TagSelect.Option>
      <TagSelect.Option value="cat4">类目四</TagSelect.Option>
      <TagSelect.Option value="cat5">类目五</TagSelect.Option>
      <TagSelect.Option value="cat6">类目六</TagSelect.Option>
      <TagSelect.Option value="cat7">类目七</TagSelect.Option>
      <TagSelect.Option value="cat8">类目八</TagSelect.Option>
      <TagSelect.Option value="cat9">类目九</TagSelect.Option>
      <TagSelect.Option value="cat10">类目十</TagSelect.Option>
      <TagSelect.Option value="cat11">类目十一</TagSelect.Option>
      <TagSelect.Option value="cat12">类目十二</TagSelect.Option>
    </TagSelect>
        </Row>
    </Row>
</div>;