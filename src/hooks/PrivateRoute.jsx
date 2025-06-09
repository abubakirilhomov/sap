import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const usePrivateRoute = (Component) => {
  const PrivateRoute = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isRehydrated = useSelector((state) => state.auth._persist.rehydrated);
    const location = useLocation();
    if (!isRehydrated) {
      return <div>Loading...</div>;
    }

    return isAuthenticated ? (
      <Component />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  };

  return PrivateRoute;
};

export default usePrivateRoute;