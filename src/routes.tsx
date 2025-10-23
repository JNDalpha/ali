import Home from './pages/Home';
import Chat from './pages/Chat';
import SearchPage from './pages/Search';
import Diseases from './pages/Diseases';
import Guide from './pages/Guide';
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
    name: 'AI问答',
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
    name: '疾病科普',
    path: '/diseases',
    element: <Diseases />,
    visible: true,
  },
  {
    name: '用药指南',
    path: '/guide',
    element: <Guide />,
    visible: true,
  },
];

export default routes;