import { getNextDays } from "./WeatherUtils";

const WeeklyForecast = ({ locData, location }) => {
  let today, newDays;

  if (locData.day != "") {
    today = new Date(locData.dateInTime * 1000);
    newDays = getNextDays(today);
  }

  return (
    <div>
      WeeklyForecast: {locData.weeklyForecast.length} <br />
      {locData.weeklyForecast.map((item, index) => {
        return <div key={index}>
          <div>{newDays[index]}</div>
          <div>{Math.trunc(item.main.temp - 273.15)}&deg;C</div>
        </div>;
      })}
    </div>
  );
};

export default WeeklyForecast;