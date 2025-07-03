import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, requiredUserType }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login if not authenticated, but save the attempted path
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requiredUserType && user.userType !== requiredUserType) {
    // If a specific user type is required and user doesn't match, redirect to services
    return <Navigate to="/services" replace />;
  }

  return children;
};

export default PrivateRoute;
