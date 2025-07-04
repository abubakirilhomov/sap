import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Posts from "./pages/Posts/Posts.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import Login from "./pages/Login/Login.jsx";
import Clubs from "./pages/Clubs/Clubs.jsx";
import Rating from "./pages/Rating/Rating.jsx";
import PrivateRoute from "./hooks/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/posts",
        element: (
          <PrivateRoute>
            <Posts />
          </PrivateRoute>
        ),
      },
      {
        path: "/shop",
        element: (
          <PrivateRoute>
            <Shop />
          </PrivateRoute>
        ),
      },
      {
        path: "/clubs",
        element: (
          <PrivateRoute>
            <Clubs />
          </PrivateRoute>
        ),
      },
      {
        path: "/users/rating",
        element: <Rating />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

document.title = import.meta.env.VITE_APP_TITLE

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
