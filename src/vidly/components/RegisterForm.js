import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/Form";

import * as userService from "../../services/userService";
import auth from "../../services/authService";
import { Redirect } from "react-router";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" }, //username is email
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    console.log("Register Form Submitted");
    // console.log("final data is: ", this.state.data);
    try {
      const { data } = await userService.register(this.state.data);
      auth.loginWithJwt(data);

      // this.props.history.push("/");
      window.location = "/"; // this makes full reload so cmdd of MoviesApp runs, so it finda the token and extracts user from it
    } catch (error) {
      console.log("error is:", error.response);
      const { data, status } = error.response;
      // console.log("data of error", data);
      // console.log("status of erro", status);
      if (error.response && status == 400) {
        const errors = { ...this.state.errors };
        errors.username = data.messages.error;
        this.setState({ errors });
      }
    }
  };
  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <form className="col-md-6 offset-md-3" onSubmit={this.handleSubmit}>
          <h1 className="text-center">
            <span className="text-primary"> Register</span> Form
          </h1>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
