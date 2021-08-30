import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import SelectInput from "./common/SelectInput";
import { getGenres } from "../../services/fakeGenreService";
import { addMovie } from "../../services/fakeMovieService";
import RadioInput from "./common/RadioInput";
import CheckboxInput from "./common/CheckboxInput";

class NewMovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
      // hooks: false,
      // level: "master",
    },
    genres: [],
    errors: {},
  };

  schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().min(0).max(100).label("Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
    // level: Joi.string(),
    // hooks: Joi.boolean(),
  };
  componentDidMount() {
    const genres = [...getGenres()];
    this.setState({ genres });
  }
  doSubmit = () => {
    console.log("final data is:", this.state.data);
    addMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    const { genres, data } = this.state;
    return (
      <div>
        <form className="col-md-6 offset-md-3" onSubmit={this.handleSubmit}>
          <h1 className="text-center">
            <span className="text-primary"> Movie</span> Form
          </h1>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}

          {/* <div className="my-2">
            <RadioInput
              label="Acolyte"
              name="level"
              value="acolyte"
              checked={data.level === "acolyte"}
              onChange={this.handleChange}
            />
            <RadioInput
              label="Master"
              name="level"
              value="master"
              checked={data.level === "master"}
              onChange={this.handleChange}
            />
          </div> */}
          {/* <CheckboxInput
            label="Hooks"
            name="hooks"
            checked={data.hooks}
            onChange={this.handleChange}
          /> */}
        </form>
      </div>
    );
  }
}

export default NewMovieForm;
