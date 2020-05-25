import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Auth from "./Components/Authentication";
import Footer from "./Components/Footer";
import BlogForm from "./Components/BlogForm";
import Profile from "./Components/Profile";
import BlogEdit from "./Components/BlogEdit";
import Error from "./Components/Error";
import BlogDetails from "./Components/BlogDetails";
import "./styles.css";
import Logout from "./Components/logout";

class App extends Component {
  state = {
    data: [],
    userBlogs: [],
    // users: [],
    user: null,
    currentPage: 1,
    nextPage: null,
    prevPage: null,
    limit: 5,
    total: 10,
    name: "name",
  };

  getData = () => {
    axios
      .get(
        `http://localhost:4000/articles?page=${this.state.currentPage}&limit=${this.state.limit}`
      )
      .then((response) => {
        this.setState({
          data: response.data.results,
          nextPage: response.data.next,
          prevPage: response.data.prev,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:4000/user/blog")
      .then((response) => {
        this.setState({ userBlogs: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getData();
    this.loadUser();
    // axios
    //   .get("https://jsonplaceholder.typicode.com/users")
    //   .then((res) => {
    //     this.setState({ users: res.data });
    //     //console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page }, () => {
      this.getData();
    });
  };

  loadUser = () => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const user = jwtDecode(jwt);
      this.setState({ user });
    } else {
    }
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <Header></Header>
          <Switch>
            <Route
              exact
              path="/profile/:id"
              render={(props) => <Profile {...props} />}
            ></Route>

            <Route exact path="/Home">
              <Home
                totalPages={this.state.total}
                onPageChange={this.getData}
                handlePageChange={this.handlePageChange}
                data={this.state.data}
                limit={this.state.limit}
                currentPage={this.state.currentPage}
                nextPage={this.state.nextPage}
                prevPage={this.state.prevPage}
              ></Home>
            </Route>

            <Route
              exact
              path="/Form"
              render={(props) => <BlogForm {...props}></BlogForm>}
            ></Route>

            <Route
              exact
              path="/FormEdit/:id"
              render={(props) => (
                <React.Fragment>
                  <BlogEdit
                    {...props}
                    name={this.state.name}
                    id={this.state.userBlogs._id}
                  ></BlogEdit>
                </React.Fragment>
              )}
            ></Route>

            <Route
              exact
              path="/Blog/:id"
              render={(props) => (
                <React.Fragment>
                  <BlogDetails {...props} id={this.state.data.id}></BlogDetails>
                </React.Fragment>
              )}
            ></Route>

            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <Auth {...props} onSignIn={() => this.loadUser()}></Auth>
                </React.Fragment>
              )}
            ></Route>
            <Route path="/logout" component={Logout}></Route>

            <Route path="*">
              <Error></Error>
            </Route>
          </Switch>
          <Footer></Footer>
        </Router>
      </React.Fragment>
    );
  }
}

// TODO
//ROUTING
//EDIT/ADD FORM
//USERPROFILE //done insha'allah
//BLOGPOSTDETAILS
//AUTHENTICATION&AUTHORIZATION
export default App;
