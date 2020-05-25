import React, { Component } from "react";
import { Link } from "react-router-dom";
class Hero extends Component {
  state = {};
  render() {
    return (
      <div className="bgimg-1 w3-display-container w3-opacity-min" id="home">
        <div className="w3-display-middle" style={{ whiteSpace: "nowrap" }}>
          <span className="w3-center w3-padding-large w3-white w3-xlarge w3-wide w3-animate-opacity">
            MY <span className="w3-hide-small">Blog</span>
          </span>
          <div className="w3-center w3-padding-large w3-wide w3-right">
            <Link to="/home">
              <i class="fa fa-arrow-circle-right fa-2x" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero;
