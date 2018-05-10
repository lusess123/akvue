import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import { routerRedux } from 'dva/router';



let Router = DefaultRouter;
const { ConnectedRouter } = routerRedux;
Router = ConnectedRouter;


const routes = [
  {
    "component": require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/DefaultLayout.js').default,
    "routes": [
      {
        "path": "/index.html",
        "exact": true,
        "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/index.html' })
      },
      {
        "path": "/web",
        "exact": false,
        "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/web' }),
        "routes": [
          {
            "path": "/web/",
            "exact": true,
            "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/web/' })
          },
          {
            "path": "/web/:page/",
            "exact": true,
            "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/web/:page/' })
          },
          {
            "path": "/web/:page/:p1/",
            "exact": true,
            "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/web/:page/:p1/' })
          },
          {
            "path": "/web/:page/:p1/:p2/",
            "exact": true,
            "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/web/:page/:p1/:p2/' })
          },
          {
            "path": "/web/:page/:p1/:p2/:p3",
            "exact": true,
            "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/web/:page/:p1/:p2/:p3' })
          }
        ]
      },
      {
        "path": "/me",
        "exact": true,
        "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/me' })
      },
      {
        "path": "/login",
        "exact": false,
        "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/login' }),
        "routes": [
          {
            "path": "/login/utils",
            "exact": true,
            "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/login/utils' })
          },
          {
            "path": "/login/",
            "exact": true,
            "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/login/' })
          }
        ]
      },
      {
        "path": "/",
        "exact": true,
        "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/' })
      },
      {
        "path": "/door",
        "exact": false,
        "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/door' }),
        "routes": [
          {
            "path": "/door/me",
            "exact": true,
            "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/door/me' })
          },
          {
            "path": "/door/",
            "exact": true,
            "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/door/' })
          },
          {
            "path": "/door/host",
            "exact": true,
            "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/door/host' })
          },
          {
            "path": "/door/demo1",
            "exact": true,
            "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/door/demo1' })
          },
          {
            "path": "/door/demo",
            "exact": true,
            "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/door/demo' })
          },
          {
            "path": "/door/models/door",
            "exact": true,
            "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/door/models/door' })
          }
        ]
      },
      {
        "path": "/app",
        "exact": true,
        "component": () => React.createElement(require('/Users/zyking/Documents/demo/pro-demo/akvue/node_modules/umi-build-dev/lib/Compiling.js').default, { route: '/app' })
      },
      {
        "path": "/ak",
        "exact": false,
        "component": require('../ak/_layout.tsx').default,
        "routes": []
      }
    ]
  }
];

export default function() {
  return (
<Router history={window.g_history}>
  { renderRoutes(routes) }
</Router>
  );
}
