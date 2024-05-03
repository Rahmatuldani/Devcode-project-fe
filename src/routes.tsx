/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import React from "react";

const Dashboard = React.lazy(() => import('./pages/dasboard'))

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <Dashboard/>
            }
        ]
    }
])

export default routes;