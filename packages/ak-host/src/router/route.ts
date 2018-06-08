import Main from './../views/main.vue';
import hull from 'ak-lib-web/hull.vue';


import {ioc,core} from 'ak-lib-sys';
import {IApp} from "ak-lib-web/app/iapp";

const _getMainRoute = () => {
  const _res : ioc.IClassMeta[] = ioc
    .Ioc
    .Current()
    .GetTypeList("IApp");
  const _apps = _res.map(info => {

    return ioc
      .Ioc
      .Current()
      .FetchInstance < IApp > (info.RegName, "IApp");

  });
  let _routes = [];
  _apps.forEach(a => {
    if (a.MainRoute) {
      _routes =  _routes.concat(a.MainRoute)
    }
  });
  core.alert(_routes);
  return _routes;
  // _apps.
}

export default {

  path : '/',
  name : 'root',
  redirect : '/web/allapppage',
  component : Main,
  children : [

    {
      path: '/web',
      name: 'web',
      component: hull
    }, {
      path: '/web/:pagename',
      name: 'web0',
      component: hull
    }, {
      path: '/web/:pagename/:p1',
      name: 'web1',
      component: hull
    }, {
      path: '/web/:pagename/:p1/:p2',
      name: 'web2',
      component: hull
    }, {
      path: '/web/:pagename/:p1/:p2/:p3',
      name: 'web3',
      component: hull
    },
    ..._getMainRoute()

  ]
}
