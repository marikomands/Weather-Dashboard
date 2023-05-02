import React, { useState } from "react";

const SearchBar = ({ city, setCity }) => {
  return (
    <div className="containerWrapper">
      <label className="fontLabel">City Name</label>
      <input
        className="input"
        value={city}
        type="text"
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
