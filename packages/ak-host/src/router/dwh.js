import Main from '@/views/main.vue';
//import appPage from "@/pages/management/app.vue";
import hull from "ak-lib-web/hull.vue";

export default {
  path: '/dwh',
  icon: 'compose',
  title:'数仓管理',
  redirect: '/dwh/dashboard',
  component: Main,
  meta: {title: '数仓管理'},
  children: [
    // {
    //   path: '/insertpage',
    //   name: 'insertpage',
    //   title: '新增页面',
    //   meta: {title: '新增页面'},
    //   component: resolve => require(['@/col/page/InsertPage.vue'], resolve)
    // },
    {
      path: '/web',
      name: 'web',
      title: '自定义页面',
      meta: {title: '自定义页面'},
      component: hull
    },
    {
      path: '/web/:pagename',
      name: 'web0',
      title: '自定义页面',
      meta: {title: '自定义页面'},
      component: hull
    },
    {
      path: '/web/:pagename/:p1',
      name: 'web1',
      title: '自定义页面',
      meta: {title: '自定义页面'},
      component: hull
    },
    {
      path: '/web/:pagename/:p1/:p2',
      name: 'web2',
      title: '自定义页面',
      meta: {title: '自定义页面'},
      component: hull
    },
    {
      path: '/web/:pagename/:p1/:p2/:p3',
      name: 'web3',
      title: '自定义页面',
      meta: {title: '自定义页面'},
      component: hull
    }
  ]
}
