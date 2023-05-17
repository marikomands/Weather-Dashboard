import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CurrentWeather from "./CurrentWeather";
import HourlyWeatherForecast from "./HourlyWeatherForecast";
import SevenDaysWeatherForecast from "./ThreeDaysWeatherForecast";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<CurrentWeather />} />
          {/* <Route
            path="/hourly/weather-forecast"
            element={<HourlyWeatherForecast />}
          /> */}
          <Route
            path="/seven-days/weather-forecast/:city"
            element={<SevenDaysWeatherForecast />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// import React, { Component } from "react";
// import unsplash from "../api/unsplash";
// import SearchBar from "./SearchBar";
// import ImageList from "./ImageList";

// class App extends Component {
//   state = { images: [] };

//   onSearchSubmit = async (term) => {
//     const response = await unsplash.get("/search/photos", {
//       params: { query: term },
//     });
//     console.log("🚀 ~ App ~ onSearchSubmit= ~ response", response);
//     // console.log("🚀 ~ file: App.js ~ line 15 ~ App ~ response", response);
//     // .then((response) => {
//     //   console.log(
//     //     "🚀 ~ file: App.js ~ line 14 ~ App ~ response",
//     //     response.data.results
//     //   );
//     // });
//     this.setState({ images: response.data.results });
//   };

//   render() {
//     return (
//       <div className="ui container" style={{ marginTop: "10px" }}>
//         <SearchBar onSubmit={this.onSearchSubmit} />
//         <ImageList images={this.state.images} />
//       </div>
//     );
//   }
// }

// export default App;
