import React from "react";
import Clouds from "../svg/clouds.svg";
import Sun from "../svg/sun.svg";
import Fog from "../svg/fog.svg";
import Rain from "../svg/rain.svg";
import Thunderstorm from "../svg/thunderstorm.svg";
import Snow from "../svg/snow.svg";
import Moon from "../svg/moon.svg";

const Result = props => {
  const {
    date,
    city,
    temp,
    main,
    err,
    description,
    country,
    sunset,
    sunrise
  } = props.allValues;

  const iconsList = {
    Clouds,
    Clear: Sun,
    Fog,
    Mist: Fog,
    Haze: Fog,
    Rain,
    Drizzle: Rain,
    Thunderstorm,
    Snow,
    Smoke: Fog
  };

  const currentTime = new Date();
  const moonTime = new Date(sunset * 1000 + 1.5 * 60 * 60 * 1000);
  const sunTime = new Date(sunrise * 1000 - 1.5 * 60 * 60 * 1000);

  if (currentTime >= moonTime || currentTime <= sunTime) {
    iconsList.Clear = Moon;
  } else if (currentTime > sunTime && currentTime < moonTime) {
    iconsList.Clear = Sun;
  }

  let content = null;
  let notFound = null;

  if (!err && city) {
    content = (
      <>
        <p className="city">
          {city}
          <span className="country">, </span>
          {country}
        </p>
        <p className="desc">{description}</p>
        <p className="degrees">{temp.toFixed(0)} &#176;C</p>

        <p className="clouds">
          {<img className="icons" src={iconsList[main]} alt="weather icon" />}
        </p>
        <p className="date">{date}</p>
      </>
    );
  } else {
    notFound = (
      <>
        <p>City not found</p>
        <p className="globe">
          <i className="fas fa-globe-africa"></i>
        </p>
      </>
    );
  }
  return (
    <>
      <div className="position">{err ? notFound : content}</div>
    </>
  );
};

export default Result;
