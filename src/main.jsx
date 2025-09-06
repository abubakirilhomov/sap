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
import Shop from "./pages/Shop/Shop.jsx";
import Login from "./pages/Login/Login.jsx";
import Clubs from "./pages/Clubs/Clubs.jsx";
import Rating from "./pages/Rating/Rating.jsx";
import PrivateRoute from "./hooks/PrivateRoute.jsx";
import QrScanner from "./components/QrScanner/QrScanner.jsx";
import QrCode from "./pages/QrCode/QrCode.jsx";
import StudentsRaiting from "./pages/StudentsRaiting/StudentsRaiting.jsx";
import { ToastContainer } from "react-toastify";

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
      {
        path: "/qr-scanner",
        element: <QrCode />,
      },
      {
        path: "/rating",
        element: <StudentsRaiting/>
      }
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
      <>
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </>
    </PersistGate>
  </Provider>
</StrictMode>

);
