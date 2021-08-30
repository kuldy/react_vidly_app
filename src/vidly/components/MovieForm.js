import React, { Component } from "react";
import Joi from "joi-browser";

import Form from "./common/Form";
import { getGenres } from "../../services/fakeGenreService";
import { getMovie, saveMovie } from "../../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().min(0).max(100).label("Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  };
  componentDidMount() {
    const { match, history } = this.props;
    const genres = getGenres();
    this.setState({ genres });

    if (match.params.id === "new") return;

    const movie = getMovie(match.params.id);
    if (!movie) return history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id.toString(),
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  doSubmit() {
    console.log("form submitted final data is:", this.state.data);
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  }
  render() {
    const { genres } = this.state;
    return (
      <div>
        <form className="col-md-6 offset-md-3" onSubmit={this.handleSubmit}>
          <h1 className="text-center">
            <span className="text-primary">
              {console.log("url", this.props.match.params.id)}
              {this.props.match.params.id === "new" ? "New" : "Edit"} Movie
            </span>{" "}
            Form
          </h1>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {console.log("validation errors:", this.validate())}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
