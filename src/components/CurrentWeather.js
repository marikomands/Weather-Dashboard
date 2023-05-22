import React, { useState, useEffect } from "react";
import axios from "axios";
import "weather-icons/css/weather-icons.css";
import SearchBar from "./SearchBar";
import "./CurrentWeather.css";
import ForecastLink from "./ForecastLink";
import HourlyWeatherForecast from "./HourlyWeatherForecast";
import SevenDaysWeatherForecast from "./ThreeDaysWeatherForecast";

// import WeatherAPI from "../api/WeatherAPI";

const CurrentWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [debounceCity, setDebounceCity] = useState("");
  const [dataError, setDataError] = useState(false);
  const [weatherIcon, setWeatherIcon] = useState(null);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setDebounceCity(city);
    }, 1000); // Delay time in milliseconds
    // console.log("🚀 ~ delayTimer ~ setDebounceCity:", setDebounceCity);

    return () => {
      clearTimeout(delayTimer);
    };
  }, [city]);

  useEffect(() => {
    if (debounceCity.trim() === "") {
      // setDataError(true);
      setWeatherData(null);
    } else {
      fetchWeatherData();
    }
  }, [debounceCity]);

  const API_KEY = "70a32183695946b3bc1194541232404";
  const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(API_URL);
      setDataError(false);
      setWeatherData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log("fetching error occured", error);
      setDataError(true);
      setWeatherData(null);
    }
  };

  return (
    <div>
      <h2>Current Weather</h2>
      <div className="header">
        <SearchBar setCity={setCity} city={city} />

        <ForecastLink city={city} />
      </div>
      {/* <SevenDaysWeatherForecast /> */}
      {city.length && dataError ? (
        <p>
          There is a problem fetching weather data for this location. Please
          refine your search.
        </p>
      ) : null}
      {weatherData ? (
        <div>
          <h2 className="city">{weatherData.location.name}</h2>
          <h5 className="region">{weatherData.location.region}</h5>
          <h5 className="country">{weatherData.location.country}</h5>
          <div className="currentWeatherDetails">
            <h3>{weatherData.current.condition.text}</h3>
            <img src={weatherData.current.condition.icon} alt="Weather Icon" />
            <h3> {weatherData.current.temp_c} °C</h3>
            <p>Feels Like: {weatherData.current.feelslike_c}℃</p>
            <p>Humidity: {weatherData.current.humidity}</p>
            <p>Wind Speed: {weatherData.current.wind_kph}kph</p>
          </div>
        </div>
      ) : city.length && dataError ? null : (
        <p>Enter City</p>
      )}
      <HourlyWeatherForecast
        setCity={setCity}
        city={city}
        debounceCity={debounceCity}
        setDebounceCity={setDebounceCity}
      />
    </div>
  );
};

export default CurrentWeather;
