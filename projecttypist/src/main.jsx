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

export const UserContext = createContext({ user: null, setUser: () => { } });
export const ModeContext = createContext();

function ProtectedRoute({ children }) {
    const { user } = useContext(UserContext);
    return (user && Object.hasOwn(user, "id")) ? children : <Navigate to="/registration" replace />;
}

function Main() {
    const [mode, setMode] = useState(() => {
        const saved = localStorage.getItem("mode_value");
        console.log(JSON.parse(saved))
        return saved ? JSON.parse(saved).mode : "words";
    });
    // const [value, setValue] = useState(5);
    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem("mode_value");
        return saved ? JSON.parse(saved).value : 5;
    });


    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        localStorage.setItem("mode_value", JSON.stringify({mode: mode, value: value}));
    }, [mode, value]);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    if (user) {
        let theme = user["settings"]["theme"]

        const root = document.documentElement;

        root.style.setProperty("--bg-color", theme["backColor"]);
        root.style.setProperty("--ft-color", theme["fontColor"]);
        root.style.setProperty("--ac-color", theme["atenColor"]);
        root.style.setProperty("--wr-color", theme["wronColor"]);
    }

    const [email, setEmail] = useState(user ? user.email : null);

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <Home />
            ),
            errorElement: <ErrorPage />,
        },
        {
            path: '/info',
            element: (
                <Info />
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
                <Settings />
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
                    <RouterProvider router={router} />
                </ModeContext.Provider>
            </UserContext.Provider>
        </React.StrictMode>
    );
}

createRoot(document.getElementById("root")).render(<Main />);
