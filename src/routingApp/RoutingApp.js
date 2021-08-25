import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./NavBar";
import Products from "./Products";
import Posts from "./Posts";
import Dashboard from "./admin/Dashboard";
import Home from "./Home";
import ProductDetails from "./ProductDetails";
import NotFound from "./NotFound";

const RoutingApp = () => {
  return (
    <>
      <NavBar />
      <div className="content">
        <Switch>
          <Route path="/products/:id" component={ProductDetails} />
          <Route
            path="/products"
            render={(props) => <Products sortBy="newest" {...props} />}
          />
          <Route path="/posts/:year?/:month?" component={Posts} />
          <Route path="/admin" component={Dashboard} />
          <Redirect from="/messages" to="/posts" />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </>
  );
};

export default RoutingApp;
