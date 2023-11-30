const AirCondition = ({ locData }) => {
  return (
    <div className="air-condition">
      <h2>Weather</h2>
      {locData.day} <br />
      {locData.description}
      <h2>Air Conditions</h2>
      <div>
        <img src="/images/realFeel.png" alt="" />
        Real_Feel: {Math.trunc(locData.real_feel)}&deg;C <br />
      </div>
      <div>
        <img src="/images/humidity.png" alt="humidity image" />
        Humidity: {locData.humidity} <br />
      </div>
      <div>
        <img src="/images/clouds.png" alt="" />
        Clouds: {locData.clouds} <br /></div>
      <div>
        <img src="/images/wind.png" alt="" />
        Wind: {locData.wind} <br />
      </div>
    </div>
  );
};

export default AirCondition;
