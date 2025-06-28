import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import MobileNav from './components/MobileNav/MobileNav';
import axiosInstance from './axiosInstance/axiosInstance';
import { restoreAuth, loginFailure } from './redux/slices/authSlice';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const dispatch = useDispatch();
  const { accessToken, refreshToken, user, role } = useSelector((state) => state.auth);
  const isRehydrated = useSelector((state) => state.auth._persist?.rehydrated || false);
  const baseUrl = import.meta.env.VITE_API_URL;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log('PrivateRoute', isAuthenticated,);
  const user2 = useSelector((state) => state.auth);
  console.log('user2', user2);
  const getApiEndpoint = (role) => {
    switch (role) {
      case 'club':
        return `${baseUrl}/api/v1/clubs/info/`;
      case 'user':
        return `${baseUrl}/api/v1/users/userinfo/`;
      case 'admin':
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isRehydrated && accessToken && role) {
      const infoUrl = getApiEndpoint(role);
      if (!infoUrl) return;

      axiosInstance
        .get(infoUrl)
        .catch((error) => {
          console.error('Не удалось получить данные пользователя:', error.response?.data || error.message);
          dispatch(loginFailure('Ошибка авторизации'));
        });
    }
  }, [isRehydrated, accessToken, role, dispatch]);

  return (
    <div className="flex min-h-screen">
      {!isMobile && <Sidebar />}
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="py-4 max-h-[90vh] overflow-y-auto">
          <Outlet />
        </div>
        {isMobile && <MobileNav />}
      </div>
    </div>
  );
}

export default App;
