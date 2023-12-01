const AirCondition = ({ locData }) => {
  return (
    <div className="more-weather">
      <div className="weather-info">
        <h2>Weather</h2>
        {locData.day} <br />
        {locData.description}
      </div>
      <div className="air-condition">
        <h2>Air Conditions</h2>
        <div className="weather-condition">
          <div className="ac-container">
            <div>
              <img className="acImg" src="/images/realFeel.png" alt="" />
              <p>Real Feel</p>
            </div>
            {Math.trunc(locData.real_feel)}&deg;C <br />
          </div>
          <div className="ac-container">
            <div>
              <img
                className="acImg"
                src="/images/humidity.png"
                alt="humidity image"
              />
              <p>Humidity</p>
            </div>
            {locData.humidity} <br />
          </div>
          <div className="ac-container">
            <div>
              <img className="acImg" src="/images/clouds.png" alt="" />
              <p>Clouds</p>
            </div>
            {locData.clouds} <br />
          </div>
          <div className="ac-container">
            <div>
              <img className="acImg" src="/images/wind.png" alt="" />
              <p>Wind</p>
            </div>
            {locData.wind} <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirCondition;
