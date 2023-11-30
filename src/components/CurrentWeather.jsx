const CurrentWeather = ({ location, locData }) => {
  return (
    <div className="current-weather">
      <div className="display-weather">
        <div className="img-temp">
          <img
            className="weather-img"
            src={`http://openweathermap.org/img/w/${locData.weather.icon}.png`}
          />
          <div className="temp">
            {Math.trunc(locData.temperature)}&deg;C <br />
          </div>
        </div>

        
      </div>
      <div>
        TodayForecast: {locData.todayForecast.length} <br />
        {locData.todayForecast.map((item, index) => (
          <div key={index}>
            {item.dt_txt.slice(11, 16)}----{Math.trunc(item.main.temp - 273.15)}
            &deg;C
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentWeather;
