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
            component: '@/pages/login',
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
                icon:'PieChartOutlined',
                component:'@/pages/Dashboard'
              },
              {
                path: '/classfiy',
                name:'classfiy',
                icon:'PicCenterOutlined',
                component:'@/pages/Classification'
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
                path: '/order',
                name:'order',
                icon:'DollarOutlined',
                component:'@/pages/Order'
              },
              {
                component: '@/pages/404',
              },
            ],
          },
          {
            component: '@/pages/404',
          },
        ],
      },
    ],
  },
  {
    component: '@/pages/404',
  },
];
