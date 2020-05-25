import React, { Component } from "react";
import axios from "../axios";
import imgSrc from "../Assets/images/icon.png";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { Link, Route, Switch } from "react-router-dom";

class Authors extends Component {
  state = { users: [], isLoading: false };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    try {
      const res = await axios.get("http://localhost:4000/users/");
      this.setState({
        isLoading: false,
        visible: false,
        users: res.data,
      });
      //toast.success("🦄Deleted!");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("haha");
    }
  }

  render() {
    const { users, isLoading } = this.state;

    console.log(users);

    return (
      <>
        <h1 id="h1-home" style={{ paddingTop: "5%" }}>
          Our Lovely Authors
        </h1>
        <div
          className="card-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "start",
            alignItems: "center",
            alignContent: "center",
            padding: "0% 10%",
            fontSize: "20px",
          }}
        >
          {isLoading ? (
            <Spin size="large" />
          ) : users ? (
            users.map((d) => {
              return (
                <div
                  className="card"
                  id="home"
                  style={{
                    flexBasis: "30%" /* space between columns */,
                    paddingLeft: "25px" /* layout each column */,
                    paddingRight: "25px",
                    border: "none",
                    margin: "20px",
                    width: "150px",
                  }}
                >
                  <br></br>
                  <div className="author-card">
                    <Link to={`/profile/${d._id}`}>
                      {/* </Link> */}

                      <img src={imgSrc} style={{ width: 100 }} />
                      <p>{d.fullname}</p>
                      {/* <p>{d.username}</p> */}
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No Blogs Found</p>
          )}
        </div>
      </>
    );
  }
}

export default Authors;
