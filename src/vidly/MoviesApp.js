import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Movies from "./components/Movies";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "../routingApp/NotFound";
import NavBar from "./components/NavBar";
import MovieForm from "./components/MovieForm";
import LoginFormWithJoi from "./components/LoginFormWithJoi";
import RegisterForm from "./components/RegisterForm";

const MoviesApp = () => {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <Switch>
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginFormWithJoi} />
        <Route path="/movies/:id" component={MovieForm} />
        <Route path="/customers" component={Customers}></Route>
        <Route path="/rentals" component={Rentals}></Route>
        <Route path="/movies" component={Movies}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect from="/" exact to="/movies" />
        <Redirect to="/not-found" />
      </Switch>
    </>
  );
};

export default MoviesApp;
