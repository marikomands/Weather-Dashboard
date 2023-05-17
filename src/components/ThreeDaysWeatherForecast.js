import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "weather-icons/css/weather-icons.css";
// import { WiDaySunny, WiCloudy, WiRain, Withunderstorm } from "weather-icons";

// import { sunny, cloudy, rainy, thunderstorm } from "ionicons/icons";
import axios from "axios";
import SearchBar from "./SearchBar";
import "./ThreeDaysWeatherForecast.css";
import { terminal } from "ionicons/icons";

const Forecast = () => {
  const [forecastData, setForecastData] = useState(null);
  const [dataError, setDataError] = useState(false);
  const { city } = useParams();

  console.log("🚀 ~ Forcast ~ forecastData:", forecastData);
  console.log("🚀 ~ Forcast ~ city:", city);
  console.log("🚀 ~ Forcast ~ dataError:", dataError);

  // useEffect(() => {
  //   const delayTimer = setTimeout(() => {
  //     setDebounceCity(city);
  //   }, 1000); // Delay time in milliseconds
  //   // console.log("🚀 ~ delayTimer ~ setDebounceCity:", setDebounceCity);

  //   return () => {
  //     clearTimeout(delayTimer);
  //   };
  // }, [city]);

  useEffect(() => {
    if (city.trim() === "") {
      // setDataError(false);
      setForecastData(null);
    } else {
      fetchWeatherData();
    }
  }, [city]);

  const API_KEY = "70a32183695946b3bc1194541232404";
  const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`;

  // const getWeatherIcon = (conditionCode) => {
  //   if (conditionCode === 1000) return sunny;
  //   if (conditionCode === 1003) return cloudy;
  //   if (conditionCode >= 1006 && conditionCode <= 1009) return rain;
  //   if (conditionCode >= 1030 && conditionCode <= 1063) return snow;
  //   if (conditionCode >= 1072 && conditionCode <= 1075) return rainSharp;
  // //   return null;
  // // };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(API_URL);

      setDataError(false);
      setForecastData(response.data);
      console.log("🚀 ~ fetchWeatherData ~ response.data:", response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setDataError(true);
      setForecastData(null);
    }
  };

  return (
    <div>
      {/* <SearchBar setCity={setCity} city={city} /> */}
      {forecastData ? (
        <div>
          <h1>3 Days Forcast</h1>

          <h2 className="city">{forecastData.location.name}</h2>
          <h5 className="region">{forecastData.location.region}</h5>
          <h5 className="country">{forecastData.location.country}</h5>
          <div className="weatherDetails">
            {forecastData.forecast.forecastday.map((forecastDay) => {
              return (
                <div className="design">
                  <div key={forecastDay.date}>
                    <h3>{forecastDay.date}</h3>
                    <p>{forecastDay.day.condition.text}</p>
                    {/* <i
                      className={`wi ${getWeatherIcon(
                        forecastDay.day.condition.code
                      )}`}
                    ></i> */}
                    <img
                      src={forecastDay.day.condition.icon}
                      alt="Weather Icon"
                    />
                    <p>Max Temperature: {forecastDay.day.maxtemp_c} °C</p>
                    <p>Min Temperature: {forecastDay.day.mintemp_c} °C</p>
                    <p>Humidity: {forecastDay.day.avghumidity}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      {/* {city.length && dataError ? (
        <p>
          There is a problem fetching weather data for this location. Please
          refine your search.
        </p>
      ) : null} */}
    </div>
  );
};

export default Forecast;
