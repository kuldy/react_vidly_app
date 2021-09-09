import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import auth from "../../services/authService";
import { Redirect } from "react-router";

class LoginFormWithJoi extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };
  // username = React.createRef();

  // componentDidMount() {
  //   this.username.current.focus();
  // }

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    console.log("submitted");
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location; //redirect to diffrent locaation than "/", where user previously wanted to go.
      window.location = state ? state.from.pathname : "/";
      // "/" this makes full reload so cmdd of MoviesApp runs, so it finds the token and extracts user from it
    } catch (ex) {
      console.log("response is:", ex.response);
      if (ex.response && ex.response.status === 401) {
        const errors = { ...this.state.errors };

        if (ex.response.data.messages.error.includes("email"))
          errors.username = ex.response.data.messages.error;
        if (ex.response.data.messages.error.includes("password"))
          errors.password = ex.response.data.messages.error;

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
            <span className="text-primary"> Login</span> Form
          </h1>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginFormWithJoi;
