import React, { Component } from "react";
import {
  Card,
  Spin,
  Button,
  Tooltip,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
//TODO
import imgSrc from "../Assets/images/icon.png";
import jwtDecode from "jwt-decode";
import { Link, NavLink, Route } from "react-router-dom";
import config from "../config.json";
import axios from "../axios";
import { toast } from "react-toastify";

class Profile extends Component {
  state = {
    user: null,
    articles: [],
    isLoading: false,
    article: [],
    visible: false,
    userLoading: true,
    userBlogsLoading: true,
    selectedArticle: {},
    values: [],
    followed: "",
    userloggedIn: {},
    followingNames: [],
    userBlogsLoading: true,
  };
  formRef = React.createRef();
  showModal = (selectedArticle) => {
    this.setState({
      visible: true,
      selectedArticle,
    });
  };

  handleOk = (e) => {
    console.log(this.formRef.current);
    const values = this.formRef.current.getFieldsValue();
    this.setState({
      isLoading: true,
    });
    axios
      .patch(
        `http://localhost:4000/articles/${this.state.selectedArticle._id}`,
        {
          title: values.title,
          body: values.body,
          imgUrl: values.imgUrl,
          tags: values.tags,
        }
      )
      .then((res) => {
        this.setState({
          isLoading: false,
          visible: false,
        });

        this.getData();
        toast.success("🦄Editing Done Successfully!");
      })
      .catch((err) => {
        console.log("err :>> ", err);
        console.log("err :>> ", err.response);
        this.setState({
          isLoading: false,
          visible: false,
        });
        toast.error("Failed !");
      });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  loadUser = () => {
    const userloggedIn = JSON.parse(localStorage.getItem("userObject"));
    // console.log(userloggedIn);
    if (userloggedIn) {
      this.setState({
        userloggedIn,
        followed: userloggedIn.userFound.following.some(
          (user) => user._id === this.props.match.params.id
        ),
      });
    } else {
    }
  };
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getData();
    }
  }

  getData = () => {
    this.setState({ userBlogsLoading: true, userFollowingLoading: true });
    axios
      .get(`http://localhost:4000/articles/user/${this.props.match.params.id}`)
      .then((response) => {
        const articles = response.data;
        // console.log("the articles is ", response.data);
        this.setState({
          articles: articles ? articles : [],
          userBlogsLoading: false,
        });
      })
      .catch(() => this.setState({ userBlogsLoading: false }));

    axios
      .get(
        `http://localhost:4000/users/following/${this.props.match.params.id}`
      )
      .then((response) => {
        const following = response.data;
        console.log(following);

        this.setState({
          followingNames: following ? following : [],
          userFollowingLoading: false,
        });
      })
      .catch(() => this.setState({ userFollowingLoading: false }));

    this.setState({ userLoading: true, userBlogsLoading: true }, () => {
      axios
        .get(`http://localhost:4000/users/${this.props.match.params.id}`)
        .then((response) => {
          // console.log("the user is", response.data);
          this.setState({
            user: response.data,
            userLoading: false,
          });
        })
        .catch(() => this.setState({ userLoading: false }));

      // if(this.state.userloggedIn)
    });
  };

  componentDidMount() {
    this.loadUser();
    this.getData();
  }

  handleDelete = async (article) => {
    this.setState({
      isLoading: true,
    });
    const originalArticles = this.state.articles;

    const articles = this.state.articles.filter((a) => a._id !== article._id);
    this.setState({ articles });

    console.log("deleted");
    try {
      await axios.delete(`http://localhost:4000/articles/${article._id}`);
      this.setState({
        isLoading: false,
        visible: false,
      });
      this.getData();
      toast.success("🦄Deleted!");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("this post has already been deleted");

      this.setState({ articles: originalArticles });
    }
  };

  handleFollow = async () => {
    console.log(
      this.state.userloggedIn.userFound._id === this.props.match.params.id
    );

    this.setState({
      isLoading: true,
    });
    try {
      const res = await axios.post(
        `http://localhost:4000/users/${this.props.match.params.id}/follow-user`
      );
      console.log(this.state.user);
      this.setState(
        {
          isLoading: false,
          followed: true,
          user: {
            ...this.state.user,
            followers: this.state.user.followers.concat({
              _id: this.state.userloggedIn.userFound._id,
            }),
          },
          userloggedIn: {
            iat: this.state.userloggedIn.iat,
            userFound: {
              ...this.state.userloggedIn.userFound,
              following: this.state.userloggedIn.userFound.following.concat({
                _id: this.props.match.params.id,
              }),
            },
          },
        },
        () => {
          localStorage.setItem(
            "userObject",
            JSON.stringify(this.state.userloggedIn)
          );
        }
      );

      this.getData();

      toast.success("🦄followed!");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("you already followed them");

      this.setState({
        isLoading: false,
        followed: false,
      });
      toast.error("you already followed them!");
    }
  };

  handleUnFollow = async () => {
    this.setState({
      isLoading: true,
    });

    try {
      await axios.post(
        `http://localhost:4000/users/${this.props.match.params.id}/unfollow-user`
      );
      this.setState(
        {
          isLoading: false,
          followed: false,
          user: {
            ...this.state.user,
            followers: this.state.user.followers.filter(
              ({ _id }) => _id !== this.state.userloggedIn.userFound._id
            ),
          },
          userloggedIn: {
            iat: this.state.userloggedIn.iat,
            userFound: {
              ...this.state.userloggedIn.userFound,
              following: this.state.userloggedIn.userFound.following.filter(
                (user) => user._id !== this.props.match.params.id
              ),
            },
          },
        },
        () => {
          localStorage.setItem(
            "userObject",
            JSON.stringify(this.state.userloggedIn)
          );
        }
      );

      toast.success("🦄unfollowed!");
      this.getData();
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("you already unfollowed them");

      this.setState({
        isLoading: false,
        isLoading: true,
      });

      toast.error("🦄you already don't follow them");
    }
  };

  render() {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };

    const props = {
      name: "file",
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      headers: {
        authorization: "authorization-image",
      },
    };
    const {
      user,
      userLoading,
      userBlogsLoading,
      articles,
      selectedArticle,
      followingNames,
    } = this.state;

    return (
      <React.Fragment>
        <h2 id="latest">My Latest Blogs</h2>

        <div className="blog-card-body" id="home">
          {userLoading ? (
            <Spin size="large" />
          ) : (
            <React.Fragment>
              <div className="site-card-border-less-wrapper">
                <Card
                  hoverable
                  className="profile-card"
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
                  <p>Name: {user.fullname}</p>
                  <p>Email: {user.username}</p>
                  <p>Following: {user.following.length}</p>
                  <p>Followers: {user.followers.length}</p>

                  {this.state.userloggedIn.userFound._id !==
                  this.props.match.params.id ? (
                    !this.state.followed ? (
                      <Button
                        type="danger"
                        shape="round"
                        size="small"
                        onClick={this.handleFollow}
                      >
                        Follow me!
                      </Button>
                    ) : (
                      <Button
                        type="danger"
                        shape="round"
                        size="small"
                        onClick={this.handleUnFollow}
                      >
                        UnFollow
                      </Button>
                    )
                  ) : (
                    <Button type="danger" shape="round" size="small">
                      My profile
                    </Button>
                  )}
                  <hr></hr>
                  <div>I'm Following:</div>
                  <br></br>
                  {followingNames.map((name) => (
                    <NavLink
                      to={`/profile/${name._id}`}
                      // isActive={(match) => {
                      //   if (match) {
                      //     {
                      //       this.props.history.push(`/profile/${name._id}`);
                      //     }
                      // }
                      // }}
                    >
                      <p>{name.name}</p>
                    </NavLink>
                  ))}
                </Card>
              </div>
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
              <div className="blog-card">
                {
                  userBlogsLoading ? (
                    <Spin size="large" />
                  ) : (
                    // articles.length != 0 ? (
                    articles.map((d) => {
                      return (
                        <>
                          <Card
                            hoverable
                            type="inner"
                            title={d.title}
                            cover={
                              <img
                                src={d.imgUrl}
                                // style={{ width: "100%", height: "30%" }}
                              ></img>
                            }
                          >
                            <p>{d.body}</p>
                            <div className="tags-edit">
                              <div className="tags-icons">
                                {d.tags ? (
                                  d.tags.map((t) => {
                                    return (
                                      <i
                                        className="fa fa-tag"
                                        aria-hidden="true"
                                      >
                                        <span id="tag">{t}</span>
                                      </i>
                                    );
                                  })
                                ) : (
                                  <span>no tags</span>
                                )}
                              </div>
                              {this.state.userloggedIn.userFound._id ===
                                this.props.match.params.id && (
                                <>
                                  <div className="edit-icon">
                                    {/* <Link to={`/FormEdit/${d._id}`}> */}
                                    <Button onClick={() => this.showModal(d)}>
                                      <EditOutlined className="edit-icon" />
                                    </Button>
                                    {/* </Link> */}

                                    <DeleteOutlined
                                      onClick={() => this.handleDelete(d)}
                                    />
                                  </div>

                                  <div className="add-tooltip">
                                    <Tooltip title="add new blog">
                                      <Link to="/Form">
                                        <Button
                                          shape="circle"
                                          className="add-btn"
                                        >
                                          <PlusCircleOutlined className="btn-add" />
                                        </Button>
                                      </Link>
                                    </Tooltip>
                                  </div>
                                </>
                              )}
                            </div>
                          </Card>
                        </>
                      );
                    })
                  )
                  // ) : (
                }
              </div>
            </React.Fragment>
          )}
          <Modal
            title="Edit Post"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form
              id="home"
              {...layout}
              name="nest-messages"
              onFinish={this.onFinish}
              className="form"
              ref={this.formRef}
              // validateMessages={this.validateMessages}
            >
              <Row justify="center" align="top">
                <Col span="8">
                  <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                      {
                        required: true,
                        max: 60,
                        message: "title is required!",
                      },
                    ]}
                  >
                    <Input defaultValue={selectedArticle.title} />
                  </Form.Item>
                </Col>
              </Row>

              <Row justify="center" align="top">
                <Col span="8">
                  <Form.Item
                    name="body"
                    label="Blog Text"
                    initialValue={selectedArticle.body}
                    rules={[
                      {
                        required: true,
                        max: 1000,
                        message: "body is required!",
                      },
                    ]}
                  >
                    <Input.TextArea />
                  </Form.Item>
                </Col>
              </Row>

              {/* <Row justify="center" align="top">
  <Col span="8">
    <Form.Item
      name="author"
      label="Author"
      rules={[
        {
          required: true,
          message: "author is required!",
        },
      ]}
    >
      <Input />
    </Form.Item>
  </Col>
</Row> */}

              <Row justify="center" align="top">
                <Col span="8">
                  <Form.Item name="tags" label="Tags">
                    <Input.TextArea
                      defaultValue={
                        selectedArticle.tags ? selectedArticle.tags[0] : []
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
