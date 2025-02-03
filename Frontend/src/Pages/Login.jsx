import React, { useState, useEffect } from "react";
import logo from "../assets/Picture1.png";
import trainBg from "../assets/Background_Image.png";
import { Link, useNavigate } from "react-router-dom";
import { message, notification } from "antd";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    notification.info({
      className: "bg-blue-100 h-24 text-sm p-0",
      message: "🎉 Welcome! Admin access:",
      maxCount: 1,
      duration: 5,
      placement: "bottom",
      description: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>
            Email:{" "}
            <span style={{ color: "blue", fontWeight: "semibold" }}>
              admin@sot-rts.com
            </span>
          </span>
          <span>
            Password:{" "}
            <span style={{ color: "green", fontWeight: "semibold" }}>
              admin123
            </span>
          </span>
        </div>
      ),
      style: {
        borderRadius: "8px",
        padding: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      },
      icon: <i className="fas fa-user-shield" style={{ color: "blue" }} />,
    });
  }, []);

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   setError("");

  //   if (email === "admin@sot-rts.com" && password === "admin123") {
  //     message.success("Login successful! Redirecting...");
  //     localStorage.setItem('isLoggedIn', 'true');
  //     setTimeout(() => navigate("/admin"), 1000);
  //   } else {
  //     setError("Invalid email or password.");
  //   }
  // };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await fetch(
        `http://localhost:8080/admin/login?username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  console.log(response);
      if (response.ok) {
        const data = await response.text(); // Get response message
        message.success(data || "Login successful! Redirecting...");
        localStorage.setItem("isLoggedIn", "true");
        setTimeout(() => navigate("/admin"), 1000);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Invalid email or password.");
      }
    } catch (error) {
      setError("Server error. Please try again later.");
      console.error("Login request failed:", error);
    }
  };
  

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${trainBg})` }}
    >
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-purple-900 text-white flex justify-between items-center px-8 py-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-8" />
          <span className="text-xl font-bold">SoT Railway Ticketing System</span>
        </div>
        <Link
          to="/"
          className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded text-sm font-medium"
        >
          Home
        </Link>
      </nav>

      {/* Login Form Section */}
      <div className="flex items-center justify-center flex-grow bg-opacity-70 bg-black">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Login
          </h1>

          {error && (
            <div className="mb-4 p-4 text-sm text-red-500 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-800 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
