import React from 'react';
import {withRouter} from 'react-router'
import Button from "antd/lib/button"

import * as ioc from 'ak-lib-sys/Ioc'
//import * as main from './../projects/dockcloud/app';
//main;
import Table from 'antd/lib/table';
import Exception from 'ant-design-pro/lib/Exception';
import Link from 'umi/link';

import {BasePage} from './../projects/dockcloud/mobx/base'


const _getMenuUrl =(hash:string)=>{
      if(hash){
          const _urls = hash.split('#');
          if(_urls.length>1){
              return _urls[1] ;
          }
      }
      return null;
} 


export class  AA extends React.Component<any,any> {
  render(){
      debugger;
    const {match,location} = this.props ;
    const name = match.params.page;
    
    const _menuurl = _getMenuUrl(location.hash);

    console.log("菜单路由"+ _menuurl);

    const _Page = getPage(name, match.params);
    if (_Page) {
        _Page.sysLoadPage();
       // document.title = _Page;
    }
    return <div>{_Page
            ? <_Page.ReactType vm={_Page}/>
            : <NoPage name={name}/>}
    </div>
  }
}

export default withRouter(AA)

const NoPage : any = ({name}) => {
    return <div>
        {name
            ? <Exception type="404" desc={'页面 ' + name + ' 不存在'}/>
            : null}
        <h3>页面插件</h3>
        <ListPage pageList={pageList()}/>
    </div>

}

const getPage = (name, params) => {
    if (!name) 
        return null;
    const _page : BasePage = ioc
        .Ioc
        .Current()
        .FetchInstance(name, "BasePage", {
            Args: [
            {
                    P1: params.p1,
                    P2: params.p2,
                    P3: params.p3
                
            }
        ]})
return _page;

}

const pageList = () : ioc.IClassMeta[] => {

const _mo = ioc
    .Ioc
    .Current()
    .IocModel();
// core.log(_mo,{info:"插件信息 ： ",sign:"app"});
let _res : ioc.IClassMeta[] = [];
for (const n in _mo) {
    _res.push(_mo[n]);
}

_res = _res.filter(a => a.BaseType == "BasePage")

//this.fPlugList = _res;

return _res;

}

const columns = [
{
    title: '页面注册名',
    dataIndex: 'RegName',
    key: 'RegName'
}, {
    title: '描述',
    dataIndex: 'Message',
    key: 'BaseType'
}, {
    title: '作者',
    dataIndex: 'Author',

    key: 'address'
}, {
    title: '创建时间',
    dataIndex: 'CreateDate',

    key: 'CreateDate'
}, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
        <span>
            <Link to={"/web/" + record.RegName}>
                <Button type="primary" icon="chrome">进入页面</Button>
            </Link>
        </span>
    )
}
];

const ListPage : any = ({pageList}) => {
return <Table columns={columns} dataSource={pageList}/>
}
