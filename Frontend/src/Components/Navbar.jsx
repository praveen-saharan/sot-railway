import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../assets/Picture1.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // For redirecting after logout

  // Helper function to check if the current route is an admin route
  const isAdminRoute = () => {
    return location.pathname.startsWith('/admin');
  };

  // Helper function to check if the current route is the home route
  const isHomeRoute = () => {
    return location.pathname === '/';
  };

  // Logout function to clear local storage and redirect
  const handleLogout = () => {
    // Clear all localStorage data
    localStorage.removeItem('isLoggedIn'); // Or any specific items you want to clear
    localStorage.removeItem('userData'); // Example: remove user data

    // Redirect to the login page after logout
    navigate('/login');
  };

  // Render the appropriate button based on the route
  const renderNavButton = () => {
    if (isAdminRoute()) {
      return (
        <button
          onClick={handleLogout}
          className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded text-sm font-medium"
        >
          LOGOUT
        </button>
      );
    } else if (isHomeRoute()) {
      return (
        <Link
          to="/login"
          className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded text-sm font-medium"
        >
          LOGIN
        </Link>
      );
    } else {
      return (
        <Link
          to="/"
          className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded text-sm font-medium"
        >
          HOME
        </Link>
      );
    }
  };

  return (
    <nav className="fixed z-20 top-0 w-full bg-purple-900 text-white flex justify-between items-center px-8 py-4 shadow-md">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-8" />
        <span className="text-xl font-bold">SoT Railway Ticketing System</span>
      </div>
      {renderNavButton()}
    </nav>
  );
};

export default Navbar;
