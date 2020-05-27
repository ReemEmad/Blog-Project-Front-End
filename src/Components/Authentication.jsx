import React, { Component } from "react";
import SignIn from "../../src/Components/SignIn";
import Register from "../../src/Components/Register";
import { Row, Col, Divider } from "antd";
import imgSrc from "../Assets/images/heroHeader.jpg";

class Auth extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="left"></div>
        <div className="auth" id="home" style={{ paddingTop: "5%" }}>
          {/* <h3 style={{ textAlign: "center" }}>My Blog</h3> */}

          <Row justify="center" gutter={[16, 8]} align="bottom">
            <Col span={8}>
              <img src={imgSrc} style={{ width: "50", height: "50" }}></img>
              <h2 id="authHeader">Sign Up to get the latest blog posts</h2>
            </Col>
          </Row>

          <div className="btnGrp">
            <Row justify="center" gutter={[16, 8]} align="top">
              <Col span={3}>
                <Register
                  style={{ backgroundColor: "#df9881" }}
                  {...this.props}
                ></Register>
              </Col>
              <Col span={3}>
                <SignIn {...this.props}></SignIn>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Auth;
