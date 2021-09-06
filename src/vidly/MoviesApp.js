import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";

import Movies from "./components/Movies";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "../routingApp/NotFound";
import NavBar from "./components/NavBar";
import MovieForm from "./components/MovieForm";
import LoginFormWithJoi from "./components/LoginFormWithJoi";
import RegisterForm from "./components/RegisterForm";

class MoviesApp extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const { data } = jwtDecode(jwt);
      this.setState({ user: data });
    } catch (error) {
      {
      }
    }
  }
  render() {
    return (
      <>
        <ToastContainer />
        <NavBar user={this.state.user} />
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
  }
}

export default MoviesApp;
