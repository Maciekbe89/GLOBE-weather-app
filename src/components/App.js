import React, { Component } from "react";
import Form from "./Form.js";
import Result from "./Result.js";
import ResultBottom from "./ResultBottom";
import "./App.css";

const APIKey = "86dec29db52e5cbbec58568a6f0ae597";

class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    main: "",
    err: false,
    country: "",
    description: ""
  };

  componentDidMount() {
    fetch(
      "https://cors-anywhere.herokuapp.com/http://gd.geobytes.com/GetCityDetails"
    )
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error("nie udało się");
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.geobytescity);
        this.setState({
          value: data.geobytescity
        });
        this.handleCitySubmit();
      });
  }

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleCitySubmit = e => {
    if (e) {
      e.preventDefault();
    }

    const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}&units=metric`;

    fetch(API)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error("nie udało się");
      })
      .then(response => response.json())
      .then(data => {
        const time = new Date().toLocaleString();

        this.setState(() => ({
          err: false,
          date: time,
          city: data.name,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          main: data.weather[0].main,
          description: data.weather[0].description,
          country: data.sys.country,
          value: ""
        }));
      })
      .catch(() => {
        this.setState(prevState => ({
          err: true,
          city: prevState.value
        }));
      });
  };
  render() {
    return (
      <>
        <div className="container">
          <main className="main">
            <Form
              value={this.state.value}
              change={this.handleInputChange}
              submit={this.handleCitySubmit}
            />
            <Result allValues={this.state} />
          </main>
          <div className="bottom">
            <ResultBottom allValues={this.state} />
          </div>
        </div>
      </>
    );
  }
}

export default App;
