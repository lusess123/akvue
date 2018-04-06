import Main from './../views/main.vue';
import Door from './../views/door.vue'


// 不作为Main组件的子页面展示的页面单独写，如下



  export const _dashboard2 = {

    path: '/',
    name: 'dwh.dash222',
    title: '数仓概况',
    redirect: '/nweb',
    meta: {title: '数仓概况'},
    component: Door,
    children:[
        {
            path: 'door',
            name: 'door',
            title: '数仓概况',
            meta: {title: '数仓概况'},
            component: app
        },
        {
            path: '/nweb',
            name: 'nweb',
            title: '自定义页面',
            meta: {title: '自定义页面'},
            component: resolve => require(['ak-lib-web/hull.vue'], resolve)
          },
          {
            path: '/nweb/:pagename',
            name: 'nweb0',
            title: '自定义页面',
            meta: {title: '自定义页面'},
            component: resolve => require(['ak-lib-web/hull.vue'], resolve)
          },
          {
            path: '/nweb/:pagename/:p1',
            name: 'nweb1',
            title: '自定义页面',
            meta: {title: '自定义页面'},
            component: resolve => require(['ak-lib-web/hull.vue'], resolve)
          },
          {
            path: '/nweb/:pagename/:p1/:p2',
            name: 'nweb2',
            title: '自定义页面',
            meta: {title: '自定义页面'},
            component: resolve => require(['ak-lib-web/hull.vue'], resolve)
          },
          {
            path: '/nweb/:pagename/:p1/:p2/:p3',
            name: 'nweb3',
            title: '自定义页面',
            meta: {title: '自定义页面'},
            component: resolve => require(['ak-lib-web/hull.vue'], resolve)
          }
    ]
  }



// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里



export const appRouter = [dwh];
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter1 = [
    dwh
  
];
import dwh  from './dwh';
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
   // dwh,
   _dashboard2,
   ...appRouter 
    
];


