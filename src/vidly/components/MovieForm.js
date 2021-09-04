import React, { Component } from "react";
import Joi from "joi-browser";

import Form from "./common/Form";
import { getGenres } from "../../services/genreService";
import { getMovie, saveMovie } from "../../services/movieService";
import { toast } from "react-toastify";

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

  modelGenres = (data) => {
    const genres = data.map((g) => {
      return { _id: g.id, name: g.name };
    });
    return genres;
  };

  async componentDidMount() {
    const { match, history } = this.props;

    const { data } = await getGenres();
    const genres = this.modelGenres(data);
    this.setState({ genres });

    if (match.params.id === "new") return;

    try {
      const movie = await getMovie(match.params.id);
      console.log("single movie is:", movie);
      if (!movie) return history.replace("/not-found");
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      console.log("response is:", error.response);
      if (error.response.status == 404) {
        toast.error(error.response.data.messages.error);
        return history.replace("/not-found");
      }
    }
  }

  mapToViewModel(movie) {
    return {
      _id: movie.id,
      title: movie.title,
      genreId: movie.genre_id.toString(),
      numberInStock: movie.number_in_stock,
      dailyRentalRate: movie.daily_rental_rate,
    };
  }
  doSubmit() {
    console.log("form submitted final data is:", this.state.data);
    const movie = this.mapToMovieModel(this.state.data);
    saveMovie(movie);
    this.props.history.push("/movies");
  }

  mapToMovieModel = (data) => {
    return {
      id: data._id,
      title: data.title,
      genre_id: data.genreId,
      number_in_stock: data.numberInStock,
      daily_rental_rate: data.dailyRentalRate,
    };
  };

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
