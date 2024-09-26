import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');  // Check if a token exists

  // If token doesn't exist, redirect to the login page
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
