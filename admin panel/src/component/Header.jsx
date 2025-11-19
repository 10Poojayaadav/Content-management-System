import React, { useState, useEffect } from "react";
import axios from "axios";

const Header = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const API_KEY = "d4d64c6257b1849abe795e629d9f7c64";
  const LOCATION = "Bengaluru";

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&units=metric&appid=${API_KEY}`
        );
        console.log("API Response: ", response.data);
        setWeather(response.data);
      } catch (err) {
        console.error(
          "Weather Fetch Error: ",
          err.response ? err.response.data : err.message
        );
        setError("Failed to fetch weather data");
      }
    };

    fetchWeather();
  }, [LOCATION, API_KEY]);

  return (
    <div className="flex flex-col items-end space-y-4 p-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 dark:bg-gradient-to-r dark:from-black dark:via-gray-800 dark:to-gray-600 rounded-lg shadow-md text-black dark:text-white">
   
  
      <div className="bg-white bg-opacity-20 p-2 rounded-lg shadow-md text-right">
        {weather ? (
          <div>
            <p className="text-lg font-medium">
              🌡️ Temperature:
              <span className="font-bold"> {weather.main.temp}°C</span>
            </p>
            <p className="text-lg font-medium mt-2">
              🌥️ Condition:
              <span className="capitalize font-bold">
                {" "}
                {weather.weather[0].description}
              </span>
            </p>
          </div>
        ) : error ? (
          <p className="text-red-400 font-semibold">{error}</p>
        ) : (
          <p className="text-gray-300 font-medium">Loading weather...</p>
        )}
      </div>
      <div className="text-2xl font-semibold">{time.toLocaleTimeString()}</div>
    </div>
  );
};

export default Header;
