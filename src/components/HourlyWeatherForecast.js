import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment-timezone";
import SearchBar from "./SearchBar";
import "./HourlyWeatherForecast.css";
import "weather-icons/css/weather-icons.css";

const HourlyWeatherForact = ({ city, debounceCity, setDebounceCity }) => {
  const [forecastData, setForecastData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
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
      setDataError(false);
      setForecastData(null);
    } else {
      fetchHourlyData();
    }
  }, [debounceCity]);

  const API_KEY = "70a32183695946b3bc1194541232404";
  const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}`;

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

  const getCurrentHour = () => {
    const currentDate = new Date();
    console.log("🚀 ~ getCurrentHour ~ currentDate:", currentDate);
    const currentHour = currentDate.getHours();
    return currentHour;
  };

  const filterHourlyData = () => {
    const currentHour = getCurrentHour();
    console.log("🚀 ~ filterHourlyData ~ currentHour:", currentHour);
    const timezone = forecastData.location.tz_id;

    const filteredData = forecastData.forecast.forecastday.map((day) => {
      const filteredHourData = day.hour.filter((hour) => {
        const hourTime = moment.tz(hour.time, timezone).hour();
        // console.log("🚀 ~ filteredHourData ~ hourTime:", hourTime);
        // const hourTime = parseInt(hour.time.substring(11));
        return hourTime >= currentHour;
      });
      return {
        ...day,
        hour: filteredHourData,
      };
    });

    return filteredData;
  };

  const filteredData = forecastData ? filterHourlyData() : null;

  console.log("🚀 ~ filterHourlyData ~ filteredData:", filteredData);

  return (
    <div>
      {forecastData ? (
        <div>
          <h1>Hourly Weather Forecast</h1>
          <div className="hour">
            {filteredData.map((day) => {
              return day.hour.map((hour) => {
                const localTime = moment(hour.time)
                  .tz(forecastData.location.tz_id)
                  .format("HH:mm");
                return (
                  <div key={hour.time_epoch} className="hourlyDetails">
                    <p>{localTime}</p>
                    {/* <h4>{hour.time.substring(11)}</h4> */}
                    <p>{hour.temp_c} °C</p>
                    <p> {hour.condition.text}</p>
                    <img src={hour.condition.icon} alt="Weather Icon" />
                  </div>
                );
              });
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HourlyWeatherForact;
