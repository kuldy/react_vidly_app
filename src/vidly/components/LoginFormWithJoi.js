import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/Input";

class LoginFormWithJoi extends Component {
  state = {
    account: { username: "", password: "" },
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

  validatePorperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemaForObj = { [name]: this.schema[name] }; //new schema
    const { error } = Joi.validate(obj, schemaForObj);
    if (!error) return null;
    return error.details[0].message;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validatePorperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  validate = () => {
    const options = { abortEarly: false };
    // const result = Joi.validate(this.state.account, this.schema, options);
    const result = Joi.validate(this.state.account, this.schema, options);

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log("submitted");
  };
  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <form className="col-md-6 offset-md-3" onSubmit={this.handleSubmit}>
          <h1 className="text-center">
            <span className="text-primary"> Login</span> Form
          </h1>
          <Input
            name="username"
            label="Username"
            value={account.username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginFormWithJoi;
