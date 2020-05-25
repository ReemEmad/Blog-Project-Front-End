import React from "react";
import src from "../Assets/images/000-404.png";

const Error = ({ match }) => {
  console.log(match);
  return (
    <React.Fragment>
      <img id="home" src={src} alt="404"></img>
    </React.Fragment>
  );
};

export default Error;
