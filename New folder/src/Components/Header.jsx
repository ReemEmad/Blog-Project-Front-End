import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import jwtDecode from "jwt-decode";
class Header extends Component {
  state = {
    user: "",
    isLoading: false,
  };
  toggleFunction = () => {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") === -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  };

  loadUser = () => {
    this.setState({ isLoading: true }, () => {
      const jwt = localStorage.getItem("token");
      if (jwt) {
        const user = jwtDecode(jwt);
        this.setState({ user, isLoading: false });
      } else {
        this.setState({ isLoading: false });
      }
    });
  };
  componentDidMount = () => {
    this.loadUser();
  };

  render() {
    const { user, isLoading } = this.state;

    //console.log(Object.keys(user.userFound));
    // const { fullname } = user.userFound;
    // console.log(fullname);

    return (
      <React.Fragment>
        <div>
          {/* Navbar (sit on top) */}
          <div className="w3-top">
            <div className="w3-bar" id="myNavbar">
              <Link
                className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right"
                to=""
                onClick={this.toggleFunction}
                title="Toggle Navigation Menu"
              >
                <i className="fa fa-bars" />
              </Link>
              <Link to="/Home" className="w3-bar-item w3-button w3-right">
                HOME
              </Link>
              <Link
                to="/profile"
                className="w3-bar-item w3-button w3-hide-small w3-right"
              >
                {/* <i className="fa fa-user" />  */}
                Authors
              </Link>

              {!user && (
                <React.Fragment>
                  <Link
                    to="/"
                    className="w3-bar-item w3-button w3-hide-small w3-right"
                  >
                    {/* <i className="fa fa-th" /> */}
                    Sign Up
                  </Link>
                  <Link
                    to="/"
                    className="w3-bar-item w3-button w3-hide-small w3-right"
                  >
                    {/* <i className="fa fa-envelope" /> */}
                    Sign In
                  </Link>
                </React.Fragment>
              )}
              {isLoading && <Spin size="small" />}
              {!isLoading && user && (
                <React.Fragment>
                  <Link
                    to={`/profile/${user.userFound._id}`}
                    className="w3-bar-item w3-button w3-hide-small w3-left"
                  >
                    {/* <i className="fa fa-th" /> */}
                    welcome back, {user.userFound?.fullname}
                  </Link>
                  <Link
                    to="/logout"
                    className="w3-bar-item w3-button w3-hide-small w3-left"
                  >
                    Logout
                  </Link>
                </React.Fragment>
              )}
            </div>
            {/* Navbar on small screens */}
            <div
              id="navDemo"
              className="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium"
            >
              <a
                href="#about"
                className="w3-bar-item w3-button"
                onClick={this.toggleFunction}
              >
                ABOUT
              </a>
              <a
                href="#portfolio"
                className="w3-bar-item w3-button"
                onClick={this.toggleFunction}
              >
                PORTFOLIO
              </a>
              <a
                href="#contact"
                className="w3-bar-item w3-button"
                onClick={this.toggleFunction}
              >
                CONTACT
              </a>
              <a href="#end" className="w3-bar-item w3-button">
                SEARCH
              </a>
            </div>
          </div>
          {/* First Parallax Image with Logo Text */}
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
