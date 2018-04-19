import React, { Fragment } from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import { withRouter } from 'react-router'
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
//import 'antd/dist/antd.css'
//import 'ant-design-pro/dist/ant-design-pro.css'; // 统一引入样式
import styles from './UserLayout.less';
import logo from './assets/logo.svg';
import { getRoutes } from './utils';

const links = [
  {
    key: 'help',
    title: '帮助',
    href: '',
  },
  {
    key: 'privacy',
    title: '隐私',
    href: '',
  },
  {
    key: 'terms',
    title: '条款',
    href: '',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
  </Fragment>
);

class UserLayout extends React.PureComponent<any,any> {
  getPageTitle() {
  //   const { routerData, location } = this.props;
  //   const { pathname } = location;
  //   let title = 'Ant Design Pro';
  //  // if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - Ant Design Pro`;
  //   }
    return "";
  }
  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>Ant Design</span>
                </Link>
              </div>
              <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
            </div>
            {
          this.props.children
           }
          
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default withRouter( UserLayout);
