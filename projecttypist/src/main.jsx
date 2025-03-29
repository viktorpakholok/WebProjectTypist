import React from "react";
// import ReactDOM from "react-dom/client"

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
import Home from "./pages/Home";
import Info from "./pages/Info.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

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
