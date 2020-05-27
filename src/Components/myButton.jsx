import React, { Component } from "react";
class myButton extends Component {
  state = {};
  render() {
    console.log(this.props);
    return (
      <button id={this.props.id} onClick={(e) => this.props.onHandleClick(e)}>
        Read More
      </button>
    );
  }
}

export default myButton;
