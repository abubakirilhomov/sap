import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const usePrivateRoute = (Component) => {
  const PrivateRoute = (props) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const location = useLocation();

    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  };

  return PrivateRoute;
};

export default usePrivateRoute;