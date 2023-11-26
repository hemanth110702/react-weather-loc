import React, { useEffect, useState } from "react";

const WeatherApp = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const location = "London";
  const [data, setData] = useState({
    location: location,
    description: "",
    temperature: "",
    country: "",
    date: "",
    month: "",
    monthIndex: "",
    day: "",
    real_feel: "",
    humidity: "",
    clouds: "",
    wind: "",
    forecast: [],
  });
  const [todayForecast, setTodayForecast] = useState([]);
  const w_url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=4cb69279ed43fd0729031826cae5c55c`;
  const f_url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=4cb69279ed43fd0729031826cae5c55c`;

  const getWeatherData = async () => {
    try {
      const w_response = await fetch(w_url);
      const w_data = await w_response.json(); // Wait for the JSON data
      const f_response = await fetch(f_url);
      const f_data = await f_response.json(); // Wait for the JSON data

      console.log(w_data);
      console.log(f_data);
      const date = new Date(w_data.dt * 1000);
      const dt = date.getDate();
      const day = date.getDay();
      const month = date.getMonth();

      console.log(f_data.list);

      setData((prevData) => ({
        ...prevData,
        description: w_data.weather[0].description,
        temperature: w_data.main.temp - 273.15,
        country: w_data.sys.country,
        month: months[month],
        monthIndex: month + 1,
        date: dt,
        day: days[day],
        real_feel: w_data.main.feels_like - 273.15,
        humidity: w_data.main.humidity,
        clouds: w_data.clouds.all,
        wind: w_data.wind.speed,
        forecast: f_data.list,
      }));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  useEffect(() => {
    // This useEffect runs whenever data changes
    if (data.forecast.length > 0) {
      console.log(data);
      setTodayForecast((prevTodayForecast) =>
        data.forecast.filter(
          (item) =>
            data.date === +item.dt_txt.slice(8, 10) &&
            data.monthIndex === +item.dt_txt.slice(5, 7)
        )
      );
      console.log(todayForecast);
    }
  }, [data]);

  return (
    <div>
      <h1>Weather and Forecasting</h1>
      <div>
        <h2>Current Weather</h2>
        <h3>
          Location: {data.location}, {data.country}
        </h3>
        <h3>Description: {data.description}</h3>
        <h3>Temperature: {Math.trunc(data.temperature)}&deg;C</h3>
        <h3>
          Date: {data.date} {data.month} {data.day}
        </h3>
      </div>
      <div>
        <h2>Air Conditions</h2>
        <h3>Real Feel : {Math.trunc(data.real_feel)}&deg;C</h3>
        <h3>Wind: {data.wind} m/s</h3>
        <h3>humidity: {data.humidity} %</h3>
        <h3>Clouds: {data.clouds}%</h3>
      </div>
      <div>
        <h2>Today's Forecast</h2>
        <h3>Forecasts available are : {todayForecast.length}</h3>
        {todayForecast.map((item, index) => (
          <h3 key={index}>
            <div>{item.dt_txt.slice(11, 16)}</div>
            <div>{Math.trunc(item.main.temp - 273.15)}&deg;C</div>
            <div>{item.weather[0].description}</div>
          </h3>
        ))}
      </div>
      <div>
        <h2>Weekly Forecast</h2>
      </div>
    </div>
  );
};

export default WeatherApp;
