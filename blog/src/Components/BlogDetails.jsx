import React, { Component } from "react";
import axios from "axios";
import { Spin } from "antd";
class BlogDetails extends Component {
  state = { data: [], isLoading: true };
  getBlogDetails = () => {
    axios
      .get(`http://localhost:4000/articles/${this.props.match.params.id}`)
      .then((response) => {
        console.log("response.data", response.data);
        this.setState({ data: response.data, isLoading: false });
      })
      .catch((err) => {
        console.log("err.responese", err.response);
        this.setState({ isLoading: false });
      });
  };
  componentDidMount() {
    this.setState({ isLoading: true }, () => {
      this.getBlogDetails();
    });
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <React.Fragment>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <div
            id="home"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexFlow: "column",
              paddingTop: "5%",
            }}
          >
            <img
              src={data.imgUrl}
              style={{
                width: "40%",
                height: "30%",
              }}
            ></img>

            <div className="blog-body">
              <p className="author">by: {data.userId?.fullname}</p>
              <h3>{data.title}</h3>
              <p>{data.body}</p>

              {data.tags ? (
                data.tags.map((t) => {
                  return (
                    <i className="fa fa-tag" aria-hidden="true">
                      <span id="tag"> {t}</span>
                    </i>
                  );
                })
              ) : (
                <span>no tags</span>
              )}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default BlogDetails;
