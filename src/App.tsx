import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from '@/components/common/Header';
import routes from './routes';

// 获取 base path，支持 GitHub Pages 子路径部署
const getBasename = () => {
  // 如果设置了 VITE_BASE_PATH，使用它
  const basePath = import.meta.env.VITE_BASE_PATH;
  if (basePath && basePath !== '/') {
    // 移除尾部斜杠
    return basePath.replace(/\/$/, '');
  }
  return '';
};

const App: React.FC = () => {
  const basename = getBasename();
  
  return (
    <Router basename={basename}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
