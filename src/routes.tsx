/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import React from "react";

const Dashboard = React.lazy(() => import('./pages/dasboard'))
const Detail = React.lazy(() => import('./pages/detail'))

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <Dashboard/>
            },
            {
                path: '/detail/:id',
                element: <Detail/>
            }
        ]
    }
])

export default routes;