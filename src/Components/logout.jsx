import React, { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    localStorage.removeItem("userObject");
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
