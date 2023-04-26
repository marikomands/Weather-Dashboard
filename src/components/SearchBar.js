import React, { useState } from "react";

const SearchBar = ({ onSubmit }) => {
  const [city, setCity] = useState("");
  console.log(city);

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log("🚀 ~ onFormSubmit ~ onFormSubmit");
    onSubmit(city);
  };

  return (
    <div className="containerWrapper">
      <form className="formSubmit" onSubmit={onFormSubmit}>
        <label className="fontLabel">Weather Search</label>
        <input
          className="input"
          value={city}
          type="text"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
