import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const [user, setUser] = useState();
  return (
    <Route
      exact
      {...rest}
      render={(props) => {
        if (!user)
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    ></Route>
  );
};

const loadUser = () => {
  const jwt = localStorage.getItem("token");
  if (jwt) {
    const user = jwtDecode(jwt);
    this.setState({ user });
  } else {
  }
};

export default ProtectedRoute;
