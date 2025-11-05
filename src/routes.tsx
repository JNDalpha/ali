import Home from './pages/Home';
import Chat from './pages/Chat';
import SearchPage from './pages/Search';
import Diseases from './pages/Diseases';
import Guide from './pages/Guide';
import Sports from './pages/Sports';
import Beauty from './pages/Beauty';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: '首页',
    path: '/',
    element: <Home />,
    visible: true,
  },
  {
    name: 'AI问诊',
    path: '/chat',
    element: <Chat />,
    visible: true,
  },
  {
    name: '药品检索',
    path: '/search',
    element: <SearchPage />,
    visible: true,
  },
  {
    name: '运动健康',
    path: '/sports',
    element: <Sports />,
    visible: true,
  },
  {
    name: '医疗美容',
    path: '/beauty',
    element: <Beauty />,
    visible: true,
  },
  {
    name: '疾病科普',
    path: '/diseases',
    element: <Diseases />,
    visible: false,
  },
  {
    name: '用药指南',
    path: '/guide',
    element: <Guide />,
    visible: false,
  },
];

export default routes;