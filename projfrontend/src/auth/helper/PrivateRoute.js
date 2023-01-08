import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from "./index";

const PrivateRoute = () => {
    const isAuthent = isAuthenticated();

    return isAuthent ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;

