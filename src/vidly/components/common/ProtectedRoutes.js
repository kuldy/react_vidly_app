import React from "react";
import { Redirect, Route } from "react-router";
import auth from "../../../services/authService";

const ProtectedRoutes = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log("props are", props);
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoutes;
