import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate
import trainBg from "../assets/Background_Image.png"; 
import logo from "../assets/Picture1.png"; 
import { Link } from "react-router-dom";
import LoadingScreen from "./Loading"; // Import the loading component

const Home = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    destination: ""
  });

  const [error, setError] = useState("");
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  const navigate = useNavigate(); // useNavigate for redirecting

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/trainstations");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStations(data);
      } catch (error) {
        console.error("Error fetching stations:", error);
        setError("Failed to load stations. Please try again later.");
      } finally {
        setIsLoading(false); // Stop loading once API call is complete
      }
    };

    fetchStations();
  }, []);

  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error when user starts typing
  };

  // Handle form submission
  const handleSubmit = () => {
    const { firstName, lastName, destination } = formData;
    if (!firstName || !lastName || !destination) {
      setError("All fields are required");
      return;
    }

    // Find the selected station data
    const selectedStation = stations.find(
      (station) => station.stationName === destination
    );

    navigate("/booking", { state: { ...formData, ...selectedStation } });
  };

  // Disable Book button until all fields are filled
  const isButtonDisabled = !formData.firstName || !formData.lastName || !formData.destination;

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${trainBg})` }}
    >
   

      {isLoading ? (
        <LoadingScreen /> // Show the loading screen while fetching data
      ) : (
        <main className="flex-grow flex flex-col items-center justify-center mt-20">
          <h1 className="text-white text-5xl font-bold leading-tight text-center mb-12">
            Book Your Tickets Now!
          </h1>

          <div className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <label
                  htmlFor="destination"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Destination
                </label>
                <select
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Select your destination</option>
                  {stations.map((station) => (
                    <option key={station.id} value={station.stationName}>
                      {station.stationName}
                    </option>
                  ))}
                </select>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isButtonDisabled}
                className="w-full bg-purple-700 text-white font-semibold py-3 rounded-md shadow-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Book
              </button>
            </form>
          </div>
        </main>
      )}
    </div>
  );
};

export default Home;
