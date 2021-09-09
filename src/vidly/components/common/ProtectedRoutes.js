import React from "react";
import { Redirect, Route } from "react-router";
import auth from "../../../services/authService";

const ProtectedRoutes = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser()) return <Redirect to="/login" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoutes;
