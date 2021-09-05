import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import { login } from "../../services/authService";

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
    const { data } = this.state;
    await login(data.username, data.password);
  };
  render() {
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
