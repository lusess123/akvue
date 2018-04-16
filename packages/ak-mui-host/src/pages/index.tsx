import React, { Fragment } from 'react';
import Link from 'umi/link';
import 'antd/dist/antd.css'
import 'ant-design-pro/dist/ant-design-pro.css'; // 统一引入样式
import Button from 'antd/lib/button'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
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
    </Row>
</div>;