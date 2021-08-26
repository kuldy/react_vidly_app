import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/Form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    console.log("Register Form Submitted");
  };
  render() {
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
