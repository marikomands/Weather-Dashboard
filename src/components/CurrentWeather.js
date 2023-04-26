import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

const CurrentWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Whitley Bay");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const API_KEY = "70a32183695946b3bc1194541232404";
  const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(API_URL);
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      setImageError(true);
      console.error("Error fetching weather data:", error);
    }
  };
  return (
    <div>
      <SearchBar onSubmit={setCity} />
      {weatherData ? (
        <div>
          <h1>Current Weather</h1>
          <h2>{weatherData.location.name}</h2>
          <h5>{weatherData.location.country}</h5>
          <p>{weatherData.current.condition.text}</p>
          <p>Temperature: {weatherData.current.temp_c} °C</p>
          <p>Feels Like: {weatherData.current.feelslike_c}℃</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  // <CurrentWeatherDetails data={WeatherData} />;
};

export default CurrentWeather;
