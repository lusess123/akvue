import React from 'react'
import TagSelect from 'ant-design-pro/lib/TagSelect';
import Table from 'antd/lib/table';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';

import  Button  from 'antd/lib/button';
import  Modal from 'antd/lib/modal';

import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';
import CountDown from 'ant-design-pro/lib/CountDown';

import { ChartCard, Field, MiniArea, MiniBar, MiniProgress } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
//import { Row, Col, Icon, Tooltip } from 'antd';
import numeral from 'numeral';
import moment from 'moment';

const targetTime = new Date().getTime() + 3900000;

function handleFormSubmit(checkedValue) {
  console.log(checkedValue);
}
export default () => {
  return <div>
    <Row className="row">
      <Col span={8}>
        <ChartCard
          title="搜索用户数量"
          total={numeral(8846).format('0,0')}
          contentHeight={134}
        >
          <NumberInfo
            subTitle={<span>本周访问</span>}
            total={numeral(12321).format('0,0')}
            status="up"
            subTotal={17.1}
          />
          <MiniArea
            line
            height={45}
            data={visitData}
          />
        </ChartCard>
      </Col>
      <Col span={8} style={{ marginTop: 24 }}>
        <ChartCard
          title="访问量"
          action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
          total={numeral(8846).format('0,0')}
          footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
          contentHeight={46}
        >
          <MiniBar
            height={46}
            data={visitData}
          />
        </ChartCard>
      </Col>
      <Col span={8} style={{ marginTop: 24 }}>
        <ChartCard
          title="线上购物转化率"
          action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
          total="78%"
          footer={
            <div>
              <span>
                周同比
              <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>12%</Trend>
              </span>
              <span style={{ marginLeft: 16 }}>
                日环比
              <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>11%</Trend>
              </span>
            </div>
          }
          contentHeight={46}
        >
          <MiniProgress percent={78} strokeWidth={8} target={80} />
        </ChartCard>
      </Col>
    </Row>
    <CountDown style={{ fontSize: 20 }} target={targetTime} />
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
    <div
      style={{
        textAlign: 'right',
        height: '64px',
        lineHeight: '64px',
        boxShadow: '0 1px 4px rgba(0,21,41,.12)',
        padding: '0 32px',
        width: '400px',
      }}
    >
      <HeaderSearch
        placeholder="站内搜索"
        dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
        onSearch={(value) => {
          console.log('input', value); // eslint-disable-line
        }}
        onPressEnter={(value) => {
          console.log('enter', value); // eslint-disable-line
        }}
      />
    </div>
    <div>
    <LocalizedModal />
    <Button onClick={confirm}>Confirm</Button>
  </div>
    <div>
      <Table columns={columns} rowSelection={rowSelection} dataSource={data} />
    </div>
  </div>
}



const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
  width: '12%',
}, {
  title: 'Address',
  dataIndex: 'address',
  width: '30%',
  key: 'address',
}];

const data = [{
  key: 1,
  name: 'John Brown sr.',
  age: 60,
  address: 'New York No. 1 Lake Park',
  children: [{
    key: 11,
    name: 'John Brown',
    age: 42,
    address: 'New York No. 2 Lake Park',
  }, {
    key: 12,
    name: 'John Brown jr.',
    age: 30,
    address: 'New York No. 3 Lake Park',
    children: [{
      key: 121,
      name: 'Jimmy Brown',
      age: 16,
      address: 'New York No. 3 Lake Park',
    }],
  }, {
    key: 13,
    name: 'Jim Green sr.',
    age: 72,
    address: 'London No. 1 Lake Park',
    children: [{
      key: 131,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 2 Lake Park',
      children: [{
        key: 1311,
        name: 'Jim Green jr.',
        age: 25,
        address: 'London No. 3 Lake Park',
      }, {
        key: 1312,
        name: 'Jimmy Green sr.',
        age: 18,
        address: 'London No. 4 Lake Park',
      }],
    }],
  }],
}, {
  key: 2,
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

// rowSelection objects indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};




const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}




class LocalizedModal extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Modal</Button>
        <Modal
          title="Modal"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
        </Modal>
      </div>
    );
  }
}

function confirm() {
  Modal.confirm({
    title: 'Confirm',
    content: 'Bla bla ...',
    okText: '确认',
    cancelText: '取消',
  });
}














