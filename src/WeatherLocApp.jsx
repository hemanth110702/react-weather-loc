import { useEffect, useRef, useState } from "react";
import { findUserLocation, getWeatherData } from "./components/WeatherUtils";
import InputSearch from "./components/InputSearch";
import WeeklyForecast from "./components/WeeklyForecast";

const WeatherLocApp = () => {
  const inputRef = useRef(null);
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
    if (location.name != "") {
      getLocationWeather();
    }
  }, [location]);

  useEffect(() => {
    console.log(locData);
  }, [locData]);

  return (
    <div>
      WeatherLocApp
      <InputSearch setLocation={setLocation} inputRef={inputRef} />
      <button onClick={getUserLocation}>Navigate</button>
      {location.name != "" ? 
      <div>
        Weather <br />
        Location: {location.name}, {location.country} <br />
        Description: {locData.description} <br />
        Temperature: {Math.trunc(locData.temperature)}&deg;C <br />
        Month: {locData.month} <br />
        Date: {locData.date} <br />
        Day: {locData.day} <br />
        Real_Feel: {Math.trunc(locData.real_feel)}&deg;C <br />
        Humidity: {locData.humidity} <br />
        Clouds: {locData.clouds} <br />
        Wind: {locData.wind} <br />
        TodayForecast: {locData.todayForecast.length} <br />
        {locData.todayForecast.map((item, index) => (
          <div key={index}>
            {item.dt_txt.slice(11, 16)}----{Math.trunc(item.main.temp - 273.15)}
            &deg;C
          </div>
        ))}
        <WeeklyForecast locData={locData} location={location} />
      </div>: <h1>Search the location</h1>}
    </div>
  );
};

export default WeatherLocApp;
