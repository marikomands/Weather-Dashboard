import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import "./HourlyWeatherForecast.css";
import "weather-icons/css/weather-icons.css";

const HourlyWeatherForact = ({
  setCity,
  city,
  debounceCity,
  setDebounceCity,
}) => {
  const [forecastData, setForecastData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  // const [city, setCity] = useState("");
  // const [debounceCity, setDebounceCity] = useState("");
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
      // setDataError(false);
      setForecastData(null);
    } else {
      fetchHourlyData();
    }
  }, [debounceCity]);

  const API_KEY = "70a32183695946b3bc1194541232404";
  const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`;

  const fetchHourlyData = async () => {
    try {
      const response = await axios.get(API_URL);

      setDataError(false);
      setForecastData(response.data);

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setDataError(true);
      setForecastData(null);
    }
  };

  return (
    <div>
      {/* <SearchBar setCity={setCity} /> */}

      {forecastData ? (
        <div>
          <h1>7 Days Hourly Weather Forecast</h1>
          {/* <h4>City: {forecastData.location.name}</h4> */}
          <div className="hour">
            {forecastData.forecast.forecastday.map((forecastDay) => (
              <div key={forecastDay.date}>
                <h3>{forecastDay.date}</h3>
                <div>
                  {forecastDay.hour.map((hour) => (
                    <div key={hour.time_epoch}>
                      <h4>{hour.time.substring(11)}</h4>

                      <p>Temperature: {hour.temp_c} °C</p>
                      <p>Condition: {hour.condition.text}</p>
                      <img src={hour.condition.icon} alt="Weather Icon" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {city.length && dataError ? (
        <p>
          There is a problem fetching weather data for this location. Please
          refine your search.
        </p>
      ) : null}
    </div>
  );
};

export default HourlyWeatherForact;
