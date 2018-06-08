import Main from './../views/main.vue';
import hull from 'ak-lib-web/hull.vue';
export default  {

    path: '/',
    name: 'root',
    redirect: '/web/allapppage',
    component: Main,
    children:[
        {
            path: 'door',
            name: 'door',
            component: app
        },
        {
            path: '/web',
            name: 'web',
            component: hull
          },
          {
            path: '/web/:pagename',
            name: 'web0',
            component: hull
          },
          {
            path: '/web/:pagename/:p1',
            name: 'web1',
            component: hull
          },
          {
            path: '/web/:pagename/:p1/:p2',
            name: 'web2',
            component: hull
          },
          {
            path: '/web/:pagename/:p1/:p2/:p3',
            name: 'web3',
            component: hull
          }
    ]
  }


