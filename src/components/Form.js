import React from "react";
import "./App.css";

const Form = props => {
  return (
    <form className="form" onSubmit={props.submit}>
      <input
        className="input"
        type="text"
        value={props.value}
        placeholder="Choose a city..."
        onChange={props.change}
      />
      <button className="btn">
        <i className="fas fa-check-square"></i>
      </button>
    </form>
  );
};

export default Form;
