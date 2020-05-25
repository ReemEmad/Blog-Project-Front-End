import React, { Component } from "react";
import { Card, Spin, Button, Tooltip } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
//TODO
import imgSrc from "../Assets/images/icon.png";
import { Link } from "react-router-dom";
import config from "../config.json";
import axios from "../axios";

class Profile extends Component {
  state = { user: null, articles: [] };

  async componentDidMount() {
    axios
      .get(`http://localhost:4000/users/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({ user: response.data });
      });

    const { data: articles } = await axios.get(config.apiEndpoint);
    this.setState({ articles: articles ? articles : [] });
    // console.log(this.state.articles);
  }

  handleDelete = async (article) => {
    const originalArticles = this.state.articles;

    const articles = this.state.articles.filter((a) => a._id !== article._id);
    this.setState({ articles });
    console.log("deletes");
    try {
      await axios.delete(config.apiEndpoint);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("this post has already been deleted");

      this.setState({ articles: originalArticles });
    }
  };
  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <h1 id="latest">Latest Blogs</h1>

        <div className="blog-card-body" id="home">
          {user ? (
            <React.Fragment>
              <div className="site-card-border-less-wrapper">
                <Card
                  className="profile-card"
                  hoverable
                  title="Personal Details:"
                  bordered={false}
                  style={{ width: 250 }}
                  cover={
                    <img
                      style={{ width: 150, margin: "auto" }}
                      src={imgSrc}
                    ></img>
                  }
                >
                  <p> Name: {user.fullname}</p>
                  <p>Email: {user.username}</p>
                  <p>Following: {user.following.length}</p>
                  <p>Followers: {user.followers.length}</p>

                  <Button type="danger" shape="round" size="small">
                    Follow me!
                  </Button>

                  {/* {user.followers && user.following ? (
                    <>
                    </>
                  ) : (
                    <>
                      {" "}
                      <p>Following: {user.following.length}</p>
                      <p>Followers: {user.followers.length}</p>
                    </>
                  )} */}
                </Card>
              </div>
              <div className="blog-card">
                {this.state.articles.length ? (
                  this.state.articles.map((d) => {
                    return (
                      <>
                        <Card
                          hoverable
                          type="inner"
                          title={d.title}
                          cover={
                            <img
                              src={d.img}
                              style={{ width: "100%", height: "30%" }}
                            ></img>
                          }
                        >
                          <p>{d.body}</p>
                          <div className="tags-edit">
                            <div className="tags-icons">
                              {d.tags ? (
                                d.tags.map((t) => {
                                  return (
                                    <i className="fa fa-tag" aria-hidden="true">
                                      <span id="tag">{t}</span>
                                    </i>
                                  );
                                })
                              ) : (
                                <span>no tags</span>
                              )}
                            </div>
                            <div className="edit-icon">
                              <Link to={`/FormEdit/${d._id}`}>
                                <EditOutlined className="edit-icon" />
                              </Link>
                              <DeleteOutlined onClick={this.handleDelete} />
                            </div>
                          </div>
                        </Card>
                      </>
                    );
                  })
                ) : (
                  <>
                    <p> add blog</p>
                    <div className="add-tooltip">
                      <Tooltip title="add new blog">
                        <Link to="/Form">
                          <Button shape="circle" className="add-btn">
                            <PlusCircleOutlined className="btn-add" />
                          </Button>
                        </Link>
                      </Tooltip>
                    </div>
                  </>
                )}
              </div>
            </React.Fragment>
          ) : (
            <Spin size="large" />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
