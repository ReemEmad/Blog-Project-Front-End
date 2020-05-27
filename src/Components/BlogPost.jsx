import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
//  import MyButton from "./myButton";
//import imgSrc from "/images/design_brighter-kitchen-solution_180K.jpg";

class BlogPost extends Component {
  state = {
    loadings: [],
    more: false,
  };
  enterLoading = (index) => {
    const newLoadings = [...this.state.loadings];
    newLoadings[index] = true;
    this.setState({
      loadings: newLoadings,
    });
    setTimeout(() => {
      newLoadings[index] = false;
      this.setState({ loadings: newLoadings });
    }, 6000);
  };

  handleClick = (e) => {
    this.setState({ more: !this.state.more });
  };
  handlePage = (e) => {
    console.log(e.target);
  };

  render() {
    const { loadings } = this.state;
    const { id, match } = this.props;
    return (
      <React.Fragment>
        {/* Column */}
        {/* Cover */}

        <img src={this.props.img} alt="" onClick={this.handlePage} />
        <h3 style={{ paddingTop: "5%" }}>{this.props.title}</h3>
        {/* Content */}
        <p className="blog-body" style={{ maxWidth: "100%" }}>
          {this.props.body}
          {!this.state.more && <span className="dots">...</span>}
          {this.state.more && <span className="more">{this.props.rest}</span>}
        </p>
        {/* </div> */}
        {/* <Button
          type="danger"
          icon={<EyeOutlined />}
          loading={loadings[2]}
          onClick={() => console.log(this.props.id)}
        /> */}
        <button
          style={{ backgroundColor: "#DF9881" }}
          id={this.props.id}
          onClick={(e) => this.handleClick(e)}
        >
          {this.state.more ? "Read Less" : "Read More"}
        </button>
        {/* <MyButton>
          key={this.props.id}
          id={this.props.id}
          onHandleClick={this.handleClick}
        </MyButton> */}
      </React.Fragment>
    );
  }
}

export default BlogPost;
