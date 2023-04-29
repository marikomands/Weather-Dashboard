import React, { useState, useEffect } from "react";
import { sunny, cloudy, rainy, thunderstorm } from "ionicons/icons";
import axios from "axios";
import SearchBar from "./SearchBar";
import "./CurrentWeather.css";
// import WeatherAPI from "../api/WeatherAPI";

const CurrentWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Whitley Bay");
  const [imageError, setImageError] = useState(false);
  const [weatherIcon, setWeatherIcon] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const API_KEY = "70a32183695946b3bc1194541232404";
  const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

  const getWeatherIcon = (conditionCode) => {
    switch (conditionCode) {
      case 1000:
        return sunny;
      case 1003:
        return cloudy;
      case 1063:
      case 1180:
      case 1183:
        return rainy;
      case 1087:
      case 1273:
      case 1276:
        return thunderstorm;
      default:
        return null;
    }
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(API_URL);
      setWeatherData(response.data);
      setWeatherIcon(getWeatherIcon(response.data.current.condition.code));
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

          <h2 className="city">{weatherData.location.name}</h2>
          <h5 className="region">{weatherData.location.region}</h5>
          <h5 className="country">{weatherData.location.country}</h5>
          <div className="weatherDetails">
            <p>{weatherData.current.condition.text}</p>
            <ion-icon icon={weatherIcon}></ion-icon>
            <p>Temperature: {weatherData.current.temp_c} °C</p>
            <p>Feels Like: {weatherData.current.feelslike_c}℃</p>
            <p>Humidity: {weatherData.current.humidity}</p>
            <p>Wind Speed: {weatherData.current.wind_kph}kph</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {imageError ? <p>Couldn't get Image</p> : null}
    </div>
  );
  // <CurrentWeatherDetails data={WeatherData} />;
};

export default CurrentWeather;
