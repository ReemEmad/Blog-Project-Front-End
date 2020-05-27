import React, { Component } from "react";

import BlogDetails from "./BlogDetails";
import Blogs from "./Blogs";
import { Route, Switch } from "react-router-dom";
class Home extends Component {
  render() {
    const { match } = this.props;
    return (
      <>
        <Switch>
          <Route
            exact
            path={`${match.url}/`}
            render={(props) => <Blogs {...props} />}
          ></Route>

          <Route
            exact
            path={`${match.url}/:id`}
            render={(props) => <BlogDetails {...props} />}
          ></Route>
        </Switch>
      </>
    );
  }
}

export default Home;
