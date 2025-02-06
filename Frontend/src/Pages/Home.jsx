import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate
import trainBg from "../assets/Background_Image.png"; 
import logo from "../assets/Picture1.png"; 
import { Link } from "react-router-dom";
import LoadingScreen from "./Loading"; // Import the loading component
import Cheat from "../assets/cheating.jpg"
import vaibhav from "../assets/vaibhav.jpg"
import team from "../assets/team.jpg"
import team1 from "../assets/team1.jpg"
import { FaTrophy, FaCoffee } from "react-icons/fa";


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
        const response = await fetch("https://optical-wall-450106-p9.an.r.appspot.com/api/trainstations");
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
    <section>
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
    
    <div className="max-w-screen-xl 2xl:max-w-screen-3xl px-4 sm:px-6 md:px-12 mx-auto py-12 lg:py-24 space-y-12 flex flex-col justify-center">
      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
        {[team1, Cheat, vaibhav, team].map((img, index) => (
          <a href="#_" key={index} className="w-full max-w-[150px] sm:max-w-[200px] md:max-w-[250px]">
            <img
              src={img}
              className="rounded-xl transform duration-500 hover:rotate-0 hover:-translate-y-4 hover:scale-110 object-cover w-full h-auto"
              alt="Team Member"
            />
          </a>
        ))}
      </div>
      
  
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-[#5d001e] flex justify-center items-center gap-4 animate-pulse">
  <FaTrophy className="w-8 h-8 text-yellow-500 animate-bounce" />
  Pod1 - Champions at Heart
  <span className="inline-block w-10 h-10 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full shadow-xl transform rotate-45"></span>
</h1>

<span className="text-center text-[#5d001e] text-lg sm:text-xl md:text-2xl font-semibold italic">

  Fueling Success: Coffee, Creativity, and ChatGPT
</span>  </div>
    </section>
  );
};

export default Home;
