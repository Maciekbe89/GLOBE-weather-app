import React from "react";
import Sunrise from "../svg/sunrise.svg";
import Sunset from "../svg/sunset.svg";

const ResultBottom = props => {
  const { sunrise, sunset, pressure, wind, err, city } = props.allValues;

  let content = null;

  if (!err && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

    content = (
      <div className="bottom">
        <div className="size">
          <img className="bottomIcons" src={Sunrise} alt="icons" />
          <span>{sunriseTime}</span>
        </div>
        <div className="size">
          <p className="wind">
            <i className="fas fa-wind"></i>
          </p>

          <span>{wind.toFixed(1)} m/s</span>
        </div>

        <div className="size">
          <p className="pressure">
            <i className="fas fa-poll"></i>
          </p>
          <span>{pressure} hPa</span>
        </div>
        <div className="size">
          <img className="bottomIcons" src={Sunset} alt="icons" />

          <span>{sunsetTime}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>{err ? "" : content}</div>
    </>
  );
};

export default ResultBottom;
