import React from 'react';
import NMABHeader from '../components/NMABHeader';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const hideHeader = ['/','/register', '/login', '/thankyou'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-black">
      {/* Header */}
      {!hideHeader && <NMABHeader />}

      {/* Main content */}
      <main className="flex-grow flex items-start justify-center px-4 pt-0 pb-12">
        <Outlet />
      </main>

      {/* Footer */}
      {!hideHeader && (
        <footer className="text-center text-sm text-gray-500 p-4 border-t border-gray-700">
          © {new Date().getFullYear()} NMAB. All rights reserved.
        </footer>
      )}
    </div>
  );
};

export default Layout;
