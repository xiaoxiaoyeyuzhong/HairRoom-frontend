export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {path: '/user/login', component: './User/Login'},
      {path: '/user/register', component: './User/Register'},
    ],
  },
  {path: '/welcome', icon: 'smile', component: './Welcome', name: '欢迎页'},
  {
    path: '/admin',
    icon: 'crown',
    name: '管理页',
    access: 'canAdmin',
    routes: [
      {path: '/admin', redirect: '/admin/user'},
      {icon: 'table', path: '/admin/user', component: './Admin/User', name: '用户管理'},
      {icon: 'table', path: '/admin/staff', component: './Admin/Staff', name: '员工管理'},
      {icon: 'table', path: '/admin/bill', component: './Admin/Bill', name: '账单管理'},
      {icon: 'table', path: '/admin/refund', component: './Admin/Refund', name: '退款管理'},
      {
        icon: 'table',
        path: '/admin/BusinessSituation',
        component: './Admin/BusinessSituation',
        name: '经营情况管理'
      },
    ],
  },
  {path: '/', redirect: '/welcome'},
  {path: '*', layout: false, component: './404'},
];
