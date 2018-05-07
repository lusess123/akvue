import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'demo模块',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        icon: 'ie',
        name: '主机维护',
        path: 'ak/mainpage',
      },
      {
        icon: 'github',
        name: '一个测试页面',
        path: 'ak/testpage',
      },
      {
        icon: 'chrome',
        name: '代码生成页面',
        path: 'ak/codepage',
      }
    ],
  }
];

function formatter(data, parentPath = '/', parentAuthority=0) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
     authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => { return menuData;}
