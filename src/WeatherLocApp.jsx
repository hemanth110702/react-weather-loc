import { useEffect, useRef, useState } from "react";
import { findUserLocation, getWeatherData } from "./components/WeatherUtils";
import InputSearch from "./components/InputSearch";
import WeeklyForecast from "./components/WeeklyForecast";
import AirCondition from "./components/AirCondition";
import CurrentWeather from "./components/CurrentWeather";


const WeatherLocApp = () => {
  const inputRef = useRef(null);
  const dropdownMenuRef = useRef(null);
  const [location, setLocation] = useState({
    name: "",
    country: "",
  });

  const [locData, setLocData] = useState({
    country: "",
    clouds: "",
    date: "",
    day: "",
    dateInTime: 0,
    description: "",
    forecast: [],
    name: "",
    month: "",
    monthIndex: "",
    real_feel: "",
    humidity: "",
    temperature: "",
    todayForecast: [],
    weeklyForecast: [],
    wind: "",
  });

  const getUserLocation = async () => {
    const userLocationData = await findUserLocation();
    setLocation((prevData) => ({ ...prevData, ...userLocationData }));
    inputRef.current.value = `${userLocationData.name}, ${userLocationData.country}`;
  };

  const getLocationWeather = async () => {
    const weatherData = await getWeatherData(location.name, location.country);
    if (weatherData) {
      setLocData((prevData) => ({ ...prevData, ...weatherData }));
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target)
      ) {
        dropdownMenuRef.current.innerHTML = "";
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (location.name != "") {
      getLocationWeather();
    }
  }, [location]);

  useEffect(() => {
    console.log("refer", locData);
  }, [locData]);

  return (
    <div className="weather-container">
      <h1>WeatherLocApp</h1>
      <div className="input-container">
        <div className="input-top">
          <InputSearch setLocation={setLocation} inputRef={inputRef} />
          <button onClick={getUserLocation}>Navigate</button>
        </div>
      </div>
      <div
        className="dropdown-menu search-options"
        id="dropdownMenu"
        ref={dropdownMenuRef}
      ></div>
      {location.name != "" ? (
        locData.temperature != "" ? (
          <div className="weather-details">
            <div className="weather-location">
              Location: {location.name}, {location.country} <br />
              Today {locData.date} {locData.month} <br />
            </div>
            <div className="todayForecast">
              <CurrentWeather locData={locData} location={location} />
              <AirCondition locData={locData} />
            </div>
            <WeeklyForecast locData={locData} location={location} />
          </div>
        ) : (
          <h2>...Loading</h2>
        )
      ) : (
        <h1>Search the location</h1>
      )}
    </div>
  );
};

export default WeatherLocApp;
