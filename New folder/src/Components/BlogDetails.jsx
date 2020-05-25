import React, { Component } from "react";
import axios from "axios";
import BlogPost from "./BlogPost";
class BlogDetails extends Component {
  state = { data: [] };

  componentDidMount() {
    axios
      .get(`http://localhost:4000/articles/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({ data: response.data });
      });
  }

  render() {
    const { data } = this.state;
    // console.log(data.tags);

    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default BlogDetails;
