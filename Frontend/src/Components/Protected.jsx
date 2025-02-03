import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check login state

  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    return <Navigate to="/login" />;
  }

  // If logged in, render the element
  return element;
};

export default ProtectedRoute;
