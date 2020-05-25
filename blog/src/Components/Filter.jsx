import React, { Component } from "react";
import { Button, Col, Row } from "antd";

class Filter extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="site-button-ghost-wrapper">
          <Row>
            <Col span={2}>
              <Button type="primary" block>
                Primary
              </Button>
            </Col>
          </Row>

          <Row>
            <Col span={2}>
              <Button type="primary" block>
                Default
              </Button>
            </Col>
          </Row>

          <Row>
            <Col span={2}>
              <Button type="dashed" block>
                link
              </Button>
              <Button type="link" block>
                link
              </Button>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Filter;
