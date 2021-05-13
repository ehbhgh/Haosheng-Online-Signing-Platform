export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/login',
        component: '../layouts/LoginLayout',
        routes: [
          {
            name: 'login',
            path: '/login',
            component: './login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
               
              {
                path: '/',
                redirect:'/dashboard'
              },
              {
                path: '/dashboard',
                name:'dashboard',
                icon:'PicCenterOutlined',
                component:'@/pages/Dashboard'
              },
              {
                path: '/user',
                name:'user',
                icon:'UserOutlined',
                component:'@/pages/User'
              },
              {
                path: '/goods',
                name:'goods',
                icon:'ShoppingCartOutlined',
                component:'@/pages/Goods'
              },
              
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
