// src/components/PrivateRoute.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  // Check if there's a valid token in localStorage
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return <Outlet />; // If authenticated, render the protected route
};

export default PrivateRoute;
