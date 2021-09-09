import React, { Component, useEffect, useState } from "react";
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
import Logout from "./components/Logout";
import auth from "../services/authService";

class MoviesApp extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    return (
      <>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginFormWithJoi} />
          <Route path="/logout" component={Logout} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          {/* <Route path="/movies" component={Movies}></Route> */}
          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={this.state.user} />}
          ></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </>
    );
  }
}

export default MoviesApp;

// implementing componentDidMount With use effect hook
// const MoviesApp = () => {
//   const [user, setUser] = useState();
//   useEffect(() => {
//     try {
//       const jwt = localStorage.getItem("token");
//       const { data } = jwtDecode(jwt);
//       setUser(data);
//     } catch (error) {
//       {
//       }
//     }
//   }, []);

//   return (
//     <>
//       <ToastContainer />
//       <NavBar user={user} />
//       <Switch>
//         <Route path="/register" component={RegisterForm} />
//         <Route path="/login" component={LoginFormWithJoi} />
//         <Route path="/logout" component={Logout} />
//         <Route path="/movies/:id" component={MovieForm} />
//         <Route path="/customers" component={Customers}></Route>
//         <Route path="/rentals" component={Rentals}></Route>
//         <Route path="/movies" component={Movies}></Route>
//         <Route path="/not-found" component={NotFound}></Route>
//         <Redirect from="/" exact to="/movies" />
//         <Redirect to="/not-found" />
//       </Switch>
//     </>
//   );
// };
