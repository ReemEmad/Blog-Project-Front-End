import React, { Component } from "react";
import SignIn from "../../src/Components/SignIn";
import Register from "../../src/Components/Register";
import { Row, Col, Divider } from "antd";

class Auth extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="auth">
          <Row justify="center" align="top">
            <Col span={12}>
              <h2 id="authHeader">Sign Up to get the latest blog posts</h2>
            </Col>
          </Row>
          <div className="btnGrp">
            <Row justify="center" align="top">
              <Col span={6}>
                <Register {...this.props}></Register>
              </Col>
              <Col span={6}>
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
