import Main from './../views/main.vue';
import hull from 'ak-lib-web/src/hull.vue';

import getapps from "ak-lib-web/src/app/appget";

const _getMainRoute = () => {
  

  const _apps = getapps();
  let MainRoute = [];
  let RootRoute = [];

  _apps.forEach(a => {
    if (a.MainRoute) {
      MainRoute =  MainRoute.concat(a.MainRoute)
    }
    if (a.RootRoute) {
      RootRoute =  RootRoute.concat(a.RootRoute)
    }
  });
  //core.alert(_routes);
  return  {MainRoute,RootRoute};
  // _apps.
}

const _routes = _getMainRoute();

export const MainRoutes = {

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
    ..._routes.MainRoute

  ]
}

export const RootRoutes = _routes.RootRoute;
