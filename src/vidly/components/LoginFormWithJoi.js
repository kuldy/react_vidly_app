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
    try {
      const { data } = this.state;
      await login(data.username, data.password);
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
