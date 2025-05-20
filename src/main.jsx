import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import './index.css';
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Publications from './pages/Publications/Publications.jsx';
import Shop from './pages/Shop/Shop.jsx';
import Login from './pages/Login/Login.jsx';
import usePrivateRoute from './hooks/PrivateRoute.jsx';

const ProtectedDashboard = usePrivateRoute(Dashboard);
const ProtectedProfile = usePrivateRoute(Profile);
const ProtectedPublications = usePrivateRoute(Publications);
const ProtectedShop = usePrivateRoute(Shop);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ProtectedDashboard />,
      },
      {
        path: '/profile',
        element: <ProtectedProfile />,
      },
      {
        path: '/publications',
        element: <ProtectedPublications />,
      },
      {
        path: '/shop',
        element: <ProtectedShop />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
);