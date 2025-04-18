import React, { createContext, useContext, useState } from "react";
// import ReactDOM from "react-dom/client"

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "./main.css"

import Home from "./pages/Home/Home.jsx";
import Info from "./pages/Info/Info.jsx";
import Registration from "./pages/Registration/Registration.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";

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
]);

const ModeContext = createContext()

function Main() {
    const [mode, setMode] = useState("words")
    const [value, setValue] = useState(5)
    return <>
        <React.StrictMode>
        <ModeContext.Provider value={{mode: mode, setMode: setMode, value: value, setValue: setValue}}>
            <RouterProvider router={router} />
        </ModeContext.Provider>
            {/* <Home></Home> */}
        </React.StrictMode>
    </>
}



console.log("main")

createRoot(document.getElementById("root")).render(
    <Main></Main>
);

export {ModeContext}
