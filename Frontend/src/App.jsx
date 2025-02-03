import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";

import NotExist from "./Components/NotExist";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LoadingScreen from "./Pages/Loading";


import Booking from "./Pages/User/Booking";

import Ticket from "./Pages/User/Ticket";

import Admin from "./Pages/Admin/AdminHome";
import PassengerList from "./Pages/Admin/PassengerList";
import FinancialReports from "./Pages/Admin/FinancialReports";
import ProtectedRoute from './Components/Protected';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">

        <Navbar />

      


        <div className="flex-1 text-center mt-22">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />

            {/* User pages */}
            <Route path="/booking" element={<Booking />} />
            <Route path="/ticket" element={<Ticket />} />

            <Route
              path="/admin"
              element={<ProtectedRoute element={<Admin />} />}
            />
            <Route
              path="/admin/passenger-list"
              element={<ProtectedRoute element={<PassengerList />} />}
            />
            <Route
              path="/admin/financial-reports"
              element={<ProtectedRoute element={<FinancialReports />} />}
            />
            {/* Catch-all route for non-existent pages */}
            <Route path="*" element={<NotExist />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
