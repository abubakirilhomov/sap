import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import MobileNav from './components/MobileNav/MobileNav';
import axiosInstance from './axiosInstance/axiosInstance';
import { restoreAuth, loginFailure } from './redux/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const { accessToken, refreshToken, user, role } = useSelector((state) => state.auth);
  const isRehydrated = useSelector((state) => state.auth._persist?.rehydrated || false);
  const baseUrl = import.meta.env.VITE_API_URL;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log('PrivateRoute', isAuthenticated);
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
      <div className="hidden md:min-w-2/12 md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="py-4 mb-16 md:mb-0 md:max-h-[90vh] overflow-y-auto">
          <Outlet />
        </div>
        <div className="block md:hidden">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}

export default App;
