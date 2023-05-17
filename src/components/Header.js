import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "./Header.css";

const Header = ({ city }) => {
  return (
    <div className="header">
      <Link
        className="linkHeader"
        to={`/seven-days/weather-forecast/${encodeURIComponent(city)}`}
      >
        3 Days Forecast
      </Link>
    </div>
  );
};

export default Header;
