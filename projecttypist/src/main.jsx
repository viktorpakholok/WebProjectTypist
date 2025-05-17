import React, { createContext, useContext, useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./main.css";

import Home from "./pages/Home/Home.jsx";
import Info from "./pages/Info/Info.jsx";
import Registration from "./pages/Registration/Registration.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import HistoryPerUser from "./pages/HistoryPerUser/HistoryPerUser.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";

export const UserContext = createContext({ user: null, setUser: () => {} });
export const ModeContext = createContext();
export const EmailContext = createContext();

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/registration" replace />;
}

function Main() {
  const [mode, setMode] = useState("words");
  const [value, setValue] = useState(5);
  

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const [email, setEmail] = useState(user.email);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: '/info',
      element: (
        <ProtectedRoute>
          <Info />
        </ProtectedRoute>
      ),
    },
    {
      path: '/registration',
      element: <Registration />,
    },
    {
      path: '/logs',
      element: (
        <ProtectedRoute>
          <HistoryPerUser />
        </ProtectedRoute>
      ),
    },
    {
      path: '/settings',
      element: (
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      ),
    },
    {
      path: '/aboutus',
      element: <AboutUs />,
    }
  ]);

  return (
    <React.StrictMode>
      <UserContext.Provider value={{ user, setUser }}>
        <ModeContext.Provider value={{ mode, setMode, value, setValue }}>
          <EmailContext.Provider value={{ email, setEmail }}>
            <RouterProvider router={router} />
          </EmailContext.Provider>
        </ModeContext.Provider>
      </UserContext.Provider>
    </React.StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
