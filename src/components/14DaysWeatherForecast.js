import React, { useState, useEffect } from "react";
import "weather-icons/css/weather-icons.css";
// import { WiDaySunny, WiCloudy, WiRain, Withunderstorm } from "weather-icons";

// import { sunny, cloudy, rainy, thunderstorm } from "ionicons/icons";
import axios from "axios";
import SearchBar from "./SearchBar";
import "./14DaysWeatherForecast.css";

const Forcast = () => {
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState("Whitley Bay");
  const [debounceCity, setDebounceCity] = useState(city);
  const [imageError, setImageError] = useState(false);
  // const [weatherIcon, setWeatherIcon] = useState(null);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setDebounceCity(city);
    }, 1000); // Delay time in milliseconds
    console.log("🚀 ~ delayTimer ~ setDebounceCity:", setDebounceCity);

    return () => {
      clearTimeout(delayTimer);
    };
  }, [city]);

  useEffect(() => {
    fetchWeatherData();
  }, [debounceCity]);

  const API_KEY = "70a32183695946b3bc1194541232404";
  const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=7&q=${city}`;

  // const getWeatherIcon = (conditionCode) => {
  //   if (conditionCode === 1000) return sunny;
  //   if (conditionCode === 1003) return cloudy;
  //   if (conditionCode >= 1006 && conditionCode <= 1009) return rain;
  //   if (conditionCode >= 1030 && conditionCode <= 1063) return snow;
  //   if (conditionCode >= 1072 && conditionCode <= 1075) return rainSharp;
  // //   return null;
  // // };

  // const getWeatherIcon = (conditionCode) => {
  //   switch (conditionCode) {
  //     case 1000:
  //       return "wi-day-sunny";
  //     case 1003:
  //     case 1006:
  //       return "wi-cloudy";
  //     case 1063:
  //     case 1180:
  //     case 1183:
  //     case 1189:
  //       return "wi-rain";
  //     case 1087:
  //     case 1273:
  //     case 1276:
  //       return "wi-thunderstorm";
  //     default:
  //       return null;
  //   }
  // };
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(API_URL);
      setForecastData(response.data);

      console.log(response.data);
    } catch (error) {
      setImageError(true);
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={setCity} />
      {forecastData ? (
        <div>
          <h1>14 Days Forcast</h1>

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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {imageError ? <p>Couldn't get data</p> : null}
    </div>
  );
};

export default Forcast;
