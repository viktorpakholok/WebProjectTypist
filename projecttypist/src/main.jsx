import React, { createContext, useContext, useState } from "react";
// import ReactDOM from "react-dom/client"

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "./main.css"

import Home from "./pages/Home/Home.jsx";
import Info from "./pages/Info/Info.jsx";
import Registration from "./pages/Registration/Registration.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import LogsPerUser from "./pages/LogsPerUser/LogsPerUser.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/info',
        element: <Info />,
    },
    {
        path: '/registration',
        element: <Registration />,
    },
    {
        path: '/logs',
        element: <LogsPerUser/ >,
    },
    {
        path: '/settings',
        element: <Settings/ >,
    },
    {
        path: '/aboutus',
        element: <AboutUs/>,
    }
]);

const ModeContext = createContext()
const EmailContext = createContext()

function Main() {
    const [mode, setMode] = useState("words")
    const [value, setValue] = useState(5)
    const [email, setEmail] = useState("bohdan@nd")

    return <>
        <React.StrictMode>
        <ModeContext.Provider value={{mode: mode, setMode: setMode, value: value, setValue: setValue}}>
            <EmailContext.Provider  value={{email: email, setEmail: setEmail}}>
                <RouterProvider router={router} />
            </EmailContext.Provider>
        </ModeContext.Provider>
            {/* <Home></Home> */}
        </React.StrictMode>
    </>
}



// console.log("main")

createRoot(document.getElementById("root")).render(
    <Main></Main>
);

export {ModeContext, EmailContext}
