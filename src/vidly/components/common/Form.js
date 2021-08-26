import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    // const result = Joi.validate(this.state.data, this.schema, options);
    const result = Joi.validate(this.state.data, this.schema, options);

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
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

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        Login
      </button>
    );
  };
}

export default Form;
