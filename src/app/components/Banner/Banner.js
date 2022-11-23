import React from "react";
import logo from "./logo.png";
import "./index.css";

const Banner = () => {
  return (
    <div className="banner">
      <img src={logo} alt="icon" />
      <strong>BlogBook</strong>
    </div>
  );
};

export default Banner;
