import React, { Component } from "react";
import { Pagination } from "antd";

class Paginate extends Component {
  state = {};
  render() {
    return <Pagination defaultCurrent={1} total={50} />;
  }
}

export default Paginate;
