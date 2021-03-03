import Login from '@/pages/login';
import Input from '@/pages/input';
import Query from '@/pages/query';
import Train from '@/pages/train';
import Manage from '@/pages/manage';
import Analysis from '@/pages/analysis';
import BasicLayout from '@/layouts/BasicLayout';

const routerConfig = [
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/',
        exact: true,
        component: Input,
      },
      {
        path: '/input',
        exact: true,
        component: Input,
      },
      {
        path: '/query',
        exact: true,
        component: Query,
      },
      {
        path: '/manage',
        exact: true,
        component: Manage,
      },
      {
        path: '/train',
        exact: true,
        component: Train,
      },
      {
        path: '/analysis',
        exact: true,
        component: Analysis,
      },
    ],
  },
];

export default routerConfig;
