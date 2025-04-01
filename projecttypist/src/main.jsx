import React from "react";
// import ReactDOM from "react-dom/client"

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "./main.css"

import Home from "./pages/Home/Home.jsx";
import Info from "./pages/Info/Info.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: '/info',
        element: <Info />,
    },
]);

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        {/* <Home></Home> */}
    </React.StrictMode>
);
