import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Auth from "./Components/Authentication";
import Footer from "./Components/Footer";
import BlogForm from "./Components/BlogForm";
import Profile from "./Components/Profile";
import BlogEdit from "./Components/BlogEdit";
import Error from "./Components/Error";

import Authors from "./Components/Authors";
import { toast } from "react-toastify";
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
        `https://sampleblogmernapp.herokuapp.com/articles?page=${this.state.currentPage}&limit=${this.state.limit}`
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
      .get("https://sampleblogmernapp.herokuapp.com/user/blog")
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
  }

  loadUser = () => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const user = jwtDecode(jwt);
      this.setState({ user });
    } else {
    }
  };

  render() {
    const { user } = this.state;
    return (
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/Home" component={Home}></Route>

          <Route
            exact
            path="/Form"
            render={(props) => {
              if (!user) return <Redirect to="/" />;
              return <BlogForm {...props} user={user}></BlogForm>;
            }}
          ></Route>

          <Route
            exact
            path="/FormEdit/:id"
            render={(props) => {
              if (!user) return <Redirect to="/" />;
              return (
                <BlogEdit
                  {...props}
                  name={this.state.name}
                  id={this.state.userBlogs._id}
                ></BlogEdit>
              );
            }}
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

          <Route
            exact
            path="/profile/:id"
            render={(props) => {
              if (!user) return <Redirect to="/" />;
              return <Profile {...props}></Profile>;
            }}
          ></Route>

          <Route
            exact
            path="/users"
            render={(props) => {
              if (!user) return <Redirect to="/" />;
              return <Authors {...props}></Authors>;
            }}
          ></Route>

          <Route path="/logout" component={Logout}></Route>
          <Route path="/not-found" component={Error}></Route>

          <Redirect to="/not-found" />
        </Switch>
        <Footer></Footer>
      </Router>
    );
  }
}

export default App;
